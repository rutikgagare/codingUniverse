import React from 'react';
import Nav from './Nav';
import classes from './Jobs.module.css';
import img from './Jobs.png';
import { Link } from 'react-router-dom';

const Jobs = () => {
    return (
        <>
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
                <div className={classes.job}>
                    <div className={classes.top}>
                        <div className={classes.logo}>
                            <img src="https://media.geeksforgeeks.org/img-practice/prod/jobs/4/Web/Header/whitelotus_1688379941.jpeg" alt="" />
                        </div>
                        <div className={classes.description}>
                            <h2>React JS Developer</h2>
                            <h4>WhiteLotus Corporation</h4>
                            <h4>Exp 1 years</h4>
                        </div>
                    </div>

                    <hr />

                    <div className={classes.bottom}>
                        <div className={classes.deadline}>
                            <h3>Apply before Aug 03 2023</h3>
                        </div>
                        <div className={classes.apply}>
                            <button><Link to="https://practice.geeksforgeeks.org/jobs/whitelotus-react-js-devs">Apply</Link></button>
                        </div>
                    </div>
                </div>

                <div className={classes.job}>
                    <div className={classes.top}>
                        <div className={classes.logo}>
                            <img src="https://media.geeksforgeeks.org/img-practice/PROD/jobs/09/Web/Header/783825d2-a33d-4ebb-b060-ed37824508be_1685359465.png" alt="" />
                        </div>
                        <div className={classes.description}>
                            <h2>Augmented Automation Student Trainee</h2>
                            <h4>Nokia</h4>
                            <h4>Fresher(2024 Batch)</h4>
                        </div>
                    </div>

                    <hr />

                    <div className={classes.bottom}>
                        <div className={classes.deadline}>
                            <h3>Limited Time Opportunity</h3>
                        </div>
                        <div className={classes.apply}>
                            <button><Link to="https://careers.nokia.com/jobs/augmented-automation-student-trainee-100340">Apply</Link></button>
                        </div>
                    </div>
                </div>
                <div className={classes.job}>
                    <div className={classes.top}>
                        <div className={classes.logo}>
                            <img src="https://media.geeksforgeeks.org/img-practice/PROD/jobs/09/Web/Header/783825d2-a33d-4ebb-b060-ed37824508be_1685359465.png" alt="" />
                        </div>
                        <div className={classes.description}>
                            <h2>Software Engineer</h2>
                            <h4>NatWest</h4>
                            <h4>Fresher</h4>
                        </div>
                    </div>

                    <hr />

                    <div className={classes.bottom}>
                        <div className={classes.deadline}>
                            <h3>Apply before Jul 18 2023</h3>
                        </div>
                        <div className={classes.apply}>
                            <button><Link to="https://jobs.natwestgroup.com/jobs/13001285-software-engineer">Apply</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Jobs;