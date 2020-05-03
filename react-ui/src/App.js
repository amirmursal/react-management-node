import React, { Component } from "react";
import "../node_modules/bulma/css/bulma.css";
import Layout from "../src/components/layout/Layout";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "../src/components/login/Login";
import UserProvider from "./components/provider/UserProvider";
import "react-datepicker/dist/react-datepicker.css";

const history = createBrowserHistory();

const LayoutComponent = (props) => <Layout {...props} />;
const LoginComponent = (props) => <Login {...props} />;

class App extends Component {
  render() {
    return (
      <UserProvider>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={LoginComponent} />
            <Route path="/" component={LayoutComponent} />
          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
