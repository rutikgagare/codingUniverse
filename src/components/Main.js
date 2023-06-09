import React from 'react';
import classes from './Main.module.css';
import image from './undraw_Proud_coder_re_exuy.png';

const Main = () => {
  return (
    <div className={classes.main_content}>
      <div className={classes.left}>
        <h2>Explore, Learn, and Empower Your Coding Journey</h2>
        <p>Looking to enhance your coding skills or dive into a new programming language? You've come to the right place! Our interactive platform brings together passionate coders from all walks of life, offering a celestial collection of technical articles to read and write. Welcome to Coding Universe, where coding dreams become a celestial reality! 🌟</p>
      </div>
      <div className={classes.right}>
        <img src={image} alt="" />
      </div>
    </div>
  )
}

export default Main;