import { ApolloClient } from "apollo-client";
import cookie from "cookie";
import React from "react";
import { withApollo } from "react-apollo";
import { ctxWithApollo } from "../../types/types";
import checkLogin from "../../utils/checkLogin";
import redirect from "../../utils/redirect";
import LogInPresenter from "./LogInPresenter";
import { EMAIL_SIGN_IN } from "./LogInQueries";

interface IPropsWithApollo {
  client: ApolloClient<any>;
}

class Login extends React.Component<IPropsWithApollo & {}> {
  static async getInitialProps(context: ctxWithApollo): Promise<{}> {
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
      <LogInPresenter
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
