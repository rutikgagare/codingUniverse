import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import JobAdmin from './JobAdmin';
import { auth } from '../../config/firebase';
import { loginActions } from '../../store/loginSlice';
import { jobActions } from '../../store/jobSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import Loader from '../Loader';
import classes from './Admin.module.css';
import { useNavigate } from 'react-router-dom';
let send = false;

const Admin = () => {

  const [loading, setLoading] = useState(false);
  const jobList = useSelector(state => state?.job?.items);

  const dispatch = useDispatch();
  const navigte = useNavigate();

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

  useState(() => {
    const fetchData = async () => {
      const response = await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/jobs.json');
      const data = await response.json();
      dispatch(jobActions.replace(data.items));
    }
    fetchData();
  }, []);

  const addJobHandler = () => {
    navigte('/admin/addJob');
  }


  useEffect(() => {
    const sendData = async () => {

      if (send === false) {
        send = true;
        return;
      }

      await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/jobs.json', {
        method: "PUT",
        body: JSON.stringify({ items: jobList })
      });
    }
    sendData();
  }, [jobList]);

  return (
    <>
      {loading && <Loader></Loader>}
      <Nav></Nav>
      <div className={classes.job_admin}>
        <h2 className={classes.heading}>Job Portal Admin</h2>
        <div className={classes.jobs}>
          {jobList?.map((job) => {
            return (
              <JobAdmin
                id={job.id}
                key={job.id}
                role={job.role}
                company={job.company}
                deadline={job.deadline}
                experience={job.experience}
                url={job.url}
                logoURL={job.logo}
              ></JobAdmin>
            )
          })}
        </div>
        <div className={classes.add_job}>
          <button onClick={addJobHandler}>Add New Job</button>
        </div>
      </div>
    </>
  )
}

export default Admin;