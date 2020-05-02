import React from "react";
import axios from "axios";

export default class DeleteUserDialog extends React.Component {
  // delete user
  deleteUser = user => {
    axios
      .delete("/api/deleteUser/" + user._id)
      .then(response => {
        this.props.openDeleteUserDialog(this.props.user);
        this.props.getUsers();
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const isActive = this.props.isDeleteUserDialogOpen;
    const activeClass = isActive ? "modal is-active" : "modal";
    return (
      <div className="modal-container">
        <div className={activeClass}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Delete User</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => this.props.openDeleteUserDialog(this.props.user)}
              />
            </header>
            <section className="modal-card-body">
              Are you sure you want to delete {this.props.user.name} user?
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={() => this.deleteUser(this.props.user)}
              >
                Delete
              </button>
              <button
                className="button"
                onClick={() => this.props.openDeleteUserDialog(this.props.user)}
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
