import React from "react";
import { styled } from "styled-components";

export default function NoticeContainer() {
  return (
    <Container>
      <Header>
        <HeaderItem>전체</HeaderItem>
        <HeaderItem>입양</HeaderItem>
        <HeaderItem>실종</HeaderItem>
        <HeaderItem>후원</HeaderItem>
        <HeaderItem>채팅</HeaderItem>
      </Header>
      <Body>
        <p>알림 1 -- -- -- --</p>
        <p>알림 2 -- -- -- --</p>
        <p>알림 3 -- -- -- --</p>
        <p>알림 4 -- -- -- --</p>
        <p>알림 4 -- -- -- --</p>
        <p>알림 4 -- -- -- --</p>
        <p>알림 4 -- -- -- --</p>
      </Body>
      <Footer>알림함 비우기</Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  border-bottom: grey 1px solid;
`;

const HeaderItem = styled.a`
  margin: 0;
  margin-left: 24px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: auto;
  height: calc(100% - 100px);
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  border-top: grey 1px solid;
`;
