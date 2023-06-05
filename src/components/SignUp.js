import React, { useEffect, useState } from 'react';
import classes from './SignUp.module.css';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    if(auth.currentUser){
      navigate('/write');
    }
  },[])
  
  const registrationHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      navigate('/signin');
    } catch (error) {
    }
  }

  const signInWithGoogleHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      navigate('/');

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.main}>
      <form onSubmit={registrationHandler} className={classes.form}>
        <h2>SignUp</h2>

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