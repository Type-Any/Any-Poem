import React from "react";
import { ApolloConsumer } from "react-apollo";
import styled from "styled-components";
import { GetMyProfileResponse } from "../../types/graph";
import logout from "../../utils/logout";

interface IProps {
  loggedInUser: GetMyProfileResponse | null;
}

export default ({ loggedInUser }: IProps) => (
  <Container>
    <h1>About</h1>
    <div>{loggedInUser && loggedInUser.ok && loggedInUser.profile && loggedInUser.profile.email}님 환영합니다.</div>
    {loggedInUser ? (
      <ApolloConsumer>{client => <button onClick={logout(client)}>로그아웃</button>}</ApolloConsumer>
    ) : null}
  </Container>
);

const Container = styled.div`
  width: 100%;
  padding: 30px 30px;
`;
