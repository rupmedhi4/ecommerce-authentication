import CreateAuth from "./Create-Auth";
import { useEffect, useState } from "react";
const AuthProvider = (props) => {
  const intialToken = localStorage.getItem("token");
  const [tokens, setTokens] = useState(intialToken);
  const [intervalID, setIntervalId] = useState(null);
  
  useEffect(() => {
    if (tokens !== null) {
     const Id = setInterval(() => {
        autoLogOut();
     }, 10000);
      // setIntervalId(Id);
    }
  });

  const autoLogOut = () => {
    console.log('logout')
    removeTokens();
  };

  const addTokenHandler = (token) => {
    setTokens(token);
    localStorage.setItem("token", token);
  };
  const removeTokens = () => {
    // clearInterval(intervalID)
    setTokens(null);
    localStorage.removeItem("token");
  };
  const userIsLoggedIn = !!tokens;
  // console.log(tokens);

  const context = {
    tokenStore: tokens,
    isLoggedIN: userIsLoggedIn,
    addTokens: addTokenHandler,
    removeTokens: removeTokens,
  };
  return (
    <CreateAuth.Provider value={context}>{props.children}</CreateAuth.Provider>
  );
};

export default AuthProvider;
