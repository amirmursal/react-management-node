import React from "react";
import "./leaves.css";
import axios from "axios";
import ReactTable from "react-table";
import moment from "moment";
export default class LeaveRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaves: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getLeaveRequest();
  }

  /**
   * Get all users leave requests
   * which are not approved
   */
  getLeaveRequest = () => {
    axios
      .get("/api/getLeaveRequests")
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
   * Reject leave request
   * @param leave_id
   */
  rejectLeaveRequest = leave => {
    axios
      .put("/api/rejectLeave/" + leave._id)
      .then(response => {
        this.getLeaveRequest();
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Approve leave request
   * @param leave_id
   */
  approveLeaveRequest = leave => {
    axios
      .put("/api/approveLeave/" + leave._id)
      .then(response => {
        this.getLeaveRequest();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const columns = [
      {
        Header: "Index",
        Cell: props => <span>{props.row._index + 1}</span>
      },
      {
        Header: "Employee",
        Cell: props => <span>{props.original.name}</span>
      },
      {
        Header: "Applied Date",
        Cell: props => (
          <span>{moment(props.original.appliedDate).format("DD/MM/YYYY")}</span>
        )
      },
      {
        Header: "Leaves",
        Cell: props => <span>{props.original.reuestedLeaveDays}</span>
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
        Header: "Reason",
        Cell: props => <span>{props.original.reason}</span>
      },
      {
        Header: "Actions",
        Cell: props => (
          <div className="buttons">
            <button
              className="button is-small is-success"
              onClick={() => this.approveLeaveRequest(props.original)}
            >
              Approve
            </button>
            <button
              className="button is-small is-danger"
              onClick={() => this.rejectLeaveRequest(props.original)}
            >
              Reject
            </button>
          </div>
        )
      }
    ];
    return (
      <div className="panel LeavePanel">
        <p className="panel-heading">Leave Requests</p>
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
