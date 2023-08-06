import Slider from "components/Main/Slider";
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

      <SliderTitle>입양을 기다리는 아이들이에요</SliderTitle>
      <Slider />

      <HowDiv>
        <HowHeader>HOW</HowHeader>
        <h1 style={{ fontWeight: "normal" }}>애니타임은 무엇인가요?</h1>
        <HowBody>
          {/* card 1 */}
          <HowCard>
            <HowIcon>
              <img src="icons/how/img_home_how1.svg" alt="how icon" />
            </HowIcon>
            <HowCardTitle>비대면 채널을 통한 입양</HowCardTitle>
            <HowCartContent>
              이 항목에 대한 설명을 울랄라로 적습니다.
              울랄라리아리이라이아리아웅라우라으륑링루ㅏㅣ우리위루아ㅣ루이ㅜ라ㅣ우리우라ㅣㅇ루아ㅣ루아ㅣ루아ㅣ루아ㅣㄹ울아ㅣㅜㄹ아ㅣㄹ아ㅣㅜㄹ이ㅜ라ㅣ우라ㅣㅜ라ㅣ우라ㅣㅇ
            </HowCartContent>
          </HowCard>
          {/* card 2 */}
          <HowCard>
            <HowIcon>
              <img src="icons/how/img_home_how2.svg" alt="how icon" />
            </HowIcon>
            <HowCardTitle>실종된 나의 가족을 찾는 방법</HowCardTitle>
            <HowCartContent>
              이 항목에 대한 설명을 울랄라로 적습니다.
              울랄라리아리이라이아리아웅라우라으륑링루ㅏㅣ우리위루아ㅣ루이ㅜ라ㅣ우리우라ㅣㅇ루아ㅣ루아ㅣ루아ㅣ루아ㅣㄹ울아ㅣㅜㄹ아ㅣㄹ아ㅣㅜㄹ이ㅜ라ㅣ우라ㅣㅜ라ㅣ우라ㅣㅇ
            </HowCartContent>
          </HowCard>
          {/* card 3 */}
          <HowCard>
            <HowIcon>
              <img src="icons/how/img_home_how3.svg" alt="how icon" />
            </HowIcon>
            <HowCardTitle>지갑을 열어라 나의 지갑이여</HowCardTitle>
            <HowCartContent>
              이 항목에 대한 설명을 울랄라로 적습니다.
              울랄라리아리이라이아리아웅라우라으륑링루ㅏㅣ우리위루아ㅣ루이ㅜ라ㅣ우리우라ㅣㅇ루아ㅣ루아ㅣ루아ㅣ루아ㅣㄹ울아ㅣㅜㄹ아ㅣㄹ아ㅣㅜㄹ이ㅜ라ㅣ우라ㅣㅜ라ㅣ우라ㅣㅇ
            </HowCartContent>
          </HowCard>
        </HowBody>
      </HowDiv>
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
  box-sizing: border-box;
  width: 100%;
  min-width: 1200px;
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

const SliderTitle = styled.h1`
  margin-top: 56px;
  margin-bottom: 24px;
`;

const HowDiv = styled.div`
  margin-top: 80px;
  text-align: left;
`;

const HowHeader = styled.p`
  color: #3994f0;
`;

const HowBody = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 32px;
  padding: 24px;
`;

const HowCard = styled.div`
  text-align: left;
  flex: 1 0 30%;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 24px #caced3;
`;

const HowIcon = styled.div`
  padding: 16px;
  border-radius: 50%;
  background-color: #f9f9f9;
  width: 32px;
  height: 32px;
`;

const HowCardTitle = styled.h2`
  color: #535a61;
`;

const HowCartContent = styled.p`
  color: #7d848a;
`;
