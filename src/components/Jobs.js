import React from 'react';
import Nav from './Nav';
import classes from './Jobs.module.css';
import img from './Jobs.png';
import Job from './Job.js';

const joblist = [
    {
        role: "Augmented Automation Student Trainee",
        company: "Nokia",
        experience: "Fresher (2024 batch)",
        deadline: "Limited Time Opportunity",
        url: "https://careers.nokia.com/jobs/augmented-automation-student-trainee-100340",
        logoURL: "https://media.geeksforgeeks.org/img-practice/PROD/jobs/09/Web/Header/783825d2-a33d-4ebb-b060-ed37824508be_1685359465.png",
    },
    // {
    //     role: "React JS Developer",
    //     company: "WhiteLotus Corporation",
    //     experience: "Exp 1 years",
    //     deadline: "Apply before Aug 03 2023",
    //     url: "https://practice.geeksforgeeks.org/jobs/whitelotus-react-js-devs",
    //     logoURL: "https://media.geeksforgeeks.org/img-practice/prod/jobs/4/Web/Header/whitelotus_1688379941.jpeg",
    // },
    {
        role: "Software Engineer",
        company: "NatWest",
        experience: "Fresher",
        deadline: "Apply before Jul 18 2023",
        url: "https://jobs.natwestgroup.com/jobs/13001285-software-engineer",
        logoURL: "https://media.geeksforgeeks.org/img-practice/PROD/jobs/09/Web/Header/783825d2-a33d-4ebb-b060-ed37824508be_1685359465.png",
    },
    {
        role: "Software Engineering Intern",
        company: "GroundTruth",
        experience: "Fresher (2024 Batch)",
        deadline: "Limited Time Opportunity",
        url: "https://www.groundtruth.com/job/4923253004-2/",
        logoURL: "https://media.geeksforgeeks.org/img-practice/PROD/jobs/09/Web/Header/783825d2-a33d-4ebb-b060-ed37824508be_1685359465.png",
    },
    {
        role: "Data Analyst Intern",
        company: "GroundTruth",
        experience: "Fresher (2024 Batch)",
        deadline: "Limited Time Opportunity",
        url: "https://www.groundtruth.com/job/4923148004-2/",
        logoURL: "https://media.geeksforgeeks.org/img-practice/PROD/jobs/09/Web/Header/783825d2-a33d-4ebb-b060-ed37824508be_1685359465.png",
    },
]

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
                {joblist.map((job) => {
                    return (
                        <Job 
                            role={job.role}
                            company={job.company}
                            deadline={job.deadline}
                            experience={job.experience}
                            url={job.url}
                            logoURL={job.logoURL}
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