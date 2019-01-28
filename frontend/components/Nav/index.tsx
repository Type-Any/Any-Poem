import Link from "next/link";
import { withRouter, WithRouterProps } from "next/router";
import React from "react";
import styled from "styled-components";

const Nav = (props: WithRouterProps) => {
  const { router } = props;
  return (
    <Container>
      <Li>
        <Link href="/">
          <A active={router && router.route === "/" ? true : false}>Index</A>
        </Link>
      </Li>
      <Li>
        <Link href="/about">
          <A>About</A>
        </Link>
      </Li>
      <Li>
        <Link href="/login">
          <A>Log In</A>
        </Link>
      </Li>
      <Li>
        <Link href="/signup">
          <A>Sign Up</A>
        </Link>
      </Li>
    </Container>
  );
};

const Container = styled.ul`
  margin: 0;
  padding: 0 0px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #e6eaea;
`;

const Li = styled.li`
  width: 70px;
  height: 50px;
  list-style-type: none;
  padding: 0;
  border-right: 1px solid #e6eaea;
`;

const A = styled.a<{ active?: boolean }>`
  width: 100%;
  height: 50px;
  font-family: sans-serif;
  color: ${props => (props.active ? "#ffffff" : "#444444")};
  background-color: ${props => (props.active ? "#444444" : "#ffffff")};
  font-size: 11px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => (props.active ? "#ffffff" : "#444444")};
    color: ${props => (props.active ? "#444444" : "#ffffff")};
  }
`;

export default withRouter(Nav);
