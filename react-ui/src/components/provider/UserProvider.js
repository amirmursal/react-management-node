import React from "react";
const UserContext = React.createContext();
export const UserConsumer = UserContext.Consumer;

export default class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  setUser = details => {
    this.setState({
      user: details
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.user !== prevState.user) {
      localStorage.setItem("loggedIn", JSON.stringify(this.state.user));
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          setUser: this.setUser
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
