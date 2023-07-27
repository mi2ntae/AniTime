import React from "react";
import { styled } from "styled-components";
import { MainContainer, Button } from "styled/styled";
import { Outlet } from "react-router";
import { Routes, Route, NavLink } from "react-router-dom";
import MyPageMeeting from "./mypagetab/MyPageMeeting";
import MyPageChatting from "./mypagetab/MyPageChatting";
import MyPageWatchlist from "./mypagetab/MyPageWatchlist";

export default function MyPage() {
  const tabArr = [
    {
      tabTitle: <StyledNavLink to="/mypage/meeting">미팅내역</StyledNavLink>,
    },
    {
      tabTitle: <StyledNavLink to="/mypage/chatting">채팅내역</StyledNavLink>,
    },
    {
      tabTitle: <StyledNavLink to="/mypage/watchlist">즐겨찾기</StyledNavLink>,
    },
  ];

  return (
    <MainContainer>
      <PageContainer>
        <MyPageHeader>
          <Span font-size="50px">김민태</Span>
          <Button
            background_color="#3994f0;"
            width="100px"
            height="60px"
            color="white"
          >
            정보수정하기
          </Button>
        </MyPageHeader>
        <TabGroup>
          {tabArr.map((section, idx) => {
            return <Tab key={idx}>{section.tabTitle}</Tab>;
          })}
        </TabGroup>
        <hr />
        <Outlet />
      </PageContainer>
      <Routes>
        <Route path="/mypage/meeting" element={<MyPageMeeting />}></Route>
        <Route path="/mypage/chatting" element={<MyPageChatting />}></Route>
        <Route path="/mypage/watchlist" element={<MyPageWatchlist />}></Route>
      </Routes>
    </MainContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  min-width: 800px;
`;

const MyPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  align-items: center;
`;
const Span = styled.div`
  font-size: 30px;
`;

const TabGroup = styled.div`
  display: flex;
  flex-direction: row;
`;
const Tab = styled.div`
  flex: 1;
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  &.active {
    color: #3994f0;
    font-weight: bold;
    border-bottom: 3.5px solid;
    padding-bottom: 6.5px;
  }
`;
