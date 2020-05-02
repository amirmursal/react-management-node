import React from "react";
import Header from "../header/Header";
import Login from "../login/Login";
//import Footer from "../footer/Footer";
import { UserConsumer } from "../provider/UserProvider";
import Home from "../home/Home";
import MyLeaves from "../leaves/MyLeaves";
import ApplyLeave from "../leaves/ApplyLeave";
import LeaveRequest from "../leaves/LeaveRequest";
import LeaveStatus from "../leaves/LeaveStatus";
import UserManagement from "../employee/UserManagement";
import { Route, Redirect } from "react-router-dom";

const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));

const ApplyLeaveRoute = ({ component: ApplyLeave, ...rest }) => (
  <UserConsumer>
    {({ user }) => (
      <Route
        {...rest}
        render={props =>
          user.role === "User" || isLoggedIn.role === "User" ? (
            <ApplyLeave {...props} user={user} key={props.location.pathname} />
          ) : (
            <Redirect
              to={{
                pathname: "/login"
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
        render={props =>
          user.role === "User" || isLoggedIn.role === "User" ? (
            <MyLeaves {...props} user={user} />
          ) : (
            <Redirect
              to={{
                pathname: "/login"
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
        render={props =>
          user.role === "Admin" || isLoggedIn.role === "Admin" ? (
            <LeaveRequest {...props} user={user} />
          ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
        }
      />
    )}
  </UserConsumer>
);

const LeaveStatusRoute = ({ component: LeaveStatus, ...rest }) => (
  <UserConsumer>
    {({ user }) => (
      <Route
        {...rest}
        render={props =>
          user.role === "Admin" || isLoggedIn.role === "Admin" ? (
            <LeaveStatus {...props} user={user} />
          ) : (
            <Redirect
              to={{
                pathname: "/login"
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
        render={props =>
          user.role === "Admin" || isLoggedIn.role === "Admin" ? (
            <UserManagement {...props} user={user} />
          ) : (
            <Redirect
              to={{
                pathname: "/login"
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
          <LeaveStatusRoute path="/leaveStatus" component={LeaveStatus} />
          <UserManagementRoute
            path="/userManagement"
            component={UserManagement}
          />
        </div>
        {/*<Footer />*/}
      </div>
    ) : (
      <Login history={this.props.history} />
    );
  }
}
