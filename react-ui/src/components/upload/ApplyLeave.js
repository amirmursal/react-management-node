import React from "react";
import moment from "moment";
import axios from "axios";
import DatePicker from "react-datepicker";

export default class ApplyLeave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      reason: "",
      message: "",
      leaveID: null,
    };
  }

  componentDidMount() {
    const leaveID = this.props.location.pathname.slice(12);
    if (leaveID) {
      axios
        .get("/api/getLeaveDetails/" + leaveID)
        .then((response) => {
          this.setState({
            startDate: new Date(response.data.startDate),
            endDate: new Date(response.data.endDate),
            reason: response.data.reason,
            message: "",
            leaveID: leaveID,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleChangeStart = (date) => {
    this.setState({
      startDate: date,
      message: "",
    });
  };

  handleChangeEnd = (date) => {
    this.setState({
      endDate: date,
      message: "",
    });
  };

  handleChangeReason = (event) => {
    this.setState({
      reason: event.target.value,
      message: "",
    });
  };

  /**
   * Create leave request
   */
  submitLeaveRequest = () => {
    const leaveDays = this.calculateDaysLeft(
      this.state.startDate,
      this.state.endDate
    );
    const leaveData = {
      appliedDate: new Date(),
      reuestedLeaveDays: leaveDays,
      reason: this.state.reason,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      userId: this.props.user._id,
      name: this.props.user.name,
      approved: false,
      rejected: false,
    };
    let axiosCall;
    if (this.state.leaveID) {
      axiosCall = axios.put(
        "/api/updateLeave/" + this.state.leaveID,
        leaveData
      );
    } else {
      axiosCall = axios.post("/api/applyLeave", leaveData);
    }
    axiosCall
      .then((response) => {
        this.setState({
          startDate: new Date(),
          endDate: new Date(),
          reason: "",
          message: response.data.message,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  calculateDaysLeft = (startDate, endDate) => {
    if (!moment.isMoment(startDate)) startDate = moment(startDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);
    return Math.round(endDate.diff(startDate, "days", true) + 1);
  };

  render() {
    const isDisable =
      !this.state.startDate || !this.state.endDate || !this.state.reason;
    const labelValue = !this.state.leaveID ? "Apply" : "Modify";
    return (
      <div className="panel LeavePanel">
        <p className="panel-heading">Apply Leave</p>
        <div className="panel-block ">
          <fieldset>
            <div className="field">
              <label className="label">From</label>
              <div className="control">
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
            <div className="field">
              <label className="label">To</label>
              <div className="control">
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
            <div className="field">
              <label className="label">Reason</label>
              <div className="control">
                <textarea
                  className="input textArea"
                  type="text"
                  placeholder="reason"
                  value={this.state.reason}
                  onChange={(event) => this.handleChangeReason(event)}
                  rows="15"
                  cols="50"
                />
              </div>
            </div>
            <div className="field">
              <label className="help is-success">{this.state.message}</label>
            </div>
            <div className="field">
              <button
                disabled={isDisable}
                className="button is-primary"
                onClick={() => this.submitLeaveRequest()}
              >
                {labelValue}
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}
