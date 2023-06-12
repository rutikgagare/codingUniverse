import React, {useState } from 'react';
import classes from './SignUp.module.css';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup,updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const SignUp = () => {

  const [userName,setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  
  const registrationHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(response.user, {
        displayName: userName
      });

      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
  
      clearTimeout(timer);

      navigate('/signin');
    } catch (error) {
      // console.log(error);
    }
  }

  const signInWithGoogleHandler = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
  
      clearTimeout(timer);
      navigate('/');

    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <div className={classes.main}>

      {loading && <Loader></Loader>}
      <form onSubmit={registrationHandler} className={classes.form}>
        <h2>SignUp</h2>

        <input type="text" placeholder='User name' onChange={(e) => { setUserName(e.target.value) }} />
        <input type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
        <input type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />

        <button type="submit" > SignUp <i class="fa-solid fa-arrow-right"></i></button>
        <span>Already have a account? <Link to="/signin">Log in</Link></span>

        <div><hr /></div>

        <button className={classes.google} onClick={signInWithGoogleHandler}> <img src={'https://cdn-icons-png.flaticon.com/128/281/281764.png'} alt="" /> Continue With Google</button>

      </form>
    </div>
  )
}

export default SignUp;