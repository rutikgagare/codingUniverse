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

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            dispatch(loginActions.login());
          }
        });
      }, []);

    const navigate = useNavigate();

    const blogItems = useSelector(state => state.article.items);
    const user = useSelector(state => state.login.logedIn);

    const dispatch = useDispatch();
    
    const [editorData, setEditorData] = useState('');
    const [plainText, setPlainText] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);

        // Create a temporary element
        const tempElement = document.createElement("div");

        // Set the CKEditor data as innerHTML of the temporary element
        tempElement.innerHTML = data;

        // Extract the plain text content
        const text = tempElement.textContent || tempElement.innerText;

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
            user: auth.currentUser.uid,
            author: auth.currentUser.displayName,
            date: formattedDate,
            category:category
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

                <form onSubmit={addArticleHandler}>
                    <div className={classes.write}>
                        <div className={classes.title}>
                            <label htmlFor="">Post Title</label>
                            <input type="text" placeholder='Enter Title' required onChange={(event) => { setTitle(event.target.value) }} value={title} />
                        </div>

                        <div className={classes.editor}>
                            <CKEditor
                                editor={ClassicEditor}
                                data={editorData}
                                onChange={handleEditorChange}
                            />
                        </div>
                    </div>

                    <div className={classes.postDetails}>
                        <h3>Post Details</h3>
                        <select name="category" onChange={(event)=>{setCategory(event.target.value)}} required>
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

                        <button type='submit'>Submit for Review</button>
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