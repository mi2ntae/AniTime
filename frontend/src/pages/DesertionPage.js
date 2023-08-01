import React from "react";
import { styled } from "styled-components";
import { MainContainer} from "styled/styled";
import Filter from "../components/Desertion/Filter";
import Sort from "components/Desertion/Sort";
import DesertionDetail from "../components/Desertion/DesertionDetail.jsx"

export default function Desertion() {
  return (
    <PageContainer>
        <MainContainer>
          <ListFilterContainer>
           <FiltersContainer>
            <Filter></Filter>
            <Sort></Sort>
           </FiltersContainer>
           <ListContainer>
           <h3>입양 동물 목록</h3>
           </ListContainer>
         </ListFilterContainer>   
        <DetailViewBox>
          <DesertionDetail/>
        </DetailViewBox>
      </MainContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  margin: auto;
  display:flex;
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
  flex:1;
  width: 700px;
  height: 600px;
  padding: 10px;
  overflow-y: scroll;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: right;
  padding: 20px;
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

