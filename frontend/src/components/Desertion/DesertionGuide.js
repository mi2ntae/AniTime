import styled from "styled-components";
import { Button, MainContainer } from "styled/styled";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function DesertionGuide() {
  const location = useLocation();
  useEffect(() => {
    console.log("category:" + location.state.category);
  }, []);
  const arr = [
    { title: "꼭 사실만을 작성해 주세요.", content: "" },
    { title: "가족 구성원과의 합의 후 상담을 신청해 주세요.", content: "" },
    {
      title:
        "집이 종일 비어 있어 입양동물을 돌봐줄 사람이 없으면 신청자에서 제외됩니다.",
      content: "",
    },
    {
      title: "반려인 본인만 상담을 신청해 주세요.",
      content: "대리인 입양 신청은 불가능합니다.",
    },
    {
      title: "보호소에서 집안 상태에 대한 확인 요청이 있을 예정입니다.",
      content: "입양인 집안 상태 확인은 심사 과정의 일부입니다.",
    },
  ];
  return (
    <MainContainer>
      <PageContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            예약 전 유의사항
          </div>
          <div style={{ fontSize: "16px", marginBottom: "61px" }}>
            상담 예약 전 아래 내용을 확인하여 주세요.
          </div>
        </div>
        <GuideContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "50px",
            }}
          >
            <img src={`/icons/form_warning.svg`} alt="경고"></img>
          </div>
          {arr.map((e, i) => (
            <div>
              <GuideTitle>
                {i + 1}.&nbsp;{e.title}
              </GuideTitle>
              <GuideContent>{e.content}</GuideContent>
            </div>
          ))}
        </GuideContainer>
        <Link
          to={`${location.pathname}/selecttime`}
          state={{ category: location.state.category }}
        >
          <Button
            style={{
              fontSize: "16px",
            }}
            width={"197px"}
            height={"50px"}
            $background_color={"#3994F0"}
            color={"#ffffff"}
          >
            화상 미팅 예약하기
          </Button>
        </Link>
      </PageContainer>
    </MainContainer>
  );
}

const GuideContainer = styled.div`
  background-color: #ffffff;
  padding: 57px;
  width: 726px;
  height: 600px;
  border-radius: 10px;
  margin-bottom: 50px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
  }
`;

const GuideTitle = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 600;
`;

const GuideContent = styled.div`
  font-size: 12px;
  text-align: left;
  margin-bottom: 36px;
`;
