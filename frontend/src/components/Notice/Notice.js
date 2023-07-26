import React, { useState } from "react";
import NoticeBody from "./NoticeBody";

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
        onClick={openNotice}
      />
      {isOpen && <NoticeBody closeNotice={closeNotice} />}
    </>
  );
}
