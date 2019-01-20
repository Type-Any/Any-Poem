import cookie from "cookie";
import { NextContext } from "next";
import Router from "next/router";
import React from "react";
import { withApollo } from "react-apollo";
import { SET_ISLOGIN } from "../../lib/client/queries";
import checkLogin from "../../utils/checkLogin";
import LoginPresenter from "./LoginPresenter";
import { EMAIL_SIGN_IN } from "./LoginQueries";
import redirect from "../../utils/redirect";

interface IProps {
  from: string;
  // loggedInUser: {
  //   ok: boolean;
  //   error: string;
  // };
}

class Login extends React.Component<IProps> {
  static async getInitialProps(context: NextContext): Promise<IProps> {
    const initialProps = {
      from: "client"
    };

    const { loggedInUser } = await checkLogin(context.apolloClient);

    if (context.req) {
      // server side
      initialProps.from = "server";
      if (loggedInUser) {
        redirect(context, "/");
      }
    } else {
      // redirect if logged in && client side
      if (loggedInUser) {
        redirect({}, "/");
      }
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

      this.props.client.cache.reset().then(() =>
        this.props.client
          .mutate({
            mutation: SET_ISLOGIN,
            variables: { isLogin: true }
          })
          .then(() => {
            Router.replace("/");
          })
      );
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
