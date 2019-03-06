import { NextContext } from "next";
import React from "react";
import { IProfile } from "../../types/user";
import checkLogin from "../../utils/checkLogin";
import AboutPresenter from "./AboutPresenter";
import logout from "../../utils/logout";

interface IProps {
  loggedInUser: {
    ok: boolean;
    profile: IProfile;
    error: string;
  };
  logout: (apolloClient) => void;
}

export default class extends React.Component<IProps> {
  static async getInitialProps(context: NextContext): Promise<IProps> {
    const initialProps = {};

    const { loggedInUser }: IProps = await checkLogin(context.apolloClient);
    initialProps.loggedInUser = loggedInUser;

    initialProps.logout = logout(context.apolloClient);

    if (context.req) {
      // server side
    }

    return initialProps;
  }

  render() {
    return <AboutPresenter {...this.props} />;
  }
}
