import React from "react";
import { styled } from "styled-components";
import ChatUi from "components/MyPage/GeneralChatting/ChatUi";
import ChattingList from "components/MyPage/GeneralChatting/ChattingList";

export default function MyPageChatting() {
  return (
    <MainDiv>
      <Div>
        <ChattingList />
      </Div>
      <Div>
        <ChatUi height="100%" />
      </Div>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`;
const Div = styled.div`
  width: 100%;
  height: 100%;
`;
