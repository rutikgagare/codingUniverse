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
                <li><Link to={'/signup'}>Write</Link></li>
                {/* <li><Link to={'/signup'}>SignUp</Link></li> */}
                {/* {user && <li>{auth.currentUser.email}</li>} */}
            </ul>
        </div>
    </div>
  )
}

export default Nav;