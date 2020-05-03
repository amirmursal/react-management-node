import React from "react";
import axios from "axios";
import ReactTable from "react-table";
import moment from "moment";
import "./leaves.css";
import "../../../node_modules/react-table/react-table.css";

export default class MyLeaves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaves: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.getLeaves();
  }

  /**
   * get all the leaves associated
   * with perticular user
   */

  getLeaves = () => {
    axios
      .get("/api/getLeaves/" + this.props.user._id)
      .then(response => {
        this.setState({
          leaves: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Delete leave from my leaves table
   * @param leave
   */

  deleteLeaveRequest = leave => {
    axios
      .delete("/api/deleteLeave/" + leave._id)
      .then(response => {
        this.getLeaves();
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Modify leave request
   * @param leave
   */
  editLeaveRequest = leave => {
    this.props.history.push(`/applyLeave/${leave._id}`);
  };

  render() {
    const columns = [
      {
        Header: "Index",
        Cell: props => <span>{props.row._index + 1}</span>
      },
      {
        Header: "Applied Date",
        Cell: props => (
          <span>{moment(props.original.appliedDate).format("DD/MM/YYYY")}</span>
        )
      },
      {
        Header: "To",
        Cell: props => (
          <span>{moment(props.original.startDate).format("DD/MM/YYYY")}</span>
        )
      },
      {
        Header: "From",
        Cell: props => (
          <span>{moment(props.original.endDate).format("DD/MM/YYYY")}</span>
        )
      },
      {
        Header: "Leaves",
        accessor: "reuestedLeaveDays"
      },
      {
        Header: "Reason",
        accessor: "reason"
      },
      {
        Header: "Status",
        Cell: props =>
          props.original.rejected ? (
            <span className="tag is-danger">Rejected</span>
          ) : props.original.approved ? (
            <span className="tag is-success">Approved</span>
          ) : (
            <span className="tag is-info">Awaiting for approval</span>
          )
      },
      {
        Header: "Actions",
        Cell: props =>
          !props.original.approved ? (
            <div className="buttons">
              <button
                className="button is-small is-success"
                onClick={() => this.editLeaveRequest(props.original)}
              >
                Edit
              </button>
              <button
                className="button is-small is-danger"
                onClick={() => this.deleteLeaveRequest(props.original)}
              >
                Delete
              </button>
            </div>
          ) : (
            <span className="tag is-success">Already Approved</span>
          )
      }
    ];
    return (
      <div className="panel LeavePanel">
        <p className="panel-heading">My Leaves</p>
        <div className="panel-block">
          <ReactTable
            data={this.state.leaves}
            columns={columns}
            defaultPageSize={5}
            className="-striped -highlight reactTable"
            minRows={0}
            loading={this.state.isLoading}
            loadingText="Loading..."
          />
        </div>
      </div>
    );
  }
}
