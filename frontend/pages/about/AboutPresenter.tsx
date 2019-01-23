import React from "react";
import { ApolloConsumer } from "react-apollo";
import styled from "styled-components";
import { IProfile } from "../../types/user";
import logout from "../../utils/logout";

interface IProps {
  loggedInUser: {
    ok: boolean;
    profile: IProfile;
    error: string;
  };
}

export default ({ loggedInUser }: IProps) => (
  <Container>
    <h1>About</h1>
    <div>{loggedInUser.ok && loggedInUser.profile.email}님 환영합니다.</div>

    {loggedInUser.ok ? (
      <ApolloConsumer>{client => <button onClick={logout(client)}>로그아웃</button>}</ApolloConsumer>
    ) : null}
  </Container>
);

const Container = styled.div`
  width: 100%;
  padding: 30px 30px;
`;
