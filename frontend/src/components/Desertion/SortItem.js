import React from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortType,
  setSortSelected,
  setDescClicked,
  setAscClicked,
} from "reducer/sortInfo";
export default function SortItem() {
  const dispatch = useDispatch();
  let sortSelected = useSelector((state) => state.sortInfo.sortSelected);
  let descClicked = useSelector((state) => state.sortInfo.descClicked);
  let ascClicked = useSelector((state) => state.sortInfo.ascClicked);
  const handleSortButtonClick = (sortType) => {
    dispatch(setSortType(sortType));
    if (sortType === 0) {
      sortSelected = "최신순";
      descClicked = true;
      ascClicked = false;
    } else if (sortType === 1) {
      sortSelected = "오래된순";
      descClicked = false;
      ascClicked = true;
    }
    dispatch(setSortSelected(sortSelected));
    dispatch(setDescClicked(descClicked));
    dispatch(setAscClicked(ascClicked));
  };

  return (
    <ItemDiv>
      <ContentDiv onClick={() => handleSortButtonClick(0)}>
        <Font className={descClicked ? "active" : ""}>최신순</Font>
      </ContentDiv>
      <DivisionLine />
      <ContentDiv onClick={() => handleSortButtonClick(1)}>
        <Font className={ascClicked ? "active" : ""}>오래된순</Font>
      </ContentDiv>
    </ItemDiv>
  );
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: 100px;
  height: 100px;
`;

const ContentDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  color: black;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const DivisionLine = styled.div`
  border-top: 1px solid #ccc;
`;

const Font = styled.span`
  width: 90px;
  height: 40px;
  font-size: 15px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  // font-weight: bold;
  &:hover {
    background-color: #ccc;
    border-radius: 8px;
  }
  &.active {
    background-color: #e1f0ff;
    border-radius: 8px;
    &:hover {
      background-color: #ccc;
      border-radius: 8px;
    }
  }
`;
