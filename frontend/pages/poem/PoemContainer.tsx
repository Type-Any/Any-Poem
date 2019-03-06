import React from "react";
import { Query } from "react-apollo";
import { ctxWithApollo } from "../../types/types";
import checkLogin from "../../utils/checkLogin";
import { decodeId } from "../../utils/hashId";
import PoemPresenter from "./PoemPresenter";
import { GET_POEM } from "./PoemQueries";

interface IProps {
  poemId: number;
}

class Poem extends React.Component<IProps> {
  static async getInitialProps(context: ctxWithApollo): Promise<{ poemId: number | null }> {
    const initialProps = { poemId: 0 };

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
    initialProps.poemId = decodeId(context.query.hashedId)[0];

    return initialProps;
  }

  render() {
    const { poemId } = this.props;
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
            console.log("> indexContainer : 에러 발생");
          }
        }}
      </Query>
    );
  }
}

export default Poem;
