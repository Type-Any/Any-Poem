import { ApolloClient } from "apollo-client";
import cookie from "cookie";
import Router from "next/router";
import React from "react";
import { withApollo } from "react-apollo";
import { SET_ISLOGIN } from "../../lib/client/queries";
import { IctxWithApolloAndOauthUser, IOauthUserResponse, IPropsWithApollo } from "../../types/types";
import redirect from "../../utils/redirect";
import { EMAIL_SIGN_IN } from "../login/LogInQueries";
import { EMAIL_SIGN_UP } from "../signup/SignUpQueries";
import AuthPresenter from "./AuthPresenter";
import { CHECK_USER_EXISTS } from "./AuthQueries";

const getCleanOauthUserData = (oauthUser: any) => {
  const result = {
    email: "",
    fullName: "",
    id: "",
    provider: oauthUser.provider
  };
  switch (oauthUser.provider) {
    case "google":
      result.id = oauthUser.id;
      result.email = oauthUser._json.email;
      result.fullName = oauthUser._json.name;
      break;
    case "facebook":
      result.id = oauthUser.id;
      result.email = "";
      result.fullName = oauthUser.name.familyName + oauthUser.name.givenName;
      break;
    case "naver":
      result.id = oauthUser.id;
      result.email = oauthUser._json.email;
      result.fullName = "";
      break;
    case "kakao":
      result.id = oauthUser.id.toString();
      result.email = oauthUser._json.kaccount_email;
      result.fullName = oauthUser.username;
      break;
    default:
      break;
  }
  return result;
};

interface IState {
  email: string;
  fullName: string;
  penName: string;
}
class AuthContainer extends React.Component<IPropsWithApollo & { user: IOauthUserResponse }, IState> {
  static async getInitialProps(context: IctxWithApolloAndOauthUser): Promise<{ user: IOauthUserResponse }> {
    const initialProps = {
      user: {
        email: "",
        fullName: "",
        id: "",
        provider: ""
      }
    };

    // if Oauth is authenticated, user information will be passed within context.query.user
    if (context.query.user) {
      const { data } = await context.apolloClient.query({
        query: CHECK_USER_EXISTS,
        variables: {
          oauthId: context.query.user.provider === "kakao" ? context.query.user.id.toString() : context.query.user.id
        }
      });
      const { CheckUserExists } = data;
      if (CheckUserExists.ok) {
        // oauthId is already exists
        const { data } = await context.apolloClient.mutate({
          mutation: EMAIL_SIGN_IN,
          variables: {
            email: CheckUserExists.user.email,
            oauthId: context.query.user.provider === "kakao" ? context.query.user.id.toString() : context.query.user.id
          }
        });
        if (data.EmailSignIn.ok) {
          if (context.req && context.res) {
            // set cookie in SSR
            context.res.setHeader("Set-Cookie", [
              `anypoemJWT=${data.EmailSignIn.token}; Path=/; Max-Age=${30 * 24 * 60 * 60}`
            ]);
            redirect(context, "/");
          } else {
            // in case of accessed in CSR, redirect to /
            redirect({}, "/");
          }
        } else {
          console.log(data.EmailSignIn.error);
        }
      } else {
        // needs to Sign Up
        initialProps.user = getCleanOauthUserData(context.query.user);
      }
    } else {
      if (context.req) {
        redirect(context, "/");
      } else {
        redirect({}, "/");
      }
    }

    return initialProps;
  }

  constructor(props: IPropsWithApollo & { user: IOauthUserResponse }) {
    super(props);
    this.state = {
      email: props.user.email,
      fullName: props.user.fullName,
      penName: props.user.fullName
    };
  }

  _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value
    } as { [K in keyof IState]: IState[K] });
  };

  _handleSubmit = async () => {
    const oauthId = this.props.user.id;
    const { email, fullName, penName } = this.state;
    const { data } = await this.props.client.mutate({
      mutation: EMAIL_SIGN_UP,
      variables: {
        email,
        fullName,
        oauthId,
        penName
      }
    });
    if (data.EmailSignUp.ok) {
      document.cookie = cookie.serialize("anypoemJWT", data.EmailSignUp.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/"
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
      console.log(data.EmailSignUp.error);
    }
  };

  render() {
    const { email, fullName, penName } = this.state;
    return (
      <AuthPresenter
        email={email}
        fullName={fullName}
        penName={penName}
        handleChange={this._handleChange}
        handleSubmit={this._handleSubmit}
      />
    );
  }
}

export default withApollo(AuthContainer);
