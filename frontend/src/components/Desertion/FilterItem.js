import React from "react";
import { styled } from "styled-components";

export default function FilterItem() {
  return (
    <ItemDiv>
      <p>축종</p>
      <ContentDiv>
         <Label><input type="checkbox" name="animal" value="dog"/>개</Label>
         <Label><input type="checkbox" name="animal" value="red"/>고양이</Label>
      </ContentDiv>
      <DivisionLine/>
      <p>성별</p>
      <ContentDiv>
         <Label><input type="checkbox" name="gender" value="male"/>수컷</Label>
         <Label><input type="checkbox" name="gender" value="female"/>암컷</Label>
      </ContentDiv>
    </ItemDiv>
  );
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: 250px;
  height:200px;
`;

const ContentDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  color: black;
  text-right-padding: 50px;
`;
const Label = styled.div`
  margin: 10px 10px 10px 20px;
  padding-left:30px;
`;
const DivisionLine = styled.div`
  border-top: 1px solid #444444;
`;