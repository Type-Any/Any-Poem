import Link from "next/link";
import React from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import Nav from "../../components/Nav";

export default () => (
  <Container>
    <SubTitle>누구나 쓰는 시</SubTitle>
    <MainTitle>Any Poem</MainTitle>
    <MainIntroText>우리는<br />누구나 쓸 수 있는 플랫폼을 지향합니다.<br />누구나 쓸 수 있고 누구나 읽을 수 있습니다.</MainIntroText>
    <SubIntroText>지금, 시작해보세요.<br />많은 사람과 함께 해보세요.</SubIntroText>
    <GrayLine />
    <PickTitle>Today Pick</PickTitle>
    <PickLists>
      <li>
        <PoemTitle>일곱의 조각칼</PoemTitle>
        <WriterName>Written by Evan Jin</WriterName>
        <PoemContent>외로움,
          가장 외로운 날엔
          통화버튼이 보이지 않는다
        </PoemContent>
        <LinkButton>읽기</LinkButton>
      </li>
      <li>
        <PoemTitle>일곱의 조각칼</PoemTitle>
        <WriterName>Written by Evan Jin</WriterName>
        <PoemContent>외로움,
          가장 외로운 날엔
          통화버튼이 보이지 않는다
        </PoemContent>
        <LinkButton>읽기</LinkButton>
      </li>
      <li>
        <PoemTitle>일곱의 조각칼</PoemTitle>
        <WriterName>Written by Evan Jin</WriterName>
        <PoemContent>외로움,
          가장 외로운 날엔
          통화버튼이 보이지 않는다
        </PoemContent>
        <LinkButton>읽기</LinkButton>
      </li>
    </PickLists>
    <FeaturedTitle>Featured writer</FeaturedTitle>
    <FeaturedList>
      <li>
        <Link href={`/`}>
          <a>
            <Profile><HoverBox><FaSearch /></HoverBox></Profile>
            <Writer>Evan Jin 0</Writer>
            <CounterPoem>3 poems</CounterPoem>
          </a>
        </Link>
      </li>
      <li>
        <Link href={`/`}>
          <a>
            <Profile><HoverBox><FaSearch /></HoverBox></Profile>
            <Writer>Evan Jin 1</Writer>
            <CounterPoem>3 poems</CounterPoem>
          </a>
        </Link>
      </li>
      <li>
        <Link href={`/`}>
          <a>
            <Profile><HoverBox><FaSearch /></HoverBox></Profile>
            <Writer>Evan Jin 2</Writer>
            <CounterPoem>3 poems</CounterPoem>
          </a>
        </Link>
      </li>
      <li>
        <Link href={`/`}>
          <a>
            <Profile><HoverBox><FaSearch /></HoverBox></Profile>
            <Writer>Evan Jin 3</Writer>
            <CounterPoem>3 poems</CounterPoem>
          </a>
        </Link>
      </li>
    </FeaturedList>
    <CopyrightBox>
      <CopyrightSubTitle>누구나 쓰는 시</CopyrightSubTitle>
      <CopyrightTitle>Any Poem</CopyrightTitle>
      <CopyrightText>Copyright 2019</CopyrightText>
    </CopyrightBox>
    <FloatBox>
      <li>
        <Link href={`/write`}>
          <a>
            <FaEdit />
            <p>시 작성</p>
          </a>
        </Link>
      </li>
      <li>
        <Link href={`/write`}>
          <a>
            시작
          </a>
        </Link>
      </li>
    </FloatBox>
    <Nav />
  </Container>
);

const Container = styled.div`
  position: relative;
  width: 667pt;
  margin: 0 auto;
  padding: 92px 0 0;
  text-align: center;
`;

const SubTitle = styled.p`
  font-size: 15pt;
  margin-bottom: 18px;
  color: rgb(36, 36, 36);
  font-family: 'Noto Sans', sans-serif;
;`;

const MainTitle = styled.h1`
  margin-bottom: 176px;
  font-size: 35pt;
  color: rgb(36, 36, 36);
  font-family: 'Noto Sans', sans-serif;
`;

const MainIntroText = styled.p`
  font-family: 'Nanum Myeongjo', serif;
  font-size: 24pt;
  line-height: 35pt;
  color: rgb(64, 64, 64);
  margin-bottom: 46pt;
`;

const SubIntroText = styled.p`
  font-family: 'Nanum Myeongjo', serif;
  font-size: 24pt;
  line-height: 35pt;
  color: rgb(64, 64, 64);
  margin-bottom: 80pt;
`;

