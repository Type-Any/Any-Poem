import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Nav = () => (
  <Container>
    <Li>
      <Link href="/">
        <A>Index</A>
      </Link>
    </Li>
    <Li>
      <Link href="/about">
        <A>About</A>
      </Link>
    </Li>
    <Li>
      <Link href="/login">
        <A>Login</A>
      </Link>
    </Li>
  </Container>
);

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

const A = styled.a`
  width: 100%;
  height: 50px;
  font-family: sans-serif;
  color: #444444;
  font-size: 11px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #444444;
    color: #ffffff;
  }
`;

export default Nav;
