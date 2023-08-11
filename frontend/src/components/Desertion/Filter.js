import React, { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import { styled } from "styled-components";
import FilterItem from "./FilterItem";
import { useSelector } from "react-redux";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const openNotice = () => {
    setIsOpen(true);
  };

  const closeNotice = () => {
    setIsOpen(false);
  };

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
        {isOpen && (
          <Modal
            posX="50px"
            posY="30px"
            width="280px"
            height="180px"
            close={closeNotice}
          >
            <FilterItem />
          </Modal>
        )}
      </FilterButton>
    </>
  );
}

const FilterButton = styled.button`
  width: 100px;
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
