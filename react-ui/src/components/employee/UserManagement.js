import React from "react";
import ReactTable from "react-table";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import AddUserDialog from "./AddUserDialog";
import EmployeeProvider, {
  EmployeeConsumer
} from "../provider/EmployeeProvider";
import "./employee.css";
import "../../../node_modules/react-table/react-table.css";

export default class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditUserDialogOpen: false,
      isDeleteUserDialogOpen: false,
      isAddUserDialogOpen: false,
      user: {}
    };
  }
  openDeleteUserDialog = user => {
    this.setState({
      isDeleteUserDialogOpen: !this.state.isDeleteUserDialogOpen,
      user: user
    });
  };

  openEditUserDialog = user => {
    this.setState({
      isEditUserDialogOpen: !this.state.isEditUserDialogOpen,
      user: user
    });
  };

  openAddUserDialog = () => {
    this.setState({
      isAddUserDialogOpen: !this.state.isAddUserDialogOpen
    });
  };

  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Role",
        accessor: "role"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Actions",
        Cell: props => (
          <div className="buttons">
            <button
              className="button is-small is-success"
              onClick={() => this.openEditUserDialog(props.original)}
            >
              Edit
            </button>
            <button
              className="button is-small is-danger"
              onClick={() => this.openDeleteUserDialog(props.original)}
            >
              Delete
            </button>
          </div>
        )
      }
    ];
    return (
      <EmployeeProvider>
        <EmployeeConsumer>
          {({ users, isLoading, getUsers }) => (
            <div className="panel employeePanel">
              <p className="panel-heading">User Management</p>

              <div className="panel-block">
                <div className="field">
                  <button
                    className="button is-info is-small"
                    onClick={() => this.openAddUserDialog()}
                  >
                    Add user
                  </button>
                </div>
              </div>

              <div className="panel-block">
                <ReactTable
                  data={users}
                  columns={columns}
                  defaultPageSize={5}
                  className="-striped -highlight reactTable"
                  minRows={0}
                  loading={isLoading}
                  loadingText="Loading..."
                />
              </div>
              <EditUserDialog
                isEditUserDialogOpen={this.state.isEditUserDialogOpen}
                user={this.state.user}
                openEditUserDialog={() =>
                  this.openEditUserDialog(this.state.user)
                }
                getUsers={getUsers}
              />
              <DeleteUserDialog
                isDeleteUserDialogOpen={this.state.isDeleteUserDialogOpen}
                user={this.state.user}
                openDeleteUserDialog={() =>
                  this.openDeleteUserDialog(this.state.user)
                }
                getUsers={getUsers}
              />

              <AddUserDialog
                isAddUserDialogOpen={this.state.isAddUserDialogOpen}
                openAddUserDialog={() => this.openAddUserDialog()}
                getUsers={getUsers}
              />
            </div>
          )}
        </EmployeeConsumer>
      </EmployeeProvider>
    );
  }
}
