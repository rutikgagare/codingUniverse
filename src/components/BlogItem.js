import React from 'react';
import classes from './BlogItem.module.css';
import { useNavigate } from 'react-router-dom';

const BlogItem = (props) => {
  const navigate = useNavigate();

  const displayDetailedBlog = () =>{
    navigate(`/:${props.id}`)
  }

  return (
    <div className={classes.blogItem} onClick={displayDetailedBlog}>
      <h2>{props.title}</h2>

      <div className={classes.details}>
        <h3><span>Author Name : </span>{props.author}</h3>
        <h3><span>Published on : </span>{props.date}</h3>
      </div>
      <div className={classes.description}>
        <p>{props.plaintext.substring(0,800)}.................</p>
      </div>
      {/* <div className={classes.content} dangerouslySetInnerHTML={{ __html: props.content }} /> */}
    </div>
  )
}

export default BlogItem;