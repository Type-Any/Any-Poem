import React from "react";
import { GetMyProfileResponse } from "../../types/graph";
import { ctxWithApollo } from "../../types/types";
import checkLogin from "../../utils/checkLogin";
import redirect from "../../utils/redirect";
import AboutPresenter from "./AboutPresenter";

interface IProps {
  loggedInUser: GetMyProfileResponse | null;
}
export default class extends React.Component<IProps> {
  static async getInitialProps(context: ctxWithApollo): Promise<{}> {
    const initialProps = {
      loggedInUser: null
    };

    const { loggedInUser } = await checkLogin(context.apolloClient);
    initialProps.loggedInUser = loggedInUser;

    if (context.req) {
      // server side
      if (!loggedInUser || !loggedInUser.ok) {
        redirect(context, "/");
      }
    } else {
      // redirect if logged in && client side
      if (!loggedInUser || !loggedInUser.ok) {
        redirect({}, "/");
      }
    }

    return initialProps;
  }

  render() {
    return <AboutPresenter {...this.props} />;
  }
}
