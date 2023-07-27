import React, { useState } from "react";
import { styled } from "styled-components";
import { MainContainer } from "styled/styled";
import { Outlet } from "react-router";
import { Routes, Route, NavLink } from "react-router-dom";
import MyPageMeeting from "./mypagetab/MyPageMeeting";
import MyPageChatting from "./mypagetab/MyPageChatting";
import MyPageWatchlist from "./mypagetab/MyPageWatchlist";

export default function MyPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (idx) => setActiveIndex(idx);

  const tabArr = [
    {
      tabTitle: (
        <NavLink
          to="/mypage/meeting"
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          미팅내역
        </NavLink>
      ),
    },
    {
      tabTitle: (
        <NavLink
          to="/mypage/chatting"
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          채팅내역
        </NavLink>
      ),
    },
    {
      tabTitle: (
        <NavLink
          to="/mypage/watchlist"
          className={activeIndex === 2 ? "is-active" : ""}
          onClick={() => tabClickHandler(2)}
        >
          미팅내역
        </NavLink>
      ),
    },
  ];

  return (
    <MainContainer $vertical>
      <MyPageHeader>
        <span>김민태</span>
        <button>정보수정하기</button>
      </MyPageHeader>
      <hr />
      <TabGroup>
        {tabArr.map((section, idx) => {
          return <Tab key={idx}>{section.tabTitle}</Tab>;
        })}
      </TabGroup>
      {/* <MainContainer> */}
      <Outlet />
      {/* </MainContainer> */}
      <Routes>
        <Route path="/mypage/meeting" element={<MyPageMeeting />}></Route>
        <Route path="/mypage/chatting" element={<MyPageChatting />}></Route>
        <Route path="/mypage/watchlist" element={<MyPageWatchlist />}></Route>
      </Routes>
    </MainContainer>
  );
}

const MyPageHeader = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  color: black;
  flex-direction: row;
  align-items: left;
`;
const TabGroup = styled.div`
  display: flex;
  flex-direction: row;
`;
const Tab = styled.div`
  flex: 1;
`;
