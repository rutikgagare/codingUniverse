import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/loginSlice';
import { articleActions } from '../store/articleSlice';
import { auth } from '../config/firebase';
import Nav from './Nav';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './BlogItem.module.css';
import Loader from './Loader';
let send = false;

const DetailedBlog = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [props,setProps] = useState([]);
  const [suggestion,setSuggestion] = useState([]);
  const [blogid,setBlogId] = useState('');

  const blogItemList = useSelector(state => state.article.items);

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
  useEffect(()=>{
    console.log("params updates");
    setBlogId(params?.blogitemId?.substring(1));
  },[params]);
  
  useEffect(()=>{
    const blogItems = blogItemList.filter((item) => {
      return (item?.id === blogid);
    });
    setProps(blogItems[0]);
    console.log(props);

    setSuggestion(blogItemList.map((article) => {
      if(props?.id !== article?.id &props?.tags?.some((element) => article.tags.includes(element))){
        // console.log(article);
        return article;
      }
    }));

  },[blogItemList,blogid]);

  const likeHandler = () => {
    if (props?.likes?.includes(auth?.currentUser?.uid)) {
      // console.log("remove handler");
      dispatch(articleActions.removeLikeHandler(props?.id));
    }
    else {
      // console.log("add handler");
      dispatch(articleActions.addLikeHandler(props?.id));
    }
  }

  useEffect(() => {
    const sendData = async () => {
      if (send === false) {
        send = true;
        return;
      }
      await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/article.json', {
        method: "PUT",
        body: JSON.stringify({ items: blogItemList })
      })
    }
    sendData();
  }, [blogItemList]);

  return (
    <div className={classes.main}>
      {loading && <Loader></Loader>}
      <Nav></Nav>
      <div className={classes.blogItem}>

        {props && auth?.currentUser && <div className={`${classes.like} ${props?.likes?.includes(auth?.currentUser?.uid) ? classes.active : ''}`} onClick={likeHandler}>
          <i class="fa-solid fa-thumbs-up"></i>
          <span>{props?.likes?.length - 1}</span>
        </div>}

        <h2>{props?.title}</h2>

        <div className={classes.details}>
          <h3><span>Author Name : </span>{props?.author}</h3>
          <h3><span>Published on : </span>{props?.date}</h3>
        </div>

        <div className={classes.content} dangerouslySetInnerHTML={{ __html: props?.content }} />
      </div>

      {suggestion.length > 0 && <div className={classes.suggestion}>
        <h2>Suggested Articles</h2>
        {suggestion.map((suggestedArticle)=>{
          return(<Link to={`/:${suggestedArticle?.id}`}>{suggestedArticle?.title}</Link>)
        })}
      </div>}
    </div>
  )
}

export default DetailedBlog;