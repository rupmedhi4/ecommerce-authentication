import classes from './ProfileForm.module.css';
import React, { useContext,useRef } from 'react';
import CreateAuth from '../../Store/Create-Auth';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(CreateAuth); 
  const passRef = useRef();

  const changePasswordHandler = (e) => {
    e.preventDefault();
    const enteredPassword = passRef.current.value;
    console.log(enteredPassword);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDaChvkx_NS4CJiqX6UYkIpsRjZ02YeKDQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.tokenStore,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace('/')
      console.log(res);

    });
  }


  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passRef}/>
      </div>
      <div className={classes.action}>
        <button onClick={changePasswordHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
