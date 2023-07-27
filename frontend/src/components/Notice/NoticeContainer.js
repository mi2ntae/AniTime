import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import NoticeItem from "./NoticeItem";

export default function NoticeContainer() {
  const [selected, setSelected] = useState(4);
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    // Todo: 서버와 통신하여 실제 알림 받아오는 코드 적용
    const testData = [
      {
        noticeNo: 12,
        noticeKind: 0,
        noticeTime: "0000.00.00 00:00:00",
        noticeContent:
          "민태님의 싸피 보호소 미팅 예약 (2023년 00월 00일 00시 00분) 신청이 승인되었습니다.",
      },
      {
        noticeNo: 13,
        noticeKind: 1,
        noticeTime: "0000.00.00 00:00:00",
        noticeContent: "금일 알람이지롱1",
      },
      {
        noticeNo: 14,
        noticeKind: 3,
        noticeTime: "0000.00.00 00:00:00",
        noticeContent: "금일 알람이지롱2",
      },
    ];
    setNoticeList(testData);
  }, []);

  return (
    <Container>
      <Header>
        <HeaderItem $selected={selected === 4} onClick={() => setSelected(4)}>
          전체
        </HeaderItem>
        <HeaderItem $selected={selected === 0} onClick={() => setSelected(0)}>
          입양
        </HeaderItem>
        <HeaderItem $selected={selected === 1} onClick={() => setSelected(1)}>
          실종
        </HeaderItem>
        <HeaderItem $selected={selected === 2} onClick={() => setSelected(2)}>
          후원
        </HeaderItem>
        <HeaderItem $selected={selected === 3} onClick={() => setSelected(3)}>
          채팅
        </HeaderItem>
      </Header>
      <Body>
        {noticeList.length === 0
          ? "알림이 없습니다"
          : noticeList
              .filter((item) => selected === 4 || item.noticeKind === selected)
              .map((item) => <NoticeItem {...item} key={item.noticeNo} />)}
      </Body>
      <Footer
        onClick={() => {
          setNoticeList([]);
        }}
      >
        알림함 비우기
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 400px;
  height: 360px;
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

const HeaderItem = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  margin-left: 24px;
  height: 100%;
  box-sizing: border-box;
  border-bottom: ${(props) => (props.$selected ? "black" : "white")} 2px solid;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: auto;
  height: calc(100% - 100px);
  box-sizing: border-box;
  padding-top: 16px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  border-top: grey 1px solid;
  cursor: pointer;
`;
