import React, {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/loginSlice';
import { articleActions } from '../store/articleSlice';
import { auth } from '../config/firebase';
import Nav from './Nav';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './BlogItem.module.css';
import Loader from './Loader';

const DetailedBlog = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginActions.login());
      }
    });
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/article.json');
      const data = await response.json();
      dispatch(articleActions.replace(data.items));
    }
    fetchData();
  }, [dispatch]);

  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Optionally, you can use 'auto' or 'instant' for different scrolling behavior
  });

  const params = useParams();
  const blogid = params?.blogitemId?.substring(1);

  const blogItemList = useSelector(state => state.article.items);

  const blogItems = blogItemList.filter((item) => {
    return (item.id === blogid);
  });
  
  const props = blogItems[0];

  return (
    <div className={classes.main}>
      {loading && <Loader></Loader>}
      <Nav></Nav>
      <div className={classes.blogItem}>

        <div className={classes.like}>
          <i class="fas fa-heart"></i>
        </div>

        <h2>{props?.title}</h2>

        <div className={classes.details}>
          <h3><span>Author Name : </span>{props?.author}</h3>
          <h3><span>Published on : </span>{props?.date}</h3>
        </div>

        <div className={classes.content} dangerouslySetInnerHTML={{ __html: props?.content }} />
      </div>
    </div>
  )
}

export default DetailedBlog