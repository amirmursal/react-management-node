import React from "react";
import Header from "../header/Header";
import Login from "../login/Login";
import { UserConsumer } from "../provider/UserProvider";
import Home from "../home/Home";
import MyLeaves from "../upload/MyLeaves";
import ApplyLeave from "../upload/ApplyLeave";
import LeaveRequest from "../upload/LeaveRequest";
import Upload from "../upload/Upload";
import UserManagement from "../employee/UserManagement";
import { Route, Redirect } from "react-router-dom";

const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));

const ApplyLeaveRoute = ({ component: ApplyLeave, ...rest }) => (
  <UserConsumer>
    {({ user }) => (
      <Route
        {...rest}
        render={(props) =>
          user.role === "User" || isLoggedIn.role === "User" ? (
            <ApplyLeave {...props} user={user} key={props.location.pathname} />
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

const MyLeavesRoute = ({ component: MyLeaves, ...rest }) => (
  <UserConsumer>
    {({ user }) => (
      <Route
        {...rest}
        render={(props) =>
          user.role === "User" || isLoggedIn.role === "User" ? (
            <MyLeaves {...props} user={user} />
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

const LeaveRequestRoute = ({ component: LeaveRequest, ...rest }) => (
  <UserConsumer>
    {({ user }) => (
      <Route
        {...rest}
        render={(props) =>
          user.role === "Admin" || isLoggedIn.role === "Admin" ? (
            <LeaveRequest {...props} user={user} />
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
          <Route path="/" exact component={Home} />
          <MyLeavesRoute path="/myLeaves" component={MyLeaves} />
          <ApplyLeaveRoute path="/applyLeave" component={ApplyLeave} />
          <LeaveRequestRoute path="/leaveRequest" component={LeaveRequest} />
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
