import React from "react";
import axios from "axios";
export const EmployeeContext = React.createContext();
export const EmployeeConsumer = EmployeeContext.Consumer;

class EmployeeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get("/api/getUsers")
      .then(response => {
        this.setState({
          users: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <EmployeeContext.Provider
        value={{
          users: this.state.users,
          isLoading: this.state.isLoading,
          getUsers: this.getUsers
        }}
      >
        {this.props.children}
      </EmployeeContext.Provider>
    );
  }
}

export default EmployeeProvider;
