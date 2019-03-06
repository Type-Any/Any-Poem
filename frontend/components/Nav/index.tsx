import Link from "next/link";
import { withRouter, WithRouterProps } from "next/router";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import styled from "styled-components";
import ClickOutside from "react-simple-click-outside";

const Nav = (props: WithRouterProps) => {
  const { router } = props;
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <ClickOutside close={() => setMenuOpen(false)} target="isMenuOpen">
        <ButtonList>
          <li>
            <Link href="/">
              <a>
                <FaSearch />
              </a>
            </Link>
          </li>
          <li>
            <button type="button" onClick={() => setMenuOpen(!isMenuOpen)}>
              <IoIosMenu />
            </button>
          </li>
        </ButtonList>
        {isMenuOpen ? (
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
        ) : null}
      </ClickOutside>
    </Container>
  );
};

const Container = styled.div`
  left: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  position: relative;
  background-color: rgb(248, 248, 248);
  z-index: 100;
`;

const LinkList = styled.ul`
  vertical-align: top;
  display: inline-block;
  list-style: none;
  width: 130pt;
  height: 100%;
  margin: 70pt 0 0;
  padding: 0;
`;

const Li = styled.li`
  list-style-type: none;
  padding: 0;
  text-align: left;
`;

const A = styled.a<{ active?: boolean }>`
  width: 100%;
  height: 50px;
  font-family: "Noto Sans", sans-serif;
  color: ${props => (props.active ? "rgb(71, 71, 71)" : "rgb(120, 120, 120)")};
  font-size: 17px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: left;

  &:hover {
    color: ${props => (props.active ? "rgb(71, 71, 71)" : "rgb(120, 120, 120)")};
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
