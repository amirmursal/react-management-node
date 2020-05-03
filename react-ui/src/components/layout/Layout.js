import React from "react";
import Header from "../header/Header";
import Login from "../login/Login";
import { UserConsumer } from "../provider/UserProvider";
import Training from "../upload/Training";
import Upload from "../upload/Upload";
import UserManagement from "../employee/UserManagement";
import { Route, Redirect } from "react-router-dom";

const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));

const TrainingRoute = ({ component: Training, ...rest }) => (
  <UserConsumer>
    {({ user }) => (
      <Route
        {...rest}
        render={(props) =>
          user.role === "User" || isLoggedIn.role === "User" ? (
            <Training {...props} user={user} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    )}
  </UserConsumer>
);

const UploadRoute = ({ component: Upload, ...rest }) => (
  <UserConsumer>
    {({ user }) => (
      <Route
        {...rest}
        render={(props) =>
          user.role === "Admin" || isLoggedIn.role === "Admin" ? (
            <Upload {...props} user={user} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    )}
  </UserConsumer>
);
const UserManagementRoute = ({ component: UserManagement, ...rest }) => (
  <UserConsumer>
    {({ user }) => (
      <Route
        {...rest}
        render={(props) =>
          user.role === "Admin" || isLoggedIn.role === "Admin" ? (
            <UserManagement {...props} user={user} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    )}
  </UserConsumer>
);

export default class Layout extends React.Component {
  render() {
    const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    return isLoggedIn ? (
      <div>
        <Header history={this.props.history} />
        <div className="container">
          <TrainingRoute path="/" exact component={Training} />
          <UploadRoute path="/upload" component={Upload} />
          <UserManagementRoute
            path="/userManagement"
            component={UserManagement}
          />
        </div>
      </div>
    ) : (
      <Login history={this.props.history} />
    );
  }
}
