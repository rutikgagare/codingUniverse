import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classes from './Write.module.css';
import { useDispatch } from 'react-redux';
import { articleActions } from '../store/articleSlice';
import { auth } from '../config/firebase';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Nav from './Nav';

const Write = () => {

    const blogItems = useSelector(state => state.article.items);
    const dispatch = useDispatch();
    const [editorData, setEditorData] = useState('');
    const [plainText, setPlainText] = useState('');
    const [title, setTitle] = useState('');

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

    const addArticleHandler = () => {
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
            date: formattedDate
        }));
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
            <div className={classes.main}>
                <div className={classes.write}>
                    <div className={classes.title}>
                        <label htmlFor="">Post Title</label>
                        <input type="text" placeholder='Enter Title' onChange={(event) => { setTitle(event.target.value) }} />
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
                    <select name="category" id="">
                        <option value="">Programming</option>
                        <option value="">DSA</option>
                        <option value="">C++ Programming</option>
                        <option value="">Python</option>
                    </select>

                    <button onClick={addArticleHandler}>Submit for Review</button>
                </div>
            </div>
        </>
    )
}
export default Write;