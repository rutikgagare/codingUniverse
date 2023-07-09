import React, {useState,useEffect } from 'react';
import classes from './JobAdmin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { jobActions } from '../../store/jobSlice';
import { Link } from 'react-router-dom';
let send = false;

const JobAdmin = (props) => {

  const dispatch = useDispatch();
  const jobList = useSelector(state => state?.job?.items);

  const [company, setCompany] = useState(props.company);
  const [role, setRole] = useState(props.role);
  const [experience, setExperience] = useState(props.experience);
  const [deadline, setDeadline] = useState(props.deadline);
  const [url, setUrl] = useState(props.url);
  const [logo, setLogo] = useState(props.logoURL);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/jobs.json');
      const data = await response.json();
      dispatch(jobActions.replace(data.items));
    }
    fetchData();
  }, []);

  const deleteJobHandler = () => {
    dispatch(jobActions.deleteJob(props.id));
  }

  const updateJobHandler = () =>{

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
      <div className={classes.job_admin}>
        <div className={classes.left}>
          <h2>Company : {props.company}</h2>
          <h3>Job Role : {props.role}</h3>
          <h3>Experience : {props.experience}</h3>
          <h3>Deadline : {props.deadline}</h3>
          <h3>Application URl : <Link to={props.url}>{props.url}</Link></h3>
          <h3>Logo URL : <Link to={props.logoURL}>{props.logoURL}</Link></h3>
        </div>
        <div className={classes.right}>
          <button>Update</button>
          <button onClick={deleteJobHandler}>Delete</button>
        </div>
      </div>

      {
        
      }

    </>

  )
}

export default JobAdmin;