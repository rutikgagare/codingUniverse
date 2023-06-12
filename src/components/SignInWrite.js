import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SignUp.module.css';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const SignInWrite = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    const loginHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);
          
            clearTimeout(timer);
            navigate('/write');

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
            navigate('/write');

        } catch (error) {
            // console.log(error);
        }
    }

    return (
        <div className={classes.main}>

            <form className={classes.form} onSubmit={loginHandler} >
                <h2>Welcome back </h2>
                <input type="email" placeholder='Email address' onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />

                <button type="submit">Login <i class="fa-solid fa-arrow-right"></i></button>
                <span>Don't have an account? <Link to="/signupwrite">Sign up</Link></span>

                <div><hr /></div>

                <button className={classes.google} onClick={signInWithGoogleHandler}> <img src={'https://cdn-icons-png.flaticon.com/128/281/281764.png'} alt="" /> Continue With Google</button>

            </form>
        </div>)
}
export default SignInWrite;