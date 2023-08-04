import React, { useState } from "react";
import Modal from "components/Modal/Modal";
import { styled } from "styled-components";
import FilterItem from "./FilterItem";

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
      >
        필터
        {isOpen && (
          <Modal posX="-75px" posY="-85px" close={closeNotice}>
            <FilterItem />
          </Modal>
        )}
      </FilterButton>
    </>
  );
}

const FilterButton = styled.button`
  margin-right: 20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
