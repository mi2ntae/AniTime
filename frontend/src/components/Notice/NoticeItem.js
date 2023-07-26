import React from "react";
import { styled } from "styled-components";

export default function NoticeItem({ noticeKind, noticeTime, noticeContent }) {
  return (
    <ItemDiv>
      <p>{noticeKind}</p>
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
`;

const ContentDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
`;
