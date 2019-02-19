import React from "react";
import { ctxWithApollo } from "../../types/types";
import checkLogin from "../../utils/checkLogin";
import { Mutation } from "react-apollo";
import { SAVE_POEM } from "./WriteQueries";
import WritePresenter from "./WritePresenter";
import { GET_POEMS } from "../poem/PoemQueries";
import { GetPoemsResponse } from "../../types/graph";

interface IProps {}

class WriteContainer extends React.Component<IProps> {
  static async getInitialProps(context: ctxWithApollo): Promise<{}> {
    const initialProps = {};

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
    return (
      <Mutation
        mutation={SAVE_POEM}
        update={(cache, { data: { SavePoem } }) => {
          const poems: { GetPoems: GetPoemsResponse } | null = cache.readQuery({
            query: GET_POEMS,
            variables: { skip: 0, take: 10 }
          });

          console.log(SavePoem);
          if (poems) {
            const { GetPoems } = poems;

            if (GetPoems.ok) {
              let newPoems;
              if (GetPoems.poems) {
                newPoems = {
                  ...poems.GetPoems,
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
            } else {
              console.log(GetPoems.error);
            }
          } else {
            console.log("Poems cache 업데이트 에러");
          }
        }}
      >
        {SavePoem => {
          return <WritePresenter save={SavePoem} />;
        }}
      </Mutation>
    );
  }
}

export default WriteContainer;
