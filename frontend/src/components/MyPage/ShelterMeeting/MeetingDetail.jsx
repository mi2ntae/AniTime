import http from "api/commonHttp";
import DesertionDetail from "components/Desertion/DesertionDetail";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDesertionNo } from "reducer/detailInfo";
import { styled } from "styled-components";
import { processState } from "./processState";
import { Button } from "@mui/material";

export default function MeetingDetail() {
  const meetingNo = useSelector((state) => state.shelterMeeting.meetingNo);
  const dispatch = useDispatch();

  const [meeting, setMeeting] = useState(undefined);
  const [adoptionForm, setAdoptionForm] = useState("");
  const [meetingState, setMeetingState] = useState(0);

  const [subData, setSubData] = useState({
    status: 0,
    reason: "",
  });

  const processMeetingState = ({ reservedDate, status }) => {
    if (status == 1) {
      const rDate = new Date(reservedDate);
      const nDate = new Date();
      const diff = rDate.getTime() - nDate.getTime();
      // 30분
      if (diff < -1800000) {
        return 4; // 종료
      } else if (diff < 1800000) {
        return 3; // 입장 가능
      }
    }
    return status;
  };

  const handleSubmit = () => {
    console.log("submit " + meetingNo);
    console.log(subData);
  };

  const handleEnterMeeting = () => {
    console.log("enter " + meetingNo);
  };

  useEffect(() => {
    if (meetingNo !== -1) {
      // api 통신
      http
        .get(`meet/shelter/${meetingNo}`)
        .then(({ data: { meet, adoptionForm } }) => {
          setMeeting(meet);
          setAdoptionForm(adoptionForm);
          setMeetingState(processMeetingState(meet));
          dispatch(setDesertionNo(meet.animal.desertionNo));
        });
    }
  }, [meetingNo]);

  return (
    <>
      <Header>
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          미팅 신청 내용
        </span>
        {meeting && (
          <HeaderLayer>
            {processState({ ...meeting, state: meeting.status })}
          </HeaderLayer>
        )}
      </Header>
      {meeting && (
        <>
          <Content>
            <DesertionDetail readOnly={true} />
            {adoptionForm}
          </Content>
          <Footer>
            <DateDiv>미팅일시 : {meeting.reservedDate}</DateDiv>
            <div>승인 반려 선택하는 입력</div>
            <br />
            <Button
              sx={{
                fontWeight: "bold",
                backgroundColor: "#3994f0",
                color: "#ffffff",
                width: "144px",
                "&:hover": {
                  backgroundColor: "#3994f0",
                },
              }}
              variant="contained"
              onClick={meetingState == 3 ? handleEnterMeeting : handleSubmit}
              disabled={meetingState != 0 && meetingState != 3}
            >
              {meetingState == 3 ? "미팅방 입장하기" : "제출"}
            </Button>
          </Footer>
        </>
      )}
    </>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3994f0;
  color: #ffffff;
  position: relative;
  width: 100%;
  height: 56px;
`;
const HeaderLayer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: absolute;
  right: 25%;
  transform: translateX(50%);
`;

const Content = styled.div`
  width: 100%;
  flex: 1 0 0;
  overflow: auto;
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #e8ebee;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 160px;
`;
