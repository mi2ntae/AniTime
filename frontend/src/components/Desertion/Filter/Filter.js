import React, {useState} from "react";
import Modal from "components/Modal/Modal";
import {styled} from "styled-components";
import FilterItem from "./FilterItem";

export default function Filter() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((p) => !p);
    
    const closeNotice = () => {
        setIsOpen(false);
    }
    
    return (
        <>
        <FilterButton
         onClick={(event) => {
            event.stopPropagation();
            toggleOpen();}}
        >필터
        </FilterButton>
        {isOpen && (
            <Modal posX={"80px"} posY={"110px"} close={closeNotice}>
                <FilterItem/>
            </Modal>
        )}
        </>
    );

}

const FilterButton = styled.button`
  margin-right:20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;