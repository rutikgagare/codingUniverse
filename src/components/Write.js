import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classes from './Write.module.css';
import { useDispatch } from 'react-redux';
import { articleActions } from '../store/articleSlice';
import { Link } from 'react-router-dom';
import { auth} from '../config/firebase';

const Write = () => {
    const dispatch = useDispatch();
    const [editorData, setEditorData] = useState('');
    const [title,setTitle] = useState('');

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    const addArticleHandler = () =>{
        console.log("add article");
        dispatch(articleActions.addArticle({
            id:Math.random().toString,
            title:title,
            content:editorData,
            user:auth.currentUser.uid
        }));
    }

    return (
        <div className={classes.main}>
            <div className={classes.write}>
                <div className={classes.title}>
                    <label htmlFor="">Post Title</label>
                    <input type="text" placeholder='Enter Title' onChange={(event)=>{setTitle(event.target.value)}} />
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
                <Link to='/'>Go to home</Link>
            </div>
        </div>

    )
}
export default Write;