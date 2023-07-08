import React, { useState,useEffect } from 'react';
import Nav from './Nav';
import classes from './Jobs.module.css';
import img from './Jobs.png';
import Job from './Job.js';
import { auth } from '../config/firebase';
import { loginActions } from '../store/loginSlice';
import { useDispatch } from 'react-redux';
import Loader from './Loader';

const Jobs = () => {
    const [loading,setLoading] = useState(false);
    const [jobList,setJobList] = useState([]);

    const dispatch = useDispatch();

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

    useState(()=>{
        const fetchData = async()=>{
            const response = await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/jobs.json');
            const data = await response.json();
            console.log(data);
            setJobList(Object.values(data));
        }
        fetchData();
    },[]);

    return (
        <>
            {loading && <Loader></Loader>}
            <Nav></Nav>

            <div className={classes.intro}>
                <div className={classes.right}>
                    <h2>Find Your Dream Job and Launch Your Career</h2>
                    <h3>Discover Exciting Opportunities and Take the Next Step Towards Success</h3>
                    <p>Welcome to our Job Portal, the ultimate destination for job seekers and employers alike. Whether you're searching for your dream job or looking to hire top talent, our platform provides a seamless and efficient solution. With our extensive database of diverse job listings and advanced search features, finding the perfect match has never been easier. Discover a wide range of career opportunities, connect with industry-leading companies, and take your professional journey to new heights. Join us today and let us empower your path to success.</p>
                </div>
                <div className={classes.left}>
                    <img src={img} alt="" />
                </div>
            </div>

            <div className={classes.jobs}>
                {jobList.map((job) => {
                    return (
                        <Job 
                            role={job.role}
                            company={job.company}
                            deadline={job.deadline}
                            experience={job.experience}
                            url={job.url}
                            logoURL={job.logo}
                        ></Job>
                    )
                })}
            </div>

            <div className={classes.alert}>
                <h3>🚀 Get ready for an incredible journey! Stay tuned for exciting job opportunities coming soon! 🌟</h3>
            </div>
        </>
    );
}

export default Jobs;