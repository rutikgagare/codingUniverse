import React, { useEffect } from 'react';
import Nav from './Nav';
import Main from './Main';
import Blogs from './Blogs';
import { auth } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/loginSlice';
import { useSelector } from 'react-redux';
import { articleActions } from '../store/articleSlice';
let send = false;

const Home = () => {

  const dispatch = useDispatch();

  const blogItems = useSelector(state => state.article.items);
  console.log("home : ", blogItems);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginActions.login());
      }
    });
  }, []);

  useEffect(() => {
    const send_data = async () => {
      if (send === false) {
        send = true;
        return;
      }

      const response = await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/articles.json', {
        method: "PUT",
        body: JSON.stringify({ items: blogItems })
      });
    };

    send_data();

  }, [blogItems]);

  

  // useEffect(() => {
  //   const fetch_data = async () => {
  //     const response = await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/articles.json');
  //     const data = await response.json();
      
  //     if(data.items.length === 0){
  //       return;
  //     }

  //     dispatch(articleActions.replaceAll(data.items));
  //   }

  //   fetch_data();

  // }, [])

  return (
    <div>
      <Nav></Nav>
      <Main></Main>
      <Blogs></Blogs>
      {/* <Write></Write> */}
    </div>
  )
}

export default Home;