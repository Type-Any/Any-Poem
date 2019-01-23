import cookie from "cookie";
import React from "react";
import { withApollo } from "react-apollo";
import { ApolloClientType, NextContextWithApollo } from "../../types/types";
import checkLogin from "../../utils/checkLogin";
import redirect from "../../utils/redirect";
import LoginPresenter from "./LogInPresenter";
import { EMAIL_SIGN_IN } from "./LogInQueries";

interface IProps extends ApolloClientType {
  from: string;
  email: string;
  password: string;
  handleChange: (e: any) => void;
  handleSubmit: () => void;
}

class Login extends React.Component<IProps> {
  static async getInitialProps(context: NextContextWithApollo): Promise<{}> {
    const initialProps = {};

    const { loggedInUser } = await checkLogin(context.apolloClient);
    if (context.req) {
      // server side
      if (loggedInUser && loggedInUser.ok) {
        redirect(context, "/");
      }
    } else {
      // redirect if logged in && client side
      if (loggedInUser && loggedInUser.ok) {
        redirect({}, "/");
      }
    }

    return initialProps;
  }
  state = {
    email: "",
    password: ""
  };

  _handleChange = (e: any): void => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _handleSubmit = async () => {
    const { email, password } = this.state;
    const { data } = await this.props.client.mutate({
      mutation: EMAIL_SIGN_IN,
      variables: {
        email,
        password
      }
    });

    if (data.EmailSignIn.ok) {
      document.cookie = cookie.serialize("token", data.EmailSignIn.token, {
        maxAge: 30 * 24 * 60 * 60 // 30 days
      });
      // apolloClient 초기화를 위한 SSR routing
      window.location.href = "/";
    } else {
      console.log(data.EmailSignIn.error);
    }
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
