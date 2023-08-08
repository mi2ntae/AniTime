import React, { useState } from "react";
import Modal from "components/Modal/Modal";
import { styled } from "styled-components";
import SortItem from "./SortItem";
import { useSelector } from "react-redux";

export default function Sort() {
  const [isOpen, setIsOpen] = useState(false);
  let descClicked = useSelector((state) => state.sortInfo.descClicked);
  let ascClicked = useSelector((state) => state.sortInfo.ascClicked);
  let sortSelected = useSelector((state) => state.sortInfo.sortSelected);

  // const openNotice = () => {
  //   setIsOpen(true);
  // };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const closeNotice = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SortButton
        onClick={(event) => {
          event.stopPropagation();
          toggleOpen();
        }}
      >
        <Span>{sortSelected}</Span>
        <Span>
          <img src="icons/ic_arrow_bottom.svg" />
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
`;
const Span = styled.span`
  font-size: 14px;
  // font-weight: bold;
  display: flex;
  align-items: center;
`;
