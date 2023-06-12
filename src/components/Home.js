import React, {useState, useEffect } from 'react';
import Nav from './Nav';
import Main from './Main';
import Blogs from './Blogs';
import { auth } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/loginSlice';
import { articleActions } from '../store/articleSlice';
import classes from './Home.module.css';
import { ToastContainer } from 'react-toastify';
import Loader from './Loader';

const Home = () => {

  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);

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

  return (
    <div className={classes.home}>
      {loading && <Loader></Loader>}
      <Nav></Nav>
      <Main></Main>
      <Blogs></Blogs>
      <ToastContainer></ToastContainer>
    </div>
  )
}
export default Home;