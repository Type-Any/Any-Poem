import { NextContext } from "next";
import React from "react";
import { Query } from "react-apollo";
import { GET_POEMS } from "../poem/PoemQueries";
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
    return (
      <Query query={GET_POEMS} variables={{ skip: 0, take: 10 }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error :(</div>;
          }

          if (data.GetPoems.ok) {
            const poems = data.GetPoems.poems;
            return <IndexPresenter {...this.props} poems={poems} />;
          } else {
            console.log("> indexContainer : 에러 발생");
          }
        }}
      </Query>
    );
  }
}
