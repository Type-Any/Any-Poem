import React from "react";
import styled from "styled-components";
import { IProfile } from "../../types/user";

interface IProps {
  loggedInUser: {
    ok: boolean;
    profile: IProfile;
    error: string;
  };
  logout: (apolloClient) => void;
}

export default ({ loggedInUser, logout }: IProps) => (
  <Container>
    <h1>About</h1>
    <div>{loggedInUser.ok && loggedInUser.profile.email}님 환영합니다.</div>

    {loggedInUser.ok ? <button onClick={logout}>로그아웃</button> : null}
  </Container>
);

const Container = styled.div`
  width: 100%;
  padding: 30px 30px;
`;
