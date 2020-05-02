import React from "react";
import "./leaves.css";
import axios from "axios";
import ReactTable from "react-table";
import moment from "moment";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
export default class LeaveStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      leaves: [],
      isLoading: false,
      startDate: new Date(),
      endDate: new Date(),
      users: []
    };
  }

  componentDidMount() {
    this.getAllEmployee();
    this.getRecentLeaveRequest();
  }

  handleChange = value => {
    this.setState({
      user_id: value.value
    });
  };

  handleChangeStart = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      endDate: date
    });
  };

  /**
   * Get employee leave details
   * which is in search box
   */
  getEmployeeLeaveDetails = () => {
    let startDate = new Date(this.state.startDate).toISOString();
    let endDate = new Date(this.state.endDate).toISOString();
    axios
      .get(
        "/api/getAllLeaveRequests/" +
          this.state.user_id +
          "/" +
          startDate +
          "/" +
          endDate
      )
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
   * Get all employees leave details
   */
  getAllEmployee = () => {
    axios
      .get("/api/getUsers")
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Get all employees leave details
   */
  getRecentLeaveRequest = () => {
    axios
      .get("/api/getRecentLeaveRequests")
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
        Header: "Status",
        Cell: props =>
          props.original.rejected ? (
            <span className="tag is-danger">Rejected</span>
          ) : props.original.approved ? (
            <span className="tag is-success">Approved</span>
          ) : (
            <span className="tag is-info">Awaiting for approval</span>
          )
      }
    ];

    // create options for react select
    let options = [];
    options.push({ value: "all", label: "All" });
    this.state.users.forEach(user => {
      let obj = { value: user._id, label: user.name };
      if (user.role !== "Admin") options.push(obj);
    });

    const isDisable =
      !this.state.user_id || !this.state.startDate || !this.state.endDate;

    return (
      <div className="panel LeavePanel">
        <p className="panel-heading">Leave Status</p>
        <div className="panel-block">
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field-label is-normal">
                <label className="label">Employee</label>
                <div className="control is-expanded">
                  <Select options={options} onChange={this.handleChange} />
                </div>
              </div>

              <div className="field-label is-normal">
                <label className="label">From</label>
                <div className="control is-expanded">
                  <DatePicker
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                    className="input"
                  />
                </div>
              </div>

              <div className="field-label is-normal">
                <label className="label">To</label>
                <div className="control is-expanded">
                  <DatePicker
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    minDate={this.state.startDate}
                    className="input"
                  />
                </div>
              </div>
              <div className="field-label is-normal">
                <p className="control is-expanded">
                  <button
                    disabled={isDisable}
                    className="button is-info getDetailsButton"
                    onClick={() => this.getEmployeeLeaveDetails()}
                  >
                    Get Details
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
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
