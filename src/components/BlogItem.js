import React from 'react';
import classes from './BlogItem.module.css';

const BlogItem = (props) => {
  return (
    <div className={classes.blogItem}>
       <h3>{props.title}</h3>
       {/* <p>{props.content}</p> */}
       <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  )
}

export default BlogItem;