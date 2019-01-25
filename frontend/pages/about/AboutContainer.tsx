import React from "react";
import { ctxWithApollo, IProfile } from "../../types/types";
import checkLogin from "../../utils/checkLogin";
import AboutPresenter from "./AboutPresenter";

interface IProps {
  loggedInUser: {
    ok: boolean;
    profile: IProfile;
    error: string;
  };
}

export default class extends React.Component<IProps> {
  static async getInitialProps(context: ctxWithApollo): Promise<IProps> {
    const { loggedInUser }: IProps = await checkLogin(context.apolloClient);

    if (context.req) {
      // server side
    }

    return { loggedInUser };
  }

  render() {
    return <AboutPresenter {...this.props} />;
  }
}
