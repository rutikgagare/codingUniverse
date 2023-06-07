import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classes from './Write.module.css';
import { useDispatch } from 'react-redux';
import { articleActions } from '../store/articleSlice';
import { auth } from '../config/firebase';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/loginSlice';
import Nav from './Nav';

const Write = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const blogItems = useSelector(state => state.article.items);
    const user = useSelector(state => state.login.logedIn);

    const [editorData, setEditorData] = useState('');
    const [plainText, setPlainText] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(loginActions.login());
            }
        });
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/article.json');
            const data = await response.json();
            dispatch(articleActions.replace(data.items));
        }
        fetchData();
    }, [dispatch]);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);

        // Create a temporary element
        const tempElement = document.createElement("div");

        // Set the CKEditor data as innerHTML of the temporary element
        tempElement.innerHTML = data;

        // Extract the plain text content with new lines, consecutive whitespaces, and spaces after each <li> element replaced by a single space
        const text = Array.from(tempElement.childNodes)
            .map(node => (node.textContent || node.innerText).replace(/\s+/g, ' '))
            .join(' ');

        // Print the plain text
        setPlainText(text);
        console.log(plainText);
    };

    const addArticleHandler = (event) => {
        event.preventDefault();

        const uniqueId = uuid();

        const currentDate = new Date();

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };

        const formattedDate = currentDate.toLocaleDateString(undefined, options);

        dispatch(articleActions.addArticle({
            id: uniqueId,
            title: title,
            content: editorData,
            plaintext: plainText,
            user: auth?.currentUser?.uid,
            author: auth?.currentUser?.displayName,
            date: formattedDate,
            category: category
        }));

        setEditorData('');
        setTitle('');
        setPlainText('');
        setCategory('');
    }

    const redirecToRegister = () => {
        navigate('/signupwrite');
    }

    useEffect(() => {
        const sendData = async () => {
            await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/article.json', {
                method: "PUT",
                body: JSON.stringify({ items: blogItems })
            })
        }
        sendData();
    }, [blogItems]);

    return (
        <>
            <Nav></Nav>
            {user && <div className={classes.main}>

                {/* <div className={classes.rules}>
                    <h3> Rules :</h3>

                    <p> 1. Stay focused: Ensure that your article stays on topic and focuses on the technical subject matter. Avoid including unrelated or extraneous information.</p>
                    <p>2. Be clear and concise: Write in a clear and concise manner to make your article easily understandable. </p>
                    <p>3. Provide examples and code snippets: Whenever possible, include relevant examples and code snippets to illustrate concepts or demonstrate solutions. This helps readers understand and apply the information effectively.</p>
                    <p>4. Cite your sources: If you are referencing information, code snippets, or ideas from other sources, provide proper attribution and cite your references. This promotes transparency and gives credit to the original authors or sources.</p>
                    <p>5. Be accurate and up-to-date: Ensure that the information you provide is accurate and up-to-date. </p>
                    <p>6. Follow formatting guidelines: Adhere to any formatting guidelines or styles provided by the platform.</p>
                    <p>7. Respect copyright and licensing: Do not copy and paste content from other sources without permission or proper licensing.</p>

                    <h4> Remember, these rules are meant to guide users in creating high-quality articles that provide value to the readers. By following these guidelines, users can contribute to a positive and enriching experience within the coding community.</h4>
                    <h3>Happy writing and sharing knowledge in the Coding Universe! 🚀🌌</h3>
                </div> */}

                <form onSubmit={addArticleHandler}>
                    <div className={classes.write}>
                        <div className={classes.title}>
                            <label htmlFor="">Post Title</label>
                            <input type="text" placeholder='Enter Title' required onChange={(event) => { setTitle(event.target.value) }} value={title} />
                        </div>

                        <div id='editor' className={classes.editor}>
                            <label htmlFor="editor">Write your article</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={editorData}
                                onChange={handleEditorChange}
                            />
                        </div>
                    </div>

                    <div className={classes.postDetails}>

                        <label htmlFor="category">Category</label>
                        <select name="category" id='category' onChange={(event) => { setCategory(event.target.value) }} required>
                            <option value="">default</option>
                            <option value="Programming">Programming</option>
                            <option value="DSA">DSA</option>
                            <option value="C++ Programming">C++ Programming</option>
                            <option value="Python">Python</option>
                            <option value="Javascript">Javascript</option>
                            <option value="React">React</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Frontend-development">Frontend-development</option>
                            <option value="Github">Github</option>
                        </select>

                        <button type='submit'>Publish</button>
                    </div>
                </form>
            </div>
            }
            {
                !user &&
                <div className={classes.main}>
                    <div className={classes.loginIssue}>
                        <h2>Login Issue</h2>
                        <h3>Please login first to view the details.</h3>
                        <button onClick={redirecToRegister}>Login / Register</button>
                    </div>
                </div>
            }
        </>
    )
}
export default Write;