import React,{useEffect} from 'react';
import Nav from './Nav';
import BlogItem from './BlogItem';
import classes from './Profile.module.css';
import { auth } from '../config/firebase';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginActions } from '../store/loginSlice';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginActions.login());
      }
    });
  }, []);

  const user = useSelector(state => state.login.logedIn);
  const articles = useSelector(state => state.article.items);
  
  const myarticles = articles.filter((item) => {
    return (item.user == auth?.currentUser?.uid);
  });

  const logoutHandler = async () =>{
    const response = await signOut(auth);
    dispatch(loginActions.logout());
  }

  return (
    <div>
      <Nav></Nav>
      <div className={classes.profile}>
        <div className={classes.profileDetails}>
          <img src="https://media.geeksforgeeks.org/img-practice/user_web-1598433228.svg" alt="" />
          {user && <h2>{auth.currentUser.displayName}</h2>}
          {user && <h3>{auth.currentUser.email}</h3>}
          <hr></hr>
        </div>

        <div className={classes.myBlogs}>
          <h2 className={classes.heading}>Your Articles</h2>
          {myarticles.length !== 0 && myarticles.map((item) => {
            return (<BlogItem key={item.id} id={item.id} title={item.title} content={item.content} plaintext={item.plaintext} date={item.date} author={item.author}></BlogItem>);
          })
          }
          {myarticles.length === 0 && 
            <div className={classes.message}>
              <h3>You haven't contributed any 'Articles' yet!</h3>
              <h4>You may use codingUniverse <Link to = "/write">WRITE</Link> portal to help other.</h4>
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