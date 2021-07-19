import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import { initializeLogger } from "./common/logger";
import { ToastContainer } from "react-toastify";

import NavBar from "components/NavBar";
import PrivateRoute from "components/Common/PrivateRoute";
import Login from "components/Authentication/Login";
import PageLoader from "components/PageLoader";
import Dashboard from "components/Dashboard";
import CreateQuiz from "components/Quiz/CreateQuiz";
import EditQuiz from "components/Quiz/EditQuiz";
import ShowQuiz from "components/Quiz/ShowQuiz";
import authApi from "apis/auth";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({});

  const checkLoginStatus = async () => {
    try {
      const response = await authApi.isLoggedIn();
      const { loggedIn, userId, userName, userEmail } = response.data;
      logger.info(response);
      setIsLoggedIn(loggedIn);
      setUser({ userId, userName, userEmail });
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    initializeLogger();
    logger.info("Js-Logger from App.jsx.");
    registerIntercepts();
    checkLoginStatus();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <NavBar isLoggedIn={isLoggedIn} user={user} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/quiz/create" component={CreateQuiz} />
        <Route exact path="/quiz/:id/edit" component={EditQuiz} />
        <Route exact path="/quiz/:id/show" component={ShowQuiz} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
