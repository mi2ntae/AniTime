import React from "react";
import { styled } from "styled-components";

export default function SortItem() {
  return (
    <ItemDiv>
      <ContentDiv>
      <p>최신순</p>
      </ContentDiv>
      <DivisionLine/>
      <ContentDiv>
      <p>오래된순</p>
      </ContentDiv>
      <DivisionLine/>
      <ContentDiv>
      <p>임박일순</p>
      </ContentDiv>
    </ItemDiv>
  );
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: 70px;
  height:200px;
`;

const ContentDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  color: black;
`;

const DivisionLine = styled.div`
  border-top: 1px solid #444444;
`;