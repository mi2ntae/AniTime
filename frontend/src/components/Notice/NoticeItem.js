import React from "react";
import { styled } from "styled-components";

export default function NoticeItem({ noticeKind, noticeTime, noticeContent }) {
  const kindIcon = [
    "/icons/notification/ic_animal.svg",
    "/icons/notification/ic_time.svg",
    "/icons/notification/ic_pay.svg",
    "/icons/notification/ic_chat.svg",
  ];

  return (
    <ItemDiv
      onClick={
        noticeKind === 1
          ? () => {
              window.location.href = "/mypage";
            }
          : {}
      }
    >
      <KindImg src={kindIcon[noticeKind]} />
      <ContentDiv>
        {noticeContent.split("\\n").map((item, index) => (
          <span key={index}>{item}</span>
        ))}
        <span style={{ color: "#7D848A", fontSize: "12px" }}>{noticeTime}</span>
      </ContentDiv>
    </ItemDiv>
  );
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const KindImg = styled.img`
  margin: 8px;
`;

const ContentDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  font-size: 0.85rem;
`;
