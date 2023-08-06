import React from "react";
import { styled } from "styled-components";

export default function SortItem() {
  return (
    <ItemDiv>
      <ContentDiv>
        <Font>최신순</Font>
      </ContentDiv>
      <DivisionLine />
      <ContentDiv>
        <Font>오래된순</Font>
      </ContentDiv>
      <DivisionLine />
      <ContentDiv>
        <Font>임박일순</Font>
      </ContentDiv>
    </ItemDiv>
  );
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: 100px;
  height: 130px;
`;

const ContentDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  color: black;
`;

const DivisionLine = styled.div`
  border-top: 1px solid #ccc;
`;

const Font = styled.div`
  margin-top: 10px;
  font-size: 15px;
  display: flex;
  align-content: center;
  justify-content: center;
`;
