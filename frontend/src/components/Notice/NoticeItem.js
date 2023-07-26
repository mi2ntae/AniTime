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
    <ItemDiv>
      <KindImg src={kindIcon[noticeKind]} />
      <ContentDiv>
        <span>{noticeContent}</span>
        <span>{noticeTime}</span>
      </ContentDiv>
    </ItemDiv>
  );
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;

const KindImg = styled.img`
  margin: 8px;
`;

const ContentDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
`;
