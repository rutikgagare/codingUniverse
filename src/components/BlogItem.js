import React from 'react';
import classes from './BlogItem.module.css';

const BlogItem = (props) => {
  return (
    <div className={classes.blogItem}>
      <h2>{props.title}</h2>

      <div className={classes.details}>
        <h3><span>Author Name : </span>Rutik Gagare</h3>
        <h3><span>Published on : </span>Jun 14, 2018</h3>
      </div>

      {/* <p>{props.content}</p> */}
      <div className={classes.content} dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  )
}

export default BlogItem;