import React from "react";
import {
  //MemoryRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./main/webapp/vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./../src/main/webapp/css/style.css";

import Home from "./main/webapp/jsx/components/Home";
import AssignCaseManager from "./main/webapp/jsx/components/case_manager/AssignCaseManager";

export default function App() {
  return (
    <div>
      <ToastContainer />
      <Switch>
        <Route path="/assign">
          <AssignCaseManager />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