const GrayLine = styled.span`
  margin-bottom: 70pt;
  display: inline-block;
  width: 648pt;
  height: 1pt;
  background-color: rgb(236, 236, 236);
`;

const PickTitle = styled.h2`
  font-family: 'Noto Sans', sans-serif;
  text-align: left;
  font-size: 31pt;
  color: rgb(36, 36, 36);
  margin-bottom: 43pt;
`;

const PickLists = styled.ul`
  width: 100%;
  display: flex;
  list-style: none;
  margin: 0 0 68pt;
  padding: 0;
  > li {
    width: 33.33%;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    text-align: left;
    &:after {
      position: absolute;
      left: 0;
      top: 27pt;
      content: '';
      width: 2pt;
      background-color: rgb(236, 236, 236);
      height: 163pt;
    }
    &:nth-child(1) {
      padding-right: 25pt;
      &:after {
        display: none;
      }
    }
    &:nth-child(2) {
      padding-left: 46pt;
      padding-right: 19pt;
    }
    &:nth-child(3) {
      padding-left: 52pt;
    }
  }
`;

const PoemTitle = styled.p`
  font-size: 21pt;
  font-family: 'Noto Sans', sans-serif;
  margin-bottom: 5pt;
  color: rgb(36, 36, 36);
`;

const WriterName = styled.p`
  font-size: 13pt;
  font-family: 'Noto Sans', sans-serif;
  margin-bottom: 15pt;
  color: rgb(142, 142, 142);
`;

const PoemContent = styled.div`
  font-family: 'Nanum Myeongjo', serif;
  font-size: 13pt;
  line-height: 23pt;
  color: rgb(88, 88, 88);
  margin-bottom: 15pt;
`;

const LinkButton = styled.a`
  display: inline-block;
  width: 96pt;
  height: 36pt;
  line-height: 36pt;
  text-align: center;
  font-family: 'Noto Sans', sans-serif;
  font-size: 13pt;
  color: #fff;
  background-color: rgb(35, 35, 35);
  border-radius: 18pt;
  cursor: pointer;
`;

const FeaturedTitle = styled.h3`
 text-align: left;
  margin-bottom: 31pt;
  font-size: 31pt;
  color: rgb(36, 36, 36);
`;

const FeaturedList = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  > li {
    margin-left: 36pt;
    padding: 0;
    list-style: none;
    width: 138pt;
    text-align: center;
    &:nth-child(1) {
      margin-left: 0;
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
    }
  }
`;

const Profile = styled.div`
  position: relative;
  width: 100%;
  height: 138pt;
  background-color: rgb(216, 216,216);
  margin-bottom: 3pt;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin:0 0 12pt;
  &:hover span {
    z-index: 10;
    opacity: 1;
  }
`;

const HoverBox = styled.span`
  z-index: -1;
  position: absolute;
  content: '';
  display: block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(67, 172, 239, 0.65);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s;
  svg {
    width: 39pt;
    height: 41pt;
    color: #fff;
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
  }
`;

const Writer = styled.p`
  font-size: 16pt;
  margin: 0 0 2pt;
  color: rgb(36, 36, 36);
`;

const CounterPoem = styled.p`
  color: rgb(142, 142, 142);
  font-size: 13pt;
  margin: 0;
`;

const CopyrightBox = styled.div`
  margin: 1000pt 0 59pt;
`;

const CopyrightSubTitle = styled.p`
  margin: 0 0 6.5pt;
  color: rgb(36, 36, 36);
  font-size: 9pt;
`;

const CopyrightTitle = styled.p`
  margin: 0 0 6.5pt;
  font-size: 18pt;
  color: rgb(36, 36, 36);
`;

const CopyrightText = styled.p`
  color: rgb(165, 165, 165);
  font-size: 13pt;
  margin: 0;
`;

const FloatBox = styled.ul`
  margin: 0;
  padding: 0;
  position: fixed;
  left: 49pt;
  top: 50%;
  list-style: none;
  z-index: 200;
  transform: translateY(-50%);
  > li {
    list-style: none;
    width: 100pt;
    height: 100pt;
    background-color: rgb(36, 36, 36);
    border-radius: 50%;
    &:first-child {
      margin-bottom: 19pt;
      svg {
        margin-top: 24.2pt;
        width: 16.2pt;
        height: 19.6pt;
      }
      p {
        margin-top: 3.3pt;
      }
    }
    &:nth-child(2) {
      line-height: 100pt;
    }
  }
  a {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 16pt;
    text-align: center;
    color: #fff;
    text-decoration: none;
  }
`;
