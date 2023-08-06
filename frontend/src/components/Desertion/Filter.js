import React, { useState } from "react";
import Modal from "components/Modal/Modal";
import { styled } from "styled-components";
import FilterItem from "./FilterItem";
import { useSelector } from "react-redux";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  let dogChecked = useSelector((state) => state.filterInfo.dogChecked);
  let catChecked = useSelector((state) => state.filterInfo.catChecked);
  let femaleChecked = useSelector((state) => state.filterInfo.femaleChecked);
  let maleChecked = useSelector((state) => state.filterInfo.maleChecked);
  const openNotice = () => {
    setIsOpen(true);
  };

  const closeNotice = () => {
    setIsOpen(false);
  };
  // const dispatch = useDispatch();

  return (
    <>
      <FilterButton
        onClick={(event) => {
          event.stopPropagation();
          openNotice();
        }}
      >
        <Span>필터</Span>
        {isOpen && (
          <Modal
            posX="-20px"
            posY="-75px"
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
  width: 105px;
  height: 40px;
  margin-right: 8px;
  background-color: #f8f8f8;
  color: black;
  border: 2px solid #e8ebee;
  border-radius: 12px;
  cursor: pointer;
`;
const Span = styled.span`
  font-size: 15px;
`;
