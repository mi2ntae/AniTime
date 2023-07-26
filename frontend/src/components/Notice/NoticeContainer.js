import React from "react";
import { styled } from "styled-components";
import NoticeItem from "./NoticeItem";

export default function NoticeContainer() {
  const testData = [
    {
      noticeNo: 12,
      noticeKind: "0", //채팅,미팅,실종 0,1,2
      noticeTime: "0000.00.00 00:00:00",
      noticeContent:
        "민태님의 싸피 보호소 미팅 예약 (2023년 00월 00일 00시 00분) 신청이 승인되었습니다.",
    },
    {
      noticeNo: 13,
      noticeKind: "0", //채팅,미팅,실종 0,1,2
      noticeTime: "0000.00.00 00:00:00",
      noticeContent: "금일 알람이지롱1",
    },
    {
      noticeNo: 14,
      noticeKind: "0", //채팅,미팅,실종 0,1,2
      noticeTime: "0000.00.00 00:00:00",
      noticeContent: "금일 알람이지롱2",
    },
  ];

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
        {testData.length === 0
          ? "알림이 없습니다"
          : testData.map((item) => (
              <NoticeItem {...item} key={item.noticeNo} />
            ))}
      </Body>
      <Footer>알림함 비우기</Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 400px;
  height: 320px;
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
