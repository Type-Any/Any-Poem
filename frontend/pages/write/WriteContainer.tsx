import React from "react";
import { ctxWithApollo } from "../../types/types";
import checkLogin from "../../utils/checkLogin";
import { Mutation, Query } from "react-apollo";
import { SAVE_POEM, UPDATE_POEM } from "./WriteQueries";
import WritePresenter from "./WritePresenter";
import { GET_POEM, GET_POEMS } from "../poem/PoemQueries";
import { Poem, GetPoemsResponse } from "../../types/graph";
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
    if (id) {
      return (
        <Query query={GET_POEM} variables={{ poemId: id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (error) {
              return <div>Error :(</div>;
            }

            if (data && data.GetPoem.ok) {
              const poem: Poem = data.GetPoem.poem;
              return (
                <Mutation mutation={UPDATE_POEM}>
                  {UpdatePoem => {
                    return <WritePresenter poem={poem} save={UpdatePoem} />;
                  }}
                </Mutation>
              );
            } else {
              console.log("시 불러오는데 실패");
            }
          }}
        </Query>
      );
    } else {
      return (
        <Mutation
          mutation={SAVE_POEM}
          update={(cache, { data: { SavePoem } }) => {
            const poems: { GetPoems: GetPoemsResponse } | null = cache.readQuery({
              query: GET_POEMS,
              variables: { skip: 0, take: 10 }
            });

            let newPoems;
            if (poems) {
              const { GetPoems } = poems;
              newPoems = {
                ...GetPoems,
                poems: [SavePoem.poem, ...GetPoems.poems]
              };
            } else {
              newPoems = SavePoem;
            }

            cache.writeQuery({
              query: GET_POEMS,
              variables: { skip: 0, take: 10 },
              data: { GetPoems: newPoems }
            });
          }}
        >
          {SavePoem => {
            return <WritePresenter save={SavePoem} />;
          }}
        </Mutation>
      );
    }
  }
}

export default WriteContainer;
