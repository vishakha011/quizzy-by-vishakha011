import Logger from "js-logger";
import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { setAuthHeaders } from "./apis/axios";
import { initializeLogger } from "./common/logger";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    Logger.info("Js-looger from App.jsx");
    setAuthHeaders(setLoading);
  }, []);

  return <h1>App.jsx</h1>;
};

export default App;
