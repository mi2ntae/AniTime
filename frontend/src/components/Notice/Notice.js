import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import NoticeContainer from "./NoticeContainer";
import { styled } from "styled-components";

export default function Notice() {
  const [isOpen, setIsOpen] = useState(false);
  const [noticeNum, setNoticeNum] = useState(0);

  const openNotice = () => {
    setIsOpen(true);
  };
  const closeNotice = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // 서버에서 알림 갯수 받아오기
    setNoticeNum(5);
  }, []);

  return (
    <>
      <Img
        src={`/icons/header/ic_notification${
          noticeNum !== 0 ? "_active" : ""
        }.svg`}
        alt="notice"
        onClick={(event) => {
          setNoticeNum(0);
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

const Img = styled.img`
  cursor: pointer;
`;
