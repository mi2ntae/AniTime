import React, { useEffect } from "react";
import { styled } from "styled-components";

export default function MyPageChatting() {
  useEffect(() => {
    console.log("채팅");
  }, []);

  return (
    <MainDiv>
      <ChattingList>채팅 리스트 들어갈 자리</ChattingList>
      <ChattingRoom>채팅 방 들어갈 자리</ChattingRoom>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  display: flex;
  height: 100%;
`;

const ChattingList = styled.div`
  flex-grow: 1;
  background-color: aliceblue; // 구분용 임시 색
`;
const ChattingRoom = styled.div`
  flex-grow: 1;
  background-color: antiquewhite; // 구분용 임시 색
`;
