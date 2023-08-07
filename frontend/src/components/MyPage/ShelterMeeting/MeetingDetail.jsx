import http from "api/commonHttp";
import DesertionDetail from "components/Desertion/DesertionDetail";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDesertionNo } from "reducer/detailInfo";
import { keyframes, styled } from "styled-components";
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

  const handleRadioCheck = (event) => {
    setSubData((p) => ({ ...p, status: Number(event.target.value) }));
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
            <Row>
              <RadioBox>
                <input
                  type="radio"
                  id="accept"
                  name="status"
                  value="1"
                  onChange={handleRadioCheck}
                />
                <label htmlFor="accept">승인</label>
                <input
                  type="radio"
                  id="denie"
                  name="status"
                  value="2"
                  onChange={handleRadioCheck}
                />
                <label htmlFor="denie">반려</label>
              </RadioBox>
              <Input
                type="text"
                value={subData.reason}
                id="reason"
                onChange={(e) =>
                  setSubData((p) => ({ ...p, reason: e.target.value }))
                }
                placeholder="반려 사유를 적어주세요"
              />
            </Row>
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  width: 100%;
`;
const RadioBox = styled.div`
  width: fit-content;
  margin-left: 24px;
  line-height: 50px;

  input[type="radio"] {
    display: none;
  }

  label {
    position: relative;
    padding-left: 28px;
    margin-right: 8px;
    cursor: pointer;
    color: var(--darkgrey, #7d848a);
    font-size: 14px;
  }

  label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 1px solid #e8ebee;
    border-radius: 50%;
    background-color: transparent;
    color: var(--darkgrey, #7d848a);
    font-size: 14px;
  }

  input[type="radio"]:checked + label:after {
    content: "";
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 14px;
    height: 14px;
    background-color: #3994f0;
    border-radius: 50%;
    animation: ${keyframes`
    to {
      transform: translate(-50%, -50%) scale(1);
    }
  `} 0.3s forwards;
  }

  input[type="radio"]:checked + label {
    color: var(--darkestgrey, #535a61);
  }
`;
const Input = styled.input`
  flex: 1;
  width: 86%;
  background-color: var(--lightestgrey, #f7f8fa);
  border: 0.77px solid var(--lightgrey, #e8ebee);
  border-radius: 12px;
  height: 50px;
  box-sizing: border-box;
  padding-left: 24px;
  color: #35383b;
  outline: none;

  /* Spinner 숨기기 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  /* 클릭시 border color 변경 */
  &:focus {
    border: 1px solid #3994f0;
  }

  &::placeholder {
    color: #a7aeb4;
  }
`;
