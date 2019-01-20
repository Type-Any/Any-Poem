import { NextContext } from "next";
import React from "react";
import { withApollo } from "react-apollo";
import LoginPresenter from "./LoginPresenter";
import { EMAIL_SIGN_IN } from "./LoginQueries";

interface IProps {
  from: string;
}

class Login extends React.Component<IProps> {
  static async getInitialProps({ req }: NextContext): Promise<IProps> {
    const initialProps = {
      from: "client"
    };

    if (req) {
      // server side
      initialProps.from = "server";
    }

    return initialProps;
  }
  state = {
    email: "",
    password: ""
  };
  _handleChange = (e: any): void =>
    this.setState({
      [e.target.name]: e.target.value
    });
  _handleSubmit = () => {
    const { email, password } = this.state;
    this.props.client
      .mutate({
        mutation: EMAIL_SIGN_IN,
        variables: {
          email,
          password
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <LoginPresenter
        {...this.props}
        email={this.state.email}
        password={this.state.password}
        handleChange={this._handleChange}
        handleSubmit={this._handleSubmit}
      />
    );
  }
}

export default withApollo(Login);
