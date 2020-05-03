import React from "react";
import axios from "axios";
import ReactTable from "react-table";

export default class Training extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getFiles();
  }

  /**
   * get all the files associated
   */

  getFiles = () => {
    axios
      .get("/api/getFiles/")
      .then((response) => {
        this.setState({
          data: response.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const columns = [
      {
        Header: "Index",
        Cell: (props) => <span>{props.index + 1}</span>,
      },
      {
        Header: "File Name",
        Cell: (props) => {
          return <span>{props.original.filename}</span>;
        },
      },
      {
        Header: "View",
        Cell: (props) => {
          console.log(props);
          return (
            <a href={props.original.path.split("\\")[2]} download>
              Download
            </a>
          );
        },
      },
    ];
    return (
      <div className="panel LeavePanel">
        <p className="panel-heading">Traning Data</p>
        <div className="panel-block">
          <ReactTable
            data={this.state.data}
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
