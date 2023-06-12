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
import Preview from './Preview1';
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
  const [selectedTags, setSelectedTags] = useState(blogItem?.tags);
  const [todaysDate, setTodaysDate] = useState('');
  const [showPreview, setShowPreview] = useState(false);


  const tagsData = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'React' },
    { id: 5, name: 'C++' },
    { id: 6, name: 'DSA' },
    { id: 7, name: 'Front-end' },
    { id: 8, name: 'Rules' },
    { id: 9, name: 'Python' },
    { id: 10, name: 'Web development' },
  ];

  useEffect(() => {
    const currentDate = new Date();

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    setTodaysDate(formattedDate);
  }, [])


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

  const previewHandler = () => {
    setShowPreview(!showPreview);
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

  // Handler for selecting/deselecting a tag
  const handleTagSelection = (tagId) => {
    if (selectedTags?.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const editArticleHandler = (event) => {
    event.preventDefault();

    dispatch(articleActions.editArticle({
      id: blogid,
      title: title,
      content: editorData,
      plaintext: plainText,
      user: auth?.currentUser?.uid,
      author: auth?.currentUser?.displayName,
      date: blogItem.date,
      tags: selectedTags,
      email: auth?.currentUser?.email,
      latesteditdate: todaysDate
    }));

    notify("Article Updated Successfully");

    setEditorData('');
    setTitle('');
    setPlainText('');
    setSelectedTags([]);
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

            <div className={classes.tags}>
              <label htmlFor="">Select the bes fit tags for your article</label>
              {tagsData.map((tag) => (
                <span
                  key={tag.id}
                  onClick={() => handleTagSelection(tag.id)}
                  className={`${selectedTags?.includes(tag.id) ? classes.active : ''}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <button type='submit'>Submit Changes</button>
          </div>
        </form>
      </div>
      }

      {/* preview */}
      {user &&
        <div className={classes.preview}>
          <button onClick={previewHandler}>Check Preview</button>

          {showPreview && <Preview title={title} content={editorData} date={todaysDate}></Preview>}
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