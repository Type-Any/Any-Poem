import { NextContext } from "next";
import React from "react";
import { Query } from "react-apollo";
import { ctxWithApollo, IPropsWithApollo } from "../../types/types";
import { GET_POEMS } from "../poem/PoemQueries";
import IndexPresenter from "./IndexPresenter";

export default class extends React.Component<IPropsWithApollo> {
  static async getInitialProps(context: ctxWithApollo): Promise<{}> {
    const initialProps = {};

    if (context.req) {
      // server side
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
