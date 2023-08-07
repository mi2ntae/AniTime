import React, { useState } from "react";
import Modal from "components/Modal/Modal";
import { styled } from "styled-components";
import SortItem from "./SortItem";

export default function Sort() {
  const [isOpen, setIsOpen] = useState(false);

  const openNotice = () => {
    setIsOpen(true);
  };

  const closeNotice = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SortButton
        onClick={(event) => {
          event.stopPropagation();
          openNotice();
        }}
      >
        <Span>정렬</Span>
        <Span></Span>
        {isOpen && (
          <Modal posX="39px" posY="-40px" close={closeNotice}>
            <SortItem />
          </Modal>
        )}
      </SortButton>
    </>
  );
}

const SortButton = styled.button`
  width: 91px;
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
