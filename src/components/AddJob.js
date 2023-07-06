import React,{useState} from 'react';
import Nav from './Nav';
import classes from './AddJob.module.css';

const AddJob = () => {
    const [company,setCompany] = useState('');
    const [role,setRole] = useState('');
    const [experience,setExperience] = useState('');
    const [deadline,setDeadline] = useState('');
    const [url,setUrl] = useState('');
    const [logo,setLogo] = useState('');

    const addJobHandler = async (event) =>{
        event.preventDefault();
        const newJob = {
            role:role,
            company:company,
            experience:experience,
            deadline:deadline,
            url:url,
            logo:logo
        }
        await fetch('https://codinguniverse-20c51-default-rtdb.firebaseio.com/jobs.json', {
            method: "POST",
            body: JSON.stringify(newJob)
        });
        
        setCompany('');
        setRole('');
        setDeadline('');
        setExperience('');
        setUrl('');
        setLogo('');
    }

    return (
        <>  
            <Nav></Nav>
            <div className={classes.add_job}>
                <h2>Add New Job Opening</h2>
                <form onSubmit={addJobHandler}>
                    <label htmlFor="company">Comapny Name</label>
                    <input type="text" id='company' value ={company} onChange={(event)=>{
                        setCompany(event.target.value);
                    }} />

                    <label htmlFor="role">Job Role</label>
                    <input type="text" id='role' value ={role} onChange={(event)=>{
                        setRole(event.target.value);
                    }}/>

                    <label htmlFor="exp">Experience</label>
                    <input type="text" id='exp' value ={experience} onChange={(event)=>{
                        setExperience(event.target.value);
                    }} />

                    <label htmlFor="deadline">deadline</label>
                    <input type="text" id='deadline' value={deadline} onChange={(event)=>{
                        setDeadline(event.target.value);
                    }} />

                    <label htmlFor="url">Application URL</label>
                    <input type="text" id='url' value={url} onChange={(event)=>{
                        setUrl(event.target.value);
                    }} />

                    <label htmlFor="logo">Logo URL</label>
                    <input type="text" id='logo' value={logo} onChange={(event)=>{
                        setLogo(event.target.value);
                    }} />

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddJob