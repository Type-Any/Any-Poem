/* eslint-disable import/prefer-default-export */
import gql from "graphql-tag";

export const GET_ISLOGIN = gql`
  query {
    isLogin @client
  }
`;

export const SET_ISLOGIN = gql`
  mutation SetIsLogin($isLogin: Boolean) {
    setIsLogin(isLogin: $isLogin) @client
  }
`;
