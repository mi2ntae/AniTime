import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { MainContainer } from "styled/styled";

export default function MainPage() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    // 서버와 통신하여 데이터 가져오기
    const testData = [12, 34, 56];
    setReport(testData);
  }, []);

  return (
    <MainContainer $vertical>
      <MainImg>
        <MainText>
          비대면 입양 문화의 시작
          <br />
          애니타임
        </MainText>
      </MainImg>
      <ReportDiv>
        <ReportText>
          오늘 구조된 동물 <ReportNumber>{report[0]}</ReportNumber>마리
        </ReportText>
        <ReportText>
          현재 공고 동물 <ReportNumber>{report[1]}</ReportNumber>마리
        </ReportText>
        <ReportText>
          보호 동물 <ReportNumber>{report[2]}</ReportNumber>마리
        </ReportText>
      </ReportDiv>
      <div>유기동물 슬라이더 들어갈 자리</div>
      <div>애니타임 소개 들어갈 자리</div>
    </MainContainer>
  );
}

const MainImg = styled.div`
  background-image: url("/img_main.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  left: 0;
  z-index: -1;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 220px);
  padding-right: 20vw;
`;

const MainText = styled.h1`
  color: white;
  margin-top: 100px;
  text-align: right;
`;

const ReportDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 136px;
  margin: 0;
  margin-top: calc(100vh - 220px);
  padding: 0;
`;

const ReportText = styled.span`
  color: #35383b;
`;

const ReportNumber = styled.span`
  color: #54b1e5;
  font-weight: bold;
`;
