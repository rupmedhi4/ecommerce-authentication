import React, { useContext,  } from "react";
import { Link,useHistory } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import CreateAuth from '../../Store/Create-Auth';



const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(CreateAuth);

  // console.log(authCtx.tokenStore);


  const logoutHandler = () => {
    authCtx.removeTokens();
    history.replace('/auth')
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIN && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {authCtx.isLoggedIN && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {authCtx.isLoggedIN && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
