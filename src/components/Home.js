import React, { useEffect } from 'react';
import Nav from './Nav';
import Main from './Main';
import Blogs from './Blogs';
import { auth } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/loginSlice';
import { articleActions } from '../store/articleSlice';
import classes from './Home.module.css';

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginActions.login());
      }
    });
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
      <Nav></Nav>
      <Main></Main>
      <Blogs></Blogs>
    </div>
  )
}
export default Home;