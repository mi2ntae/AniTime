import React, { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import { styled } from "styled-components";
import FilterItem from "./FilterItem";
import { useDispatch } from "react-redux";
import {
  setKindType,
  setGenderType,
  setInputAnimal,
  setInputGender,
} from "reducer/filterInfo";

export default function Filter() {
  let dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const closeNotice = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    return () => {
      dispatch(setInputAnimal("animal"));
      dispatch(setInputGender("gender"));
      dispatch(setKindType(0));
      dispatch(setGenderType(0));
    };
  }, []);
  return (
    <>
      <FilterButton
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((p) => !p);
        }}
        className={isOpen ? "active" : ""}
      >
        <Span>
          <img src="icons/ic_filter.svg" />
        </Span>
        <Span>필터</Span>
      </FilterButton>
      {isOpen && (
        <Modal
          posX="20px"
          posY="-35px"
          width="280px"
          height="180px"
          close={closeNotice}
        >
          <FilterItem />
        </Modal>
      )}
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
