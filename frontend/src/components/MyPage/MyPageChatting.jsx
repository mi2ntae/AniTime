import React, { useEffect } from "react";
import { styled } from "styled-components";
import ChatUi from "components/MyPage/GeneralChatting/ChatUi";
import ChattingList from "components/MyPage/GeneralChatting/ChattingList";
export default function MyPageChatting() {
  useEffect(() => {
    console.log("채팅");
  }, []);

  return (
    <MainDiv>
      <ChattingList/>
      <ChatUi/>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  display: flex;
  margin-left: 100px;
  margin-right: 100px;
  height: 100%;
`;

