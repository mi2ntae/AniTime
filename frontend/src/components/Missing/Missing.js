import React from "react";
import { styled } from "styled-components";
import { MainContainer} from "styled/styled";

export default function Missing() {
  return (
    <PageContainer>
        <MainContainer>
          <ListFilterContainer>
           <FiltersContainer>
            <FilterButton>필터</FilterButton>
            <SortButton>정렬</SortButton>
           </FiltersContainer>
           <ListContainer>
           <h3>실종 동물 목록</h3>
           </ListContainer>
         </ListFilterContainer>   
        <DetailViewBox>
          <h3>상세정보창</h3>
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

const FilterButton = styled.button`
  margin-right:20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SortButton = styled.button`
  padding: 8px 16px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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

