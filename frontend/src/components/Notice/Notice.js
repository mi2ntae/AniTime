import React, { useState } from "react";
import Modal from "../Modal/Modal";
import NoticeContainer from "./NoticeContainer";

export default function Notice() {
  const [isOpen, setIsOpen] = useState(false);

  const openNotice = () => {
    setIsOpen(true);
  };
  const closeNotice = () => {
    setIsOpen(false);
  };

  return (
    <>
      <img
        src={`/icons/ic_notification.svg`}
        alt="notice"
        onClick={(event) => {
          event.stopPropagation();
          openNotice();
        }}
      />
      {isOpen && (
        <Modal posX={"16px"} posY={"16px"} close={closeNotice}>
          <NoticeContainer />
        </Modal>
      )}
    </>
  );
}
