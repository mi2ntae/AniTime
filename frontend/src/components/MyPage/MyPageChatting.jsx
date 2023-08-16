import React, { useState } from "react";
import { styled } from "styled-components";
import ChatUi from "components/MyPage/GeneralChatting/ChatUi";
import ChattingList from "components/MyPage/GeneralChatting/ChattingList";

export default function MyPageChatting() {
  const [message, setMessage] = useState(false);
  console.log(message);
  return (
    <MainDiv style={{ height: `calc(100vh - 231px)`, paddingBottom: 0 }}>
      <Div>
        <ChattingList update={message} />
      </Div>
      <Div>
        <ChatUi height="100%" update={setMessage} type={1}/>
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
  width: 50%;
  height: 100%;
`;
