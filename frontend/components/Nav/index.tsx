import Link from "next/link";
import { withRouter, WithRouterProps } from "next/router";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import styled from "styled-components";

const Nav = (props: WithRouterProps) => {
  const { router } = props;
  return (
    <Container>
      <ButtonList>
        <li><Link href="/"><a><FaSearch /></a></Link></li>
        <li><button type="button"><IoIosMenu /></button></li>
      </ButtonList>
      <LinkList>
        <Li>
          <Link href="/">
            <A active={router && router.route === "/" ? true : false}>애니포엠 홈</A>
          </Link>
        </Li>
        <Li>
          <Link href="/poem">
            <A>모든 시</A>
          </Link>
        </Li>
        <Li>
          <Link href="/">
            <A>오늘의 추천 시</A>
          </Link>
        </Li>
        <Li>
          <Link href="/signup">
            <A>회원가입</A>
          </Link>
        </Li>
        <Li>
          <Link href="/login">
            <A>로그인</A>
          </Link>
        </Li>
      </LinkList>
    </Container>
  );
};

const Container = styled.div`
  left: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  position: fixed;
  background-color: rgb(248, 248, 248);
  z-index: 100;
`;

const LinkList = styled.ul`
  vertical-align: top;
  display: inline-block;
  list-style: none;
  width: 130pt;
  height: 100%;
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

const ButtonList = styled.ul`
  display: inline-block;
  width: 60pt;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  > li {
    margin: 0;
    padding: 0;
    text-align: center;
    &:first-child {
      margin: 25pt 0 20pt;
    }
  }
  svg {
    color: rgb(128, 128, 128);
    width: 20pt;
    height: 20pt;
  }
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
  button {
    outline: none;
    border: none;
    background: none;
  }
`;

export default withRouter(Nav);
