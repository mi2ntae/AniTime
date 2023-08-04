import styled from "styled-components";
import { Button } from "styled/styled";
import { Link } from "react-router-dom";

export default function DesertionGuide() {
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
  ];
  return (
    <PageContainer>
      <div>
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
        {arr.map((e, i) => (
          <div>
            <GuideTitle>{e.title}</GuideTitle>
            <GuideContent>{e.content}</GuideContent>
          </div>
        ))}
      </GuideContainer>
      <Link to="/desertion/reservation/selecttime">
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
  );
}

const GuideContainer = styled.div`
  width: 840px;
  height: 967px;
  border-radius: 10px;
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
