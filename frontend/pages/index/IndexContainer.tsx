import { NextContext } from "next";
import React from "react";
import IndexPresenter from "./IndexPresenter";

interface IProps {
  from: string;
}

export default class extends React.Component<IProps> {
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

  render() {
    return <IndexPresenter {...this.props} />;
  }
}
