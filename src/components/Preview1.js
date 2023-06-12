import React from 'react';
import classes from './Preview1.module.css';
import { auth } from '../config/firebase';

const Preview1 = (props) => {
  return (
    <div className={classes.preview}>
      <div className={classes.blogItem}>

        <div className={classes.like}>
          <i class="fas fa-heart"></i>
        </div>

        <h2>{props.title}</h2>

        <div className={classes.details}>
          <h3><span>Author Name : </span>{auth?.currentUser?.displayName}</h3>
          <h3><span>Published on : </span>{props.date}</h3>
        </div>

        <div className={classes.content} dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
    </div>
  )
}

export default Preview1;

