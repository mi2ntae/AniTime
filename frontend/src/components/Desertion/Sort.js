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
        정렬
        {isOpen && (
          <Modal posX="13px" posY="-85px" close={closeNotice}>
            <SortItem />
          </Modal>
        )}
      </SortButton>
    </>
  );
}

const SortButton = styled.button`
  padding: 8px 16px;
  margin-right: 8px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
