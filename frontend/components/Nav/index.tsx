import Link from "next/link";
import { withRouter, WithRouterProps } from "next/router";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import ClickOutside from "react-simple-click-outside";
import styled from "styled-components";

interface IProps extends WithRouterProps {
  isOpen: boolean;
  clickMenu: (isOpen: boolean) => void;
}

const Nav = (props: IProps) => {
  const { isOpen, clickMenu, router } = props;

  return (
    <Container>
      <ClickOutside close={() => clickMenu(false)} target="isOpen">
        <ButtonList>
          <li>
            <Link href="/">
              <a>
                <FaSearch />
              </a>
            </Link>
          </li>
          <li>
            <button type="button" onClick={() => clickMenu(!isOpen)}>
              <IoIosMenu />
            </button>
          </li>
        </ButtonList>
        <LinkList isOpen={isOpen}>
          <Li isOpen={isOpen}>
            <Link href="/">
              <A active={router && router.route === "/" ? true : false}>애니포엠 홈</A>
            </Link>
          </Li>
          <Li isOpen={isOpen}>
            <Link href="/poem">
              <A>모든 시</A>
            </Link>
          </Li>
          <Li isOpen={isOpen}>
            <Link href="/">
              <A>오늘의 추천 시</A>
            </Link>
          </Li>
          <Li isOpen={isOpen}>
            <Link href="/signup">
              <A>회원가입</A>
            </Link>
          </Li>
          <Li isOpen={isOpen}>
            <Link href="/login">
              <A>로그인</A>
            </Link>
          </Li>
        </LinkList>
      </ClickOutside>
    </Container>
  );
};

const Container = styled.div`
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  height: 100vh;
  position: fixed;
  background-color: rgb(248, 248, 248);
  z-index: 100;
`;

const LinkList = styled.ul<{ isOpen: boolean }>`
  vertical-align: top;
  display: inline-block;
  position: absolute;
  left: ${props => (!props.isOpen ? "-100pt" : "60pt")};
  width: 130pt;
  height: 100%;
  margin: 0;
  padding: 70pt 0 0 10pt;
  background-color: rgb(248, 248, 248);
  transition: all 0.3s;
  z-index: 100;
`;

const Li = styled.li<{ isOpen: boolean }>`
  padding: 0;
  text-align: left;
  opacity: ${props => (!props.isOpen ? "0" : "1")};
  transition: all 0.3s;
`;

const A = styled.a<{ active?: boolean }>`
  width: 100%;
  height: 50px;
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
  position: relative;
  width: 60pt;
  height: 100vh;
  margin: 0;
  padding: 0;
  float: left;
  background-color: rgb(248, 248, 248);
  z-index: 150;
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
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
  }
`;

export default withRouter(Nav);
