import classes from './StartingPageContent.module.css';
import React, { useContext } from 'react';
import CreateAuth from '../../Store/Create-Auth';
const StartingPageContent = () => {
  const authCtx = useContext(CreateAuth);

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      {authCtx.isLoggedIN && <h2>LoggedIn</h2>}
    </section>
  );
};

export default StartingPageContent;
