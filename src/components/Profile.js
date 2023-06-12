import React, { useState,useEffect } from 'react';
import Nav from './Nav';
import UserBlogItem from './UserBlogItem';
import classes from './Profile.module.css';
import { auth } from '../config/firebase';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { loginActions } from '../store/loginSlice';
import { articleActions } from '../store/articleSlice';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import Loader from './Loader';
let send = false;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.login.logedIn);
  const articles = useSelector(state => state?.article?.items);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    auth?.onAuthStateChanged((user) => {
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
    const sendData = async () => {
      await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/article.json', {
        method: "PUT",
        body: JSON.stringify({ items: articles })
      })
    }
    if(send === false){
      send = true;
      return;
    }
    sendData();
  }, [articles]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/article.json');
      const data = await response.json();
      dispatch(articleActions.replace(data.items));
    }
    fetchData();
  }, [dispatch]);

  const myarticles = articles?.filter((item) => {
    return (item.user === auth?.currentUser?.uid);
  });

  const logoutHandler = async () => {
    const response = await signOut(auth);
    dispatch(loginActions.logout());
    navigate('/');
  }

  return (
    <div>
      {loading && <Loader></Loader>}
      <Nav></Nav>
      <div className={classes.profile}>
        <div className={classes.profileDetails}>
          <img src="https://media.geeksforgeeks.org/img-practice/user_web-1598433228.svg" alt="" />
          {user && <h2>{auth?.currentUser?.displayName}</h2>}
          {user && <h3>{auth?.currentUser?.email}</h3>}
          <hr></hr>
        </div>

        <div className={classes.myBlogs}>
          <h2 className={classes.heading}>Your Articles</h2>
          {myarticles.length !== 0 &&
            <div className={classes.blogs}>
              {myarticles.map((item) => {
                return (<UserBlogItem key={item.id} id={item.id} title={item.title} content={item.content} plaintext={item.plaintext} date={item.date} author={item.author} category={item.category}></UserBlogItem>);
              })
              }
            </div>
          }
          {myarticles.length === 0 &&
            <div className={classes.message}>
              <h3>You haven't contributed any 'Articles' yet!</h3>
              <h4>You may use codingUniverse <Link to="/write">WRITE</Link> portal to help other.</h4>
            </div>
          }
        </div>

        <div className={classes.logout}>
          {user && <button onClick={logoutHandler}>Logout <i class="fas fa-right-from-bracket"></i></button>}
        </div>
      </div>
    </div>
  )
}

export default Profile