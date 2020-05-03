import React from "react";
import axios from "axios";
import ReactTable from "react-table";
export default class LeaveStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      file: "",
      filename: "",
      loading: false,
    };
  }

  /**
   * Handle file uplaod change
   * Create filename
   * @param event
   */
  handleFileChange = (event) => {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }

    const name = event.target.files[0].name;
    this.setState({
      file: event.target.files[0],
      filename: name,
    });
  };

  /**
   * Upload file to node api
   */
  uploadFile = () => {
    let data = new FormData();
    data.append("file", this.state.file);
    this.setState({
      loading: true,
    });
    axios.post("/upload", data).then((response) => {
      this.setState({
        data: response.data,
        loading: false,
      });
    });
  };

  render() {
    return (
      <div className="panel LeavePanel">
        <p className="panel-heading">Upload Training Material</p>
        <div className="panel-block">
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      onChange={this.handleFileChange}
                    />
                    <span className="file-cta">
                      <span className="file-label">Choose a file…</span>
                    </span>
                    <span className="file-name">{this.state.filename}</span>
                  </label>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    className="button is-primary"
                    onClick={() => this.uploadFile()}
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div className="field">{this.state.data.message}</div>
            </div>
          </div>
        </div>
        {/*<div className="panel-block">
          <ReactTable
            data={this.state.leaves}
            columns={columns}
            defaultPageSize={5}
            className="-striped -highlight reactTable"
            minRows={0}
            loading={this.state.isLoading}
            loadingText="Loading..."
          />
        </div>*/}
      </div>
    );
  }
}
