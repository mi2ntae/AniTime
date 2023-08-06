import React from "react";
import MeetingList from "./ShelterMeeting/MeetingList";
import { styled } from "styled-components";
import MeetingDetail from "./ShelterMeeting/MeetingDetail";

export default function ShelterMeeting() {
  return (
    <MainDiv>
      <ListDiv>
        <MeetingList />
      </ListDiv>
      <RoomDiv>
        <MeetingDetail />
      </RoomDiv>
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
  border-right: 1px solid var(--lightgrey, #e8ebee);
`;
const RoomDiv = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
