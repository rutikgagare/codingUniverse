import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import classes from './AddJob.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { auth } from '../../config/firebase';
import { loginActions } from '../../store/loginSlice';
import Loader from '../Loader';
import { jobActions } from '../../store/jobSlice';
import { v4 as uuid } from 'uuid';


let send = false;

const AddJob = () => {
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [experience, setExperience] = useState('');
    const [deadline, setDeadline] = useState('');
    const [url, setUrl] = useState('');
    const [logo, setLogo] = useState('');

    const dispatch = useDispatch();
    const jobList = useSelector(state => state?.job?.items);

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

    const addJobHandler = async (event) => {
        event.preventDefault();
        const uniqueId = uuid();
        const newJob = {
            id:uniqueId,
            role: role,
            company: company,
            experience: experience,
            deadline: deadline,
            url: url,
            logo: logo
        }

        dispatch(jobActions.addJob(newJob));

        setCompany('');
        setRole('');
        setDeadline('');
        setExperience('');
        setUrl('');
        setLogo('');
    }

    useEffect(() => {
        const sendData = async () => {

            if(send === false){
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
            <div className={classes.add_job}>
                <h2>Add New Job Opening</h2>
                <form onSubmit={addJobHandler}>
                    <label htmlFor="company">Comapny Name</label>
                    <input type="text" id='company' value={company} placeholder='ex. CodingUniverse' onChange={(event) => {
                        setCompany(event.target.value);
                    }} />

                    <label htmlFor="role">Job Role</label>
                    <input type="text" id='role' value={role} placeholder='ex. React Js Developer' onChange={(event) => {
                        setRole(event.target.value);
                    }} />

                    <label htmlFor="exp">Experience</label>
                    <input type="text" id='exp' value={experience} placeholder='ex. 0-1 years / freshers' onChange={(event) => {
                        setExperience(event.target.value);
                    }} />

                    <label htmlFor="deadline">Deadline</label>
                    <input type="text" id='deadline' value={deadline} placeholder='ex. Limited Time Opportunity / Apply before Jul 18 2023' onChange={(event) => {
                        setDeadline(event.target.value);
                    }} />

                    <label htmlFor="url">Application URL</label>
                    <input type="text" id='url' value={url} onChange={(event) => {
                        setUrl(event.target.value);
                    }} />

                    <label htmlFor="logo">Logo URL</label>
                    <input type="text" id='logo' value={logo} onChange={(event) => {
                        setLogo(event.target.value);
                    }} />

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddJob