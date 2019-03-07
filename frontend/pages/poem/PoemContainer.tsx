import React from "react";
import { Query } from "react-apollo";
import { ctxWithApollo } from "../../types/types";
import checkLogin from "../../utils/checkLogin";
import { decodeId } from "../../utils/hashId";
import PoemPresenter from "./PoemPresenter";
import { GET_POEM, GET_POEMS } from "./PoemQueries";
import PoemListPresenter from "./PoemListPresenter";

interface IProps {
  poemId: number;
}

class Poem extends React.Component<IProps> {
  static async getInitialProps(context: ctxWithApollo): Promise<{ poemId: number | null }> {
    const initialProps: { poemId: null | number } = { poemId: null };

    const { loggedInUser } = await checkLogin(context.apolloClient);

    if (context.req) {
      // server side
      if (loggedInUser && loggedInUser.ok) {
        // redirect(context, "/");
      }
    } else {
      // redirect if logged in && client side
      if (loggedInUser && loggedInUser.ok) {
        // redirect({}, "/");
      }
    }
    console.log(context.query);
    if (context.query.hashedId) {
      initialProps.poemId = decodeId(context.query.hashedId)[0];
    }
    console.log(initialProps);
    return initialProps;
  }

  render() {
    const { poemId } = this.props;
    if (!poemId) {
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

              return <PoemListPresenter poems={poems} />;
            }
          }}
        </Query>
      );
    } else {
      return (
        <Query query={GET_POEM} variables={{ poemId }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            }

            if (error) {
              return <div>Error :(</div>;
            }

            if (data.GetPoem.ok) {
              const poem = data.GetPoem.poem;

              return <PoemPresenter poem={poem} />;
            } else {
              return <div>잘못된 경로 입니다.</div>;
            }
          }}
        </Query>
      );
    }
  }
}

export default Poem;
