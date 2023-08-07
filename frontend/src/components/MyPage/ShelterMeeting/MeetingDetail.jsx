import http from "api/commonHttp";
import DesertionDetail from "components/Desertion/DesertionDetail";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDesertionNo } from "reducer/detailInfo";
import { styled } from "styled-components";
import { Button } from "styled/styled";

export default function MeetingDetail() {
  const meetingNo = useSelector((state) => state.shelterMeeting.meetingNo);
  const dispatch = useDispatch();

  const [meeting, setMeeting] = useState(undefined);
  const [adoptionForm, setAdoptionForm] = useState("");

  useEffect(() => {
    if (meetingNo !== -1) {
      // api 통신
      http
        .get(`meet/shelter/${meetingNo}`)
        .then(({ data: { meet, adoptionForm } }) => {
          setMeeting(meet);
          setAdoptionForm(adoptionForm);
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
        <HeaderLayer>상태입니다</HeaderLayer>
      </Header>
      {meeting ? (
        <>
          <Content>
            <DesertionDetail readOnly={true} />
            {adoptionForm}
          </Content>
          <Footer>
            <DateDiv>미팅일시 : {"미팅날짜"}</DateDiv>
            <div>승인 반려 선택하는 입력</div>
            <br />
            <Button
              $background_color="#3994f0"
              color="#ffffff"
              width="126px"
              style={{ fontWeight: "bold" }}
            >
              제출
            </Button>
          </Footer>
        </>
      ) : (
        ""
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
  border-radius: 8px;
  background-color: ${({ $background_color }) => $background_color || "white"};
  color: ${({ color }) => color || "black"};
  padding: ${({ padding }) => padding || "8px"};
  margin: ${({ margin }) => margin || "8px"};
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
