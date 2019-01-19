/* eslint-disable import/prefer-default-export */
import gql from "graphql-tag";

export const GET_ISLOGIN = gql`
  query {
    isLogin @client
  }
`;
