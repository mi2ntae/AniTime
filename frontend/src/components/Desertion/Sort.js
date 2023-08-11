import React, { useEffect, useState } from "react";
import Modal from "components/Modal/Modal";
import { styled } from "styled-components";
import SortItem from "./SortItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setAscClicked,
  setDescClicked,
  setSortSelected,
  setSortType,
} from "reducer/sortInfo";

export default function Sort() {
  const [isOpen, setIsOpen] = useState(false);

  let sortSelected = useSelector((state) => state.sortInfo.sortSelected);
  let dispatch = useDispatch();

  const closeNotice = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    return () => {
      dispatch(setSortType(0));
      dispatch(setAscClicked(false));
      dispatch(setDescClicked(false));
      dispatch(setSortSelected("정렬"));
    };
  }, []);
  return (
    <>
      <SortButton
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((p) => !p);
        }}
        className={isOpen ? "active" : ""}
      >
        <Span>{sortSelected}</Span>
        <Span>
          {isOpen ? (
            <img src="icons/ic_arrow_up.svg" />
          ) : (
            <img src="icons/ic_arrow_bottom.svg" />
          )}
        </Span>
      </SortButton>
      {isOpen && (
        <Modal posX="42px" posY="5px" close={closeNotice}>
          <SortItem />
        </Modal>
      )}
    </>
  );
}

const SortButton = styled.button`
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
  align-items: center;
  justify-content: space-evenly;
  &.active {
    background-color: #e1f0ff;
    border: 2px solid #3994f0;
  }
`;
const Span = styled.span`
  font-size: 15px;
  // font-weight: bold;
  display: flex;
  align-items: center;
`;
