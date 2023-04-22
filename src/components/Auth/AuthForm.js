import { useState, useRef,useContext } from "react";
import CreateAuth from "../../Store/Create-Auth";
import classes from "./AuthForm.module.css";
import {useHistory} from 'react-router-dom'

const AuthForm = () => {
  const history = useHistory();
  const authCtx = useContext(CreateAuth);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoding] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value);
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    
    setIsLoding(true);
    let url;

    if (isLogin) {
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDaChvkx_NS4CJiqX6UYkIpsRjZ02YeKDQ";
      
    }
    else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDaChvkx_NS4CJiqX6UYkIpsRjZ02YeKDQ";
    }
    
    try {
      const response = await fetch(url,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        authCtx.addTokens(data.idToken);
        history.replace('/');
        // console.log(data);
      } else {
        alert("Invalid-Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
       

        <div className={classes.actions}>
          {/* {isLoading  && <p style={{ color: "white" }}>Sending request...</p>} */}
            
            <button>{isLogin ? "Login" : "Create Account"}</button>


          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
