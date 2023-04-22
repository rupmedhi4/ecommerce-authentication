import { Switch, Route,Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CreateAuth from "./Store/Create-Auth";
import React,{useContext} from "react";

function App() {
  const authCtx = useContext(CreateAuth);
  
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIN && <Route path="/auth">
          <AuthPage />
        </Route>}
        <Route path="/profile">
          {authCtx.isLoggedIN && <UserProfile />}
          {!authCtx.isLoggedIN && <Redirect to='/auth' />} 
        </Route>
        <Route path="*">
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
