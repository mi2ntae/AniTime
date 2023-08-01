import React, { useState } from "react";
import { styled } from "styled-components";
import { MainContainer, Button } from "styled/styled";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tab, Tabs } from "@mui/material";
import MyPageMeeting from "./mypagetab/MyPageMeeting";
import MyPageChatting from "./mypagetab/MyPageChatting";
import MyPageWatchlist from "./mypagetab/MyPageWatchlist";

export default function MyPage() {
  const member = useSelector((state) => state.member);
  const [tabNo, setTabNo] = useState(0);

  const tabs = [
    // 일반회원: memberKind == 0
    [
      { title: "미팅내역", content: <MyPageMeeting /> },
      { title: "채팅내역", content: <MyPageChatting /> },
      { title: "즐겨찾기", content: <MyPageWatchlist /> },
    ],
    // 보호소회원: memberKind == 1
    [
      { title: "미팅신청현황", content: <MyPageMeeting /> },
      { title: "채팅", content: <MyPageMeeting /> },
      { title: "후원현황", content: <MyPageMeeting /> },
    ],
  ];

  // const tabArr = [
  //   {
  //     tabTitle: <StyledNavLink to="/mypage/meeting">미팅내역</StyledNavLink>,
  //   },
  //   {
  //     tabTitle: <StyledNavLink to="/mypage/chatting">채팅내역</StyledNavLink>,
  //   },
  //   {
  //     tabTitle: <StyledNavLink to="/mypage/watchlist">즐겨찾기</StyledNavLink>,
  //   },
  // ];

  return (
    <MainContainer $vertical>
      <MyPageHeader>
        <Span>{member.name}</Span>
        <Button
          // $background_color="#3994f0;"
          // width="100px"
          // height="60px"
          // color="white"
          border="#E8EBEE 1px solid"
        >
          정보수정하기
        </Button>
      </MyPageHeader>
      <Tabs value={tabNo} onChange={(event, newVal) => setTabNo(newVal)}>
        {tabs[member.memberKind].map((item, index) => {
          return <Tab key={index} value={index} label={item.title} />;
        })}
      </Tabs>
      {tabs[member.memberKind].map((item, index) => {
        return <div>{item.title}</div>;
      })}
      {/* <TabGroup>
        {tabArr.map((section, idx) => {
          return <Tab key={idx}>{section.tabTitle}</Tab>;
        })}
        </TabGroup>
        <DivisionLine />
      <TabPage>
        <Outlet />
      </TabPage>
      <Margin /> */}
    </MainContainer>
  );
}

const DivisionLine = styled.div`
  border-top: 1px solid #444444;
  margin-bottom: 50px;
`;
const Margin = styled.div`
  margin-top: 100px;
`;
const MyPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  align-items: center;
  justify-content: space-between;
`;
const Span = styled.div`
  font-size: 30px;
  float: left;
`;
const TabPage = styled.div`
  width: 1000px;
  height: 600px;
  margin: auto;
  display: flex;
  justify-content: center;
  border: 1px solid;
  border-radius: 8px;
`;
{
  /* 
const TabGroup = styled.div`
  display: flex;
  flex-direction: row;
`;
const Tab = styled.div`
  display: flex;
  padding-right: 15px;
  justify-content: flex-start;
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  &.active {
    color: #3994f0;
    font-weight: bold;
    border-bottom: 3.5px solid;
  }
`; */
}
