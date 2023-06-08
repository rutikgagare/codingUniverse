import React from 'react';
import classes from './UserBlogItem.module.css';
import { useDispatch } from 'react-redux';
import { articleActions } from '../store/articleSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserBlogItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editArticleHandler = () => {
    navigate(`./:${props.id}`);
  }

  const deleteArticleHandler = () => {
    dispatch(articleActions.deleteArticle(props.id));
  }

  return (
    <div className={classes.blogItem}>
      <ToastContainer></ToastContainer>
      <div className={classes.options}>
        <i onClick={editArticleHandler} class="fas fa-pen"></i>
        <i onClick={deleteArticleHandler} class="fas fa-trash"></i>
      </div>

      <h2>{props?.title}</h2>

      <div className={classes.details}>
        <h3><span>Author Name : </span>{props?.author}</h3>
        <h3><span>Published on : </span>{props?.date}</h3>
      </div>
      <div className={classes.description}>
        <p>{props?.plaintext?.substring(0, 300)}.................</p>
      </div>
    </div>
  )
}

export default UserBlogItem;