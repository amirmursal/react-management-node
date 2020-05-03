import React from "react";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { UserConsumer } from "../provider/UserProvider";

export default class Header extends React.Component {
  logout = () => {
    localStorage.removeItem("loggedIn");
    this.props.history.push("/login");
  };

  render() {
    const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    return (
      <UserConsumer>
        {({ user }) => (
          <nav className="navbar is-light" aria-label="main navigation">
            <div className="navbar-brand" />
            <a className="navbar-item" href="/">
              <img src={logo} alt="medinetcorp" />
            </a>

            <div className="navbar-menu">
              <div className="navbar-end">
                {(user.role === "User" || isLoggedIn.role === "User") && (
                  <div className="navbar-item has-dropdown is-hoverable">
                    <Link className="navbar-link" to="#">
                      Leaves
                    </Link>

                    <div className="navbar-dropdown">
                      <Link className="navbar-item" to="/myLeaves">
                        My Leaves
                      </Link>
                      <Link className="navbar-item" to="/applyLeave">
                        Apply Leave
                      </Link>
                    </div>
                  </div>
                )}

                {(user.role === "Admin" || isLoggedIn.role === "Admin") && (
                  <div className="navbar-item has-dropdown is-hoverable">
                    <Link className="navbar-link" to="#">
                      Actions
                    </Link>
                    <div className="navbar-dropdown">
                      <Link className="navbar-item" to="/userManagement">
                        User Management
                      </Link>
                      <Link className="navbar-item" to="/upload">
                        Upload Training
                      </Link>
                    </div>
                  </div>
                )}

                <div className="navbar-item" onClick={() => this.logout()}>
                  Logout
                </div>
              </div>
            </div>
          </nav>
        )}
      </UserConsumer>
    );
  }
}
