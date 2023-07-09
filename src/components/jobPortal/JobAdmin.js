import React, { useState, useEffect } from 'react';
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
  const [update, setUpdate] = useState(false);

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

  const triggerUpdateHandler = () =>{
    setUpdate(!update);
  }

  const updateJobHandler = (event) => {
    event.preventDefault();

    dispatch(jobActions.updateJob({
      id:props.id,
      role: role,
      company: company,
      experience: experience,
      deadline: deadline,
      url: url,
      logo: logo
    }));
    triggerUpdateHandler();
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
      {!update && <div className={classes.job_admin}>
        <div className={classes.left}>
          <h2>Company : {props.company}</h2>
          <h3>Job Role : {props.role}</h3>
          <h3>Experience : {props.experience}</h3>
          <h3>Deadline : {props.deadline}</h3>
          <h3>Application URl : <Link to={props.url}>{props.url}</Link></h3>
          <h3>Logo URL : <Link to={props.logoURL}>{props.logoURL}</Link></h3>
        </div>
        <div className={classes.right}>
          <button onClick={triggerUpdateHandler}>Update</button>
          <button onClick={deleteJobHandler}>Delete</button>
        </div>
      </div>}

      {update &&

        <form onSubmit={updateJobHandler} className={classes.job_admin}>
          <div className={classes.left}>
            <h2>Company : <input value={company} onChange={(event)=>{setCompany(event.target.value)}}></input></h2>
            <h3>Job Role : <input value={role} onChange={(event)=>{setRole(event.target.value)}}></input></h3>
            <h3>Experience : <input value={experience} onChange={(event)=>{setExperience(event.target.value)}}></input></h3>
            <h3>Deadline : <input value={deadline} onChange={(event)=>{setDeadline(event.target.value)}}></input></h3>
            <h3>Application URl : <input value={url} onChange={(event)=>{setUrl(event.target.value)}}></input></h3>
            <h3>Logo URL : <input value={logo} onChange={(event)=>{setLogo(event.target.value)}}></input></h3>
          </div>
          <div className={classes.right}>
            <button type='submit'>Submit Changes</button>
            <button onClick={triggerUpdateHandler}>Cancel</button>
          </div>
        </form>
      }

    </>

  )
}

export default JobAdmin;