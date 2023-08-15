import Slider from "components/Main/Slider";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { MainContainer } from "styled/styled";
import http from "api/commonHttp";
import CountUp from "react-countup";
import DesertionMap from "components/Main/DesertionMap";
import Footer from "components/Footer/Footer";

export default function MainPage() {
  const scrollRef = useRef(null);

  const [isTop, setIsTop] = useState(true);
  const [report, setReport] = useState({
    newAnimals: -1,
    keeping: -1,
    posting: -1,
  });
  useEffect(() => {
    function handleScroll() {
      const scrollPosition = scrollRef.current.scrollTop;
      setIsTop(scrollPosition == 0);
    }
    const temp = scrollRef.current;
    temp.addEventListener("scroll", handleScroll);
    return () => {
      temp.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const moveTop = () => {
    scrollRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    // 서버와 통신하여 데이터 가져오기
    http
      .get(`desertion/count`)
      .then(({ data }) => {
        setReport((p) => ({ ...p, ...data }));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <ScrollContanier ref={scrollRef}>
      <ScrollArea>
        <MainImg>
          <MainText>
            비대면 입양 문화의 시작
            <br />
            애니타임
          </MainText>
        </MainImg>

        <ReportDiv>
          <ReportText>
            오늘 구조된 동물{" "}
            <ReportNumber>
              <CountUp start={0} end={report.newAnimals} delay={2} />
            </ReportNumber>
            마리
          </ReportText>
          <ReportText>
            현재 공고 동물{" "}
            <ReportNumber>
              <CountUp start={0} end={report.posting} delay={2} />
            </ReportNumber>
            마리
          </ReportText>
          <ReportText>
            보호 동물{" "}
            <ReportNumber>
              <CountUp start={0} end={report.keeping} delay={2} />
            </ReportNumber>
            마리
          </ReportText>
        </ReportDiv>
      </ScrollArea>

      <ScrollArea>
        <SliderTitle>전국의 입양을 기다리는 아이들</SliderTitle>
        <DesertionMap />
      </ScrollArea>

      <ScrollArea>
        <SliderTitle>입양을 기다리는 아이들이에요</SliderTitle>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Slider />
        </div>
      </ScrollArea>

      <ScrollArea style={{ justifyContent: "space-between" }}>
        <HowDiv>
          <HowHeader>HOW</HowHeader>
          <h1
            style={{
              color: "var(--darkestgrey, #535A61)",
              fontSize: "36px",
              fontWeight: "500",
              marginTop: "16px",
              marginBottom: "64px",
            }}
          >
            애니타임은 무엇인가요?
          </h1>
          <HowBody>
            {/* card 1 */}
            <HowCard>
              <HowIcon>
                <img src="icons/how/img_home_how1.svg" alt="how icon" />
              </HowIcon>
              <HowCardTitle>비대면 채널을 통한 입양</HowCardTitle>
              <HowCartContent>
                입양 신청자는 가족이 되고 싶은 동물 친구들을 비대면으로 먼저
                만나볼 수 있고, 보호소는 입양 신청자의 환경을 비대면으로 확인할
                수 있습니다.
              </HowCartContent>
            </HowCard>
            {/* card 2 */}
            <HowCard>
              <HowIcon>
                <img src="icons/how/img_home_how2.svg" alt="how icon" />
              </HowIcon>
              <HowCardTitle>실종된 나의 친구를 찾는 방법</HowCardTitle>
              <HowCartContent>
                실종된 동물을 등록하면 실종 동물의 종, 털 색, 위치를 기반으로
                유사한 공고/보호 동물을 추천해 드립니다.
              </HowCartContent>
            </HowCard>
            {/* card 3 */}
            <HowCard>
              <HowIcon>
                <img src="icons/how/img_home_how3.svg" alt="how icon" />
              </HowIcon>
              <HowCardTitle>동물 친구들에게 더 나은 환경을</HowCardTitle>
              <HowCartContent>
                다치거나, 열악한 환경에 처한 동물들에게 후원할 수 있도록,
                인증받은 보호소에서 공고를 올릴 수 있고, 이용자들은 이에 후원할
                수 있습니다.
              </HowCartContent>
            </HowCard>
          </HowBody>
        </HowDiv>
        <TopButton
          onClick={moveTop}
          style={
            isTop
              ? {
                  display: "none",
                  transition: "background-color 0.3s ease-in-out;",
                }
              : { display: "block" }
          }
        >
          <img src={`/icons/top_button.svg`} alt="맨 위로 이동" />
        </TopButton>
        <Footer />
      </ScrollArea>
    </ScrollContanier>
  );
}

const ScrollContanier = styled.div`
  scroll-snap-type: y mandatory;
  overflow: auto;
  width: 100%;
  min-width: 800px;
  height: 100vh;
  padding: 0;
`;

const ScrollArea = styled.div`
  scroll-snap-align: start;
  height: 100vh;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
`;

const MainImg = styled.div`
  background-image: url("/img_main.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  min-width: 800px;
  height: calc(100vh - 220px);
`;

const MainText = styled.h1`
  color: white;
  width: 100%;
  max-width: 1240px;
  margin: auto;
  margin-top: 100px;
  padding-right: 24px;
  text-align: right;
`;

const ReportDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  max-width: 1240px;
  height: 136px;
  margin: 0 auto;
  padding: 0;
`;

const ReportText = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #35383b;
`;

const ReportNumber = styled.span`
  color: #54b1e5;
  font-weight: bold;
`;

const SliderTitle = styled.h1`
  margin: auto;
  margin-top: 24px;
  margin-bottom: 24px;
  max-width: 1240px;
  text-align: center;
`;

const HowDiv = styled.div`
  margin: 0 auto;
  padding: 0 24px;
  max-width: 1240px;
  text-align: left;
`;

const HowHeader = styled.div`
  color: var(--primary, #3994f0);
  font-size: 20px;
  font-weight: 600;
  margin-top: 32px;
  margin-bottom: 16px;
`;

const HowBody = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 20px;
  // padding: 24px;
`;

const HowCard = styled.div`
  text-align: left;
  flex: 1 0 30%;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0px 1.8790196180343628px 46.97549057006836px 0px
    rgba(175, 173, 181, 0.1);
  min-height: 288px;
`;

const HowIcon = styled.div`
  padding: 16px;
  border-radius: 50%;
  background-color: #f9f9f9;
  width: 32px;
  height: 32px;
`;

const HowCardTitle = styled.h2`
  font-size: 20px;
  color: var(--darkestgrey, #535a61);
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const HowCartContent = styled.p`
  color: var(--darkgrey, #7d848a);
  font-size: 12px;
  font-weight: 400;
  margin: 0;
`;

const TopButton = styled.button`
  width: 80px;
  img {
    width: inherit;
  }
  border: none;
  background-color: transparent;
  position: fixed;
  bottom: 100px;
  right: 100px;
  cursor: pointer;
`;
