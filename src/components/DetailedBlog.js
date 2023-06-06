import React from 'react';
import Nav from './Nav';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './BlogItem.module.css';

const DetailedBlog = () => {
    const params = useParams();
    const blogid = params.blogitemId.substring(1);

    const blogItemList = useSelector(state => state.article.items);

    const blogItems = blogItemList.filter((item) => {
        // console.log(item.id," ",blogid);
        return (item.id === blogid);
    });
    const props = blogItems[0];

    return (
        <>
            <Nav></Nav>
            <div className={classes.blogItem}>
                <h2>{props.title}</h2>

                <div className={classes.details}>
                    <h3><span>Author Name : </span>{props.author}</h3>
                    <h3><span>Published on : </span>{props.date}</h3>
                </div>

                <div className={classes.content} dangerouslySetInnerHTML={{ __html: props.content }} />
            </div>
        </>
    )
}

export default DetailedBlog