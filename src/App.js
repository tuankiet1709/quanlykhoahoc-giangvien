import InLineLoader from "./components/InlineLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import "react-notifications/lib/notifications.css";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { lazy, Suspense, useEffect } from "react";
import {NotificationContainer} from 'react-notifications';
import { CssBaseline, Grid } from "@mui/material";
import Routes from './routes'
import "./styles/App.css"
import "./styles/CheckBoxOption.css"
import "./styles/ClickToShow.css"
import "./styles/Header.css"
import "./styles/index.css"
import "./styles/Intro.css"
import "./styles/LeftSideBar.css"
import "./styles/PasswordInput.css"
import "./styles/Modal.css"
import "./styles/Table.css"

function App() {
  useEffect(() => {
    document.title = "CNPMNC";
  }, []);

  return (
    <>
      <NotificationContainer/>

      <CssBaseline />
      <Router>
        <Routes/>
      </Router>
    </>
  );
}

export default App;
