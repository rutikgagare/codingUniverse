import React, { useEffect } from 'react';
import Nav from './Nav';
import Main from './Main';
import Blogs from './Blogs';
import { auth } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/loginSlice';
import { useSelector } from 'react-redux';
import { articleActions } from '../store/articleSlice';
import classes from './Home.module.css';
let send = false;

const Home = () => {

  const blogItems = useSelector(state => state.article.items);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginActions.login());
      }
    });
  }, []);

 
  useEffect(() => {
    console.log("in fetchdata",blogItems);
    const fetchData = async () => {
      const response = await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/article.json');
      const data = await response.json();
      dispatch(articleActions.replace(data.items));
    }
    fetchData();

  }, []);

  return (
    <div className={classes.home}>
      <Nav></Nav>
      <Main></Main>
      <Blogs></Blogs>
    </div>
  )
}
export default Home;