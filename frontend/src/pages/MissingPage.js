import ProfileTab from "components/Profile/ProfileTab";
import React from "react";
import { styled } from "styled-components";
import { MainContainer } from "styled/styled";

export default function Missing() {
  return (
    <PageContainer>
      <MainContainer>
        <ListFilterContainer>
          <ListContainer>
            <h3>실종 동물 목록</h3>
          </ListContainer>
        </ListFilterContainer>
        <DetailViewBox>
          <ProfileTab/>
        </DetailViewBox>
      </MainContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListFilterContainer = styled.div`
  flex: 1;
  width: 800px;
  height: 700px;
  margin-right: 20px;
  padding: 20px;
`;

const ListContainer = styled.div`
  flex: 1;
  width: 700px;
  height: 600px;
  padding: 10px;
  overflow-y: scroll;
  text-align: center;
  margin-top: 74px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const DetailViewBox = styled.div`
  flex: 1;
  width: 200px;
  height: 580px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 93px;
`;
