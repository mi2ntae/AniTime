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
      <div>
        <p>알림 1 -- -- -- --</p>
        <p>알림 2 -- -- -- --</p>
        <p>알림 3 -- -- -- --</p>
        <p>알림 4 -- -- -- --</p>
      </div>
      <div>알림함 비우기</div>
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
`;

const HeaderItem = styled.a`
  margin: 0;
  margin-left: 16px;
  padding: 8px;
`;
