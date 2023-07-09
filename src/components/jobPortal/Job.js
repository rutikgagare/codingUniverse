import React from 'react';
import classes from './Job.module.css';
import { Link } from 'react-router-dom';

const Job = (props) => {
    return (
        <div className={classes.job}>
            <div className={classes.top}>
                <div className={classes.logo}>
                    <img src={props.logoURL} alt="" />
                </div>
                <div className={classes.description}>
                    <h2>{props.role}</h2>
                    <h4>{props.company}</h4>
                    <h4>{props.experience}</h4>
                </div>
            </div>

            <hr />

            <div className={classes.bottom}>
                <div className={classes.deadline}>
                    <h3>{props.deadline}</h3>
                </div>
                <div className={classes.apply}>
                    <button><Link to={props.url}>Apply</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Job;