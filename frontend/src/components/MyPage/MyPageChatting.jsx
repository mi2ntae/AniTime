import React, { useEffect } from "react";
import { styled } from "styled-components";
import ChatUi from "components/MyPage/GeneralChatting/ChatUi";
import ChattingList from "components/MyPage/GeneralChatting/ChattingList";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const socketUrl ="";


export default function MyPageChatting() {
  // const [stompClient, setStompClient] = useState(null);

  // useEffect(() => {
  //   // 웹소켓 클라이언트 초기화
  //   const socket = new SockJS(socketUrl);
  //   const stomp = Stomp.over(socket);

  //   stomp.connect(
  //     {},
  //     () => {
  //       console.log("WebSocket connected!");
  //       setStompClient(stomp);
  //     },
  //     (error) => {
  //       console.error("WebSocket connection failed:", error);
  //     }
  //   );

  //   return () => {
  //     if (stompClient) {
  //       stompClient.disconnect();
  //       console.log("WebSocket disconnected!");
  //     }
  //   };
  // }, []);



  return (
    <MainDiv>
        <Div>
      <ChattingList/>
      </Div>
        <Div>
          <ChatUi height="600px"/>
        </Div>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  display: flex;
  margin-left: 100px;
  margin-right: 100px;
  height: 100%;
  flex-direction: row;
`;
const Div = styled.div`
  width:50%;
`


