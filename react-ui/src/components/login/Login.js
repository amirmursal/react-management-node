import React from "react";
import { UserConsumer } from "../provider/UserProvider";
import axios from "axios";
import "./login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
    };
  }

  // common input change handler for imput and select
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // login user
  login = (setUser) => {
    const { username, password } = this.state;
    const { history } = this.props;

    const user = {
      username: username,
      password: password,
    };
    axios
      .post("/api/login", user)
      .then((response) => {
        this.setState({
          username: "",
          password: "",
        });
        if (response.data !== null) {
          localStorage.setItem("loggedIn", JSON.stringify(response.data));
          setUser(response.data);
          if (response.data.role !== "Admin") {
            history.push("/");
          } else {
            history.push("/userManagement");
          }
        } else {
          this.setState({
            username: "",
            password: "",
            error: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          username: "",
          password: "",
          error: true,
        });
        console.log(error);
      });
  };

  render() {
    const { username, password } = this.state;
    const isDisable = !username || !password;
    return (
      <div id="login">
        <div className="login-card">
          <div className="card-title">
            <h1>Project Insight</h1>
          </div>

          <div className="content">
            <input
              id="username"
              type="text"
              name="username"
              title="username"
              value={this.state.username}
              placeholder="Username"
              onChange={(event) => this.handleChange(event)}
              tabIndex="1"
            />
            <input
              id="password"
              type="password"
              name="password"
              title="password"
              value={this.state.password}
              placeholder="Password"
              onChange={(event) => this.handleChange(event)}
              tabIndex="2"
            />
            <UserConsumer>
              {({ setUser }) => (
                <button
                  type="submit"
                  className="button is-primary is-medium is-fullwidth"
                  onClick={() => this.login(setUser)}
                  disabled={isDisable}
                  tabIndex="3"
                >
                  Login
                </button>
              )}
            </UserConsumer>
            {this.state.error && (
              <footer className="card-footer">
                <label className="card-footer-item">
                  username of password incorrect
                </label>
              </footer>
            )}
          </div>
        </div>
      </div>
    );
  }
}
