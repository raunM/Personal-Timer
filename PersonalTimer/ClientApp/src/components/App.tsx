import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import Layout from "./Layout";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import PersonalTimer from "./PersonalTimer";
import TimeLogs from "./TimeLogs";

import "../custom.css";
import RegisterForm from "./RegisterForm";

export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
		}
  }, []);

  return (
    <BrowserRouter>
      <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
        <Route exact path="/">
          <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>

        <PrivateRoute loggedIn={loggedIn} path="/personal-timer">
          <PersonalTimer />
        </PrivateRoute>

        <PrivateRoute loggedIn={loggedIn} path="/time-logs">
          <TimeLogs />
        </PrivateRoute>

        <Route path="/register">
          <RegisterForm setLoggedIn={setLoggedIn} />
        </Route>
      </Layout>
    </BrowserRouter>
  );
}
