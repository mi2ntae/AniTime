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
  const [arrowUp, setArrowUp] = useState(false);
  let descClicked = useSelector((state) => state.sortInfo.descClicked);
  let ascClicked = useSelector((state) => state.sortInfo.ascClicked);
  let sortSelected = useSelector((state) => state.sortInfo.sortSelected);
  let dispatch = useDispatch();
  const openNotice = () => {
    setIsOpen(true);
    setArrowUp(true);
  };

  // const toggleOpen = () => {
  //   setIsOpen((prev) => !prev);
  // };

  const closeNotice = () => {
    setIsOpen(false);
    setArrowUp(false);
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
          openNotice();
        }}
        className={isOpen ? "active" : ""}
      >
        <Span>{sortSelected}</Span>
        <Span>
          {arrowUp ? (
            <img src="icons/ic_arrow_up.svg" />
          ) : (
            <img src="icons/ic_arrow_bottom.svg" />
          )}
        </Span>
        {isOpen && (
          <Modal posX="49px" posY="25px" close={closeNotice}>
            <SortItem descClicked={descClicked} ascClicked={ascClicked} />
          </Modal>
        )}
      </SortButton>
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
