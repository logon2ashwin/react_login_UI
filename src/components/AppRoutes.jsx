import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";

const App = (props) => {

  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={localStorage.isLogged ? Dashboard : Login} />
      </Switch>
    </Router>
  );
};

export default App;
