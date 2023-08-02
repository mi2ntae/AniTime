import React from "react";
import MeetingList from "./MeetingList";
import { styled } from "styled-components";

export default function ShelterMeeting() {
  return (
    <MainDiv>
      <ListDiv>
        <MeetingList />
      </ListDiv>
      <RoomDiv>상세</RoomDiv>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  display: flex;
  height: 100%;
`;

const ListDiv = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const RoomDiv = styled.div`
  flex: 1 0 0;
  background-color: antiquewhite; // 구분용 임시 색
`;
