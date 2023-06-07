import React from 'react';
import classes from './Nav.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../config/firebase';

const Nav = () => {
  const user = useSelector(state => state.login.logedIn);

  return (
    <div className={classes.navbar}>
        <div className={classes.logo}>
          <Link to={'/'}><h2><i class="fas fa-terminal"></i> CodingUniverse</h2></Link>
        </div>
        <div className={classes.nav}>
            <ul>
                <li><Link to={'/write'}><i class="fas fa-pen-to-square"></i> Write</Link></li>
                {!user && <li><Link to={'/signup'}><i class="fa-sharp fa-solid fa-user-plus"></i></Link></li>}
                {user && <li><Link to="/profile"><i class="fa-solid fa-user"></i></Link></li>}
            </ul>
        </div>
    </div>
  )
}

export default Nav;