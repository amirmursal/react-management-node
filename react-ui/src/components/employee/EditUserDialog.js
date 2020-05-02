import React from "react";
import axios from "axios";

export default class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name || "",
      username: this.props.user.username || "",
      password: this.props.user.password || "",
      email: this.props.user.email || "",
      role: this.props.user.role || ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        name: this.props.user.name,
        username: this.props.user.username,
        password: this.props.user.password,
        email: this.props.user.email,
        role: this.props.user.role
      });
    }
  }

  // update user
  udpateUser = () => {
    const user = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      role: this.state.role
    };
    axios
      .put("/api/updateUser/" + this.props.user._id, user)
      .then(response => {
        this.props.openEditUserDialog(this.props.user);
        this.props.getUsers();
      })
      .catch(error => {
        console.log(error);
      });
  };

  // common input change handler for imput and select
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const isActive = this.props.isEditUserDialogOpen;
    const activeClass = isActive ? "modal is-active" : "modal";
    const isDisable =
      !this.state.name ||
      !this.state.email ||
      !this.state.username ||
      !this.state.password;
    return (
      <div className="modal-container">
        <div className={activeClass}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit User</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => this.props.openEditUserDialog(this.props.user)}
              />
            </header>
            <section className="modal-card-body">
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <label className="label">Name</label>
                      <input
                        className="input"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={event => this.handleChange(event)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">Email</label>
                      <input
                        className="input"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={event => this.handleChange(event)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <label className="label">Username</label>
                      <input
                        className="input"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={this.state.username}
                        onChange={event => this.handleChange(event)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">Password</label>
                      <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={event => this.handleChange(event)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <label className="label">Role</label>
                      <div className="select">
                        <select
                          onChange={event => this.handleChange(event)}
                          value={this.state.role}
                          name="role"
                        >
                          <option>Admin</option>
                          <option>User</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={() => this.udpateUser()}
                disabled={isDisable}
              >
                Save
              </button>
              <button
                className="button"
                onClick={() => this.props.openEditUserDialog(this.props.user)}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
