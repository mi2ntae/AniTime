import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { Button } from "styled/styled";

export default function MeetingDetail() {
  const meetingNo = useSelector((state) => state.shelterMeeting.meetingNo);
  const [meeting, setMeeting] = useState(undefined);
  useEffect(() => {
    if (meetingNo !== -1) {
      // api 통신
      console.log("초기화");
      const data = {
        member: {
          name: "임성원",
          phone: "010-0000-0000",
          email: "chunjae@gmail.com",
        },
        reservedDate: "2023-08-02",
        animal: {
          img1: "{img 경로}",
          kind: "포메라니안",
          age: 21,
          sexcd: 1,
          neutral: true,
        },
        img: " img경로 ",
      };
      setMeeting(data);
      console.log(meetingNo);
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
        <Body>
          <Content>{meeting.animal.img1}</Content>
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
        </Body>
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

const Body = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: calc(100% - 160px);
  overflow: hidden;
  background-color: aliceblue;
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
