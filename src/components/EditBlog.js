import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classes from './Write.module.css';
import { useDispatch } from 'react-redux';
import { articleActions } from '../store/articleSlice';
import { auth } from '../config/firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/loginSlice';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';

const EditBlog = () => {

  const params = useParams();
  const blogid = params?.editblogitemId?.substring(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.login?.logedIn);
  const blogItemList = useSelector(state => state.article.items);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/article.json');
      const data = await response.json();
      dispatch(articleActions.replace(data.items));
    }
    fetchData();
  }, [dispatch]);
  

  const blogItems = blogItemList.filter((item) => {
    return (item.id === blogid);
  });
  const blogItem = blogItems[0];

  const [editorData, setEditorData] = useState(blogItem?.content);
  const [plainText, setPlainText] = useState(blogItem?.plaintext);
  const [title, setTitle] = useState(blogItem?.title);
  const [category, setCategory] = useState(blogItem?.category);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginActions.login());
      }
    });
  }, [dispatch]);

  const notify = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }

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
  };

  const editArticleHandler = (event) => {
    event.preventDefault();

    let currentDate = new Date();
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    dispatch(articleActions.editArticle({
      id: blogid,
      title: title,
      content: editorData,
      plaintext: plainText,
      user: auth?.currentUser?.uid,
      author: auth?.currentUser?.displayName,
      date: formattedDate,
      category: category,
    }));

    notify("Article Updated Successfully");

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
        body: JSON.stringify({ items: blogItemList })
      })
    }
    sendData();
  }, [blogItemList]);

  return (
    <>
      <ToastContainer></ToastContainer>

      <Nav></Nav>
      {user && <div className={classes.main}>

        <form onSubmit={editArticleHandler}>
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
            <select name="category" id='category' value={category} onChange={(event) => { setCategory(event.target.value) }} required>
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

            <button type='submit'>Submit Changes</button>
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
export default EditBlog;