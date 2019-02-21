import React from "react";
import { ctxWithApollo } from "../../types/types";
import checkLogin from "../../utils/checkLogin";
import { Mutation, Query } from "react-apollo";
import { SAVE_POEM } from "./WriteQueries";
import WritePresenter from "./WritePresenter";
import { GET_POEM } from "../poem/PoemQueries";
import { Poem } from "../../types/graph";
import { decodeId } from "../../utils/hashId";

interface IProps {
  id: number;
}

class WriteContainer extends React.Component<IProps> {
  static async getInitialProps(context: ctxWithApollo): Promise<{}> {
    const initialProps = {
      id: decodeId(context.query.id)[0]
    };

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

    return initialProps;
  }

  render() {
    const { id } = this.props;

    return (
      <Mutation mutation={SAVE_POEM}>
        {SavePoem => {
          return (
            <Query skip={id ? false : true} query={GET_POEM} variables={{ poemId: id }}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <div>Loading...</div>;
                }
                if (error) {
                  return <div>Error :(</div>;
                }

                if (data && data.GetPoem.ok) {
                  const poem: Poem = data.GetPoem.poem;

                  return <WritePresenter poem={poem} save={SavePoem} />;
                } else {
                  return <WritePresenter save={SavePoem} />;
                }
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}

export default WriteContainer;
