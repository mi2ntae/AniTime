import React, { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import { styled } from "styled-components";
import FilterItem from "./FilterItem";
import { useSelector } from "react-redux";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedCnt, setCheckedCnt] = useState(4);
  let dogChecked = useSelector((state) => state.filterInfo.dogChecked);
  let catChecked = useSelector((state) => state.filterInfo.catChecked);
  let femaleChecked = useSelector((state) => state.filterInfo.femaleChecked);
  let maleChecked = useSelector((state) => state.filterInfo.maleChecked);
  const openNotice = () => {
    setIsOpen(true);
  };
  // const dispatch = useDispatch();
  const closeNotice = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    let cnt = 0;
    if (dogChecked) {
      cnt++;
    }
    if (catChecked) {
      cnt++;
    }
    if (femaleChecked) {
      cnt++;
    }
    if (maleChecked) {
      cnt++;
    }
    setCheckedCnt(cnt);
  }, [dogChecked, catChecked, femaleChecked, maleChecked]);

  return (
    <>
      <FilterButton
        onClick={(event) => {
          event.stopPropagation();
          openNotice();
        }}
        className={isOpen ? "active" : ""}
      >
        <Span>
          <img src="icons/ic_filter.svg" />
        </Span>
        <Span>필터</Span>
        <Span>
          <Cnt>{checkedCnt}</Cnt>
        </Span>
        {isOpen && (
          <Modal
            posX="50px"
            posY="25px"
            width="230px"
            height="200px"
            close={closeNotice}
          >
            <FilterItem
              dogChecked={dogChecked}
              catChecked={catChecked}
              femaleChecked={femaleChecked}
              maleChecked={maleChecked}
            />
          </Modal>
        )}
      </FilterButton>
    </>
  );
}

const FilterButton = styled.button`
  width: 110px;
  height: 45px;
  margin-right: 8px;
  background-color: #f8f8f8;
  color: black;
  border: 2px solid #e8ebee;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  &.active {
    background-color: #e1f0ff;
    border: 2px solid #3994f0;
  }
`;
const Span = styled.span`
  display: flex;
  font-size: 15px;
  // font-weight: bold;
  align-content: center;
`;
const Cnt = styled.span`
  variant: outlined;
  width: 20px;
  height: 20px;
  background-color: #3994f0;
  color: white;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  border-radius: 50%;
`;
