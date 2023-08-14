import http from "api/commonHttp";
import DesertionDetail from "components/Desertion/DesertionDetail";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDesertionNo } from "reducer/detailInfo";
import { keyframes, styled } from "styled-components";
import { processState } from "./processState";
import { Button } from "@mui/material";
import { Input, Row } from "styled/styled";
import { useNavigate } from "react-router";
import AdoptionForm from "components/AdoptionForm/AdoptionForm";
import { setReload } from "reducer/shelterMeeting";

export default function MeetingDetail() {
  const meetingNo = useSelector((state) => state.shelterMeeting.meetingNo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const fetchData = useCallback(() => {
    // api 통신
    http
      .get(`/meet/shelter/${meetingNo}`)
      .then(({ data: { meet, adoptionForm } }) => {
        setMeeting(meet);
        setAdoptionForm(adoptionForm);
        setMeetingState(processMeetingState(meet));
        dispatch(setDesertionNo(meet.animal.desertionNo));
      });
  }, [meetingNo]);

  const handleRadioCheck = (event) => {
    setSubData((p) => ({ ...p, status: Number(event.target.value) }));
  };

  const handleSubmit = () => {
    // console.log("submit " + meetingNo);
    // console.log(subData);
    if (subData.status != 1 && subData.status != 2) {
      alert("승인 또는 반려를 선택해주세요");
      return;
    }
    http
      .put(`meet/${meetingNo}`, {
        status: subData.status == 1,
        reason: subData.reason,
      })
      .then(() => {
        fetchData();
        dispatch(setReload(true));
      })
      .catch((error) => alert(error));
  };

  const handleEnterMeeting = () => {
    // console.log("enter " + meetingNo);
    navigate(`/meeting/${meetingNo}`);
  };

  useEffect(() => {
    if (meetingNo !== -1) {
      // api 통신
      fetchData();
    }
    setSubData({
      status: 0,
      reason: "",
    });
  }, [fetchData]);

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
      {!meeting && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#A7AEB4",
            fontSize: "14px",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <img src="/logo_grey.svg" />
          미팅 정보를 선택해주세요.
        </div>
      )}
      {meeting && (
        <>
          <Content>
            <DesertionDetail readOnly={true} />
            {/* {adoptionForm} */}
            <AdoptionForm url={adoptionForm} />
          </Content>
          <Footer>
            <DateDiv>미팅일시 : {meeting.reservedDate}</DateDiv>
            <Row>
              <RadioBox
                style={{ width: "fit-content", margin: 0, marginLeft: "24px" }}
              >
                <input
                  type="radio"
                  id="accept"
                  name="status"
                  value="1"
                  checked={subData.status == 1}
                  onChange={handleRadioCheck}
                />
                <label htmlFor="accept">승인</label>
                <input
                  type="radio"
                  id="denie"
                  name="status"
                  value="2"
                  checked={subData.status == 2}
                  onChange={handleRadioCheck}
                />
                <label htmlFor="denie">반려</label>
              </RadioBox>
              <Input
                style={{ height: "32px", paddingLeft: "12px" }}
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
                width: "120px",
                height: "50px",
                borderRadius: "12px",
                "&:hover": {
                  backgroundColor: "#3994f0",
                },
                boxShadow: 0,
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
  height: 64px;
`;
const HeaderLayer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: absolute;
  right: 8%;
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
  background-color: #f7f8fa;
  border: 1px solid #e8ebee;
  color: var(--blackgrey, #35383b);
  font-size: 14px;
  font-weight: 500;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 160px;
`;

const RadioBox = styled.div`
  width: 86%;
  margin: 0px 6% 0px 0px;
  line-height: 50px;

  input[type="radio"] {
    display: none;
  }

  label {
    position: relative;
    padding-left: 28px;
    margin-right: 40px;
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
