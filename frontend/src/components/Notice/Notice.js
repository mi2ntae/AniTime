import React, { useCallback, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import NoticeContainer from "./NoticeContainer";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import http from "api/commonHttp";
import { Badge } from "@mui/material";
import { useLocation } from "react-router";

export default function Notice() {
  const [isOpen, setIsOpen] = useState(false);
  const [noticeNum, setNoticeNum] = useState(0);
  const member = useSelector((state) => state.member);

  const location = useLocation();

  const closeNotice = () => {
    setIsOpen(false);
  };

  const handleClick = useCallback(
    (event) => {
      if (!isOpen) {
        setNoticeNum(0);
      }
      event.stopPropagation();
      setIsOpen((p) => !p);
    },
    [member]
  );

  const fetchData = useCallback(() => {
    http
      .get(`notice/count/${member.memberNo}`)
      .then(({ data }) => {
        setNoticeNum(data);
      })
      .catch((error) => console.error(error));
  }, [member]);

  useEffect(() => {
    // 서버에서 알림 갯수 받아오기
    if (member.token) {
      fetchData();
    } else {
      setNoticeNum(0);
    }
  }, [fetchData, location.pathname]);

  return (
    <>
      <Badge color="warning" badgeContent={noticeNum}>
        <Img
          src={`/icons/header/ic_notification.svg`}
          alt="notice"
          onClick={(event) => {
            if (member.token) handleClick(event);
          }}
        />
      </Badge>
      {isOpen && (
        <Modal posX={"16px"} posY={"16px"} close={closeNotice}>
          <NoticeContainer close={closeNotice} />
        </Modal>
      )}
    </>
  );
}

const Img = styled.img`
  cursor: pointer;
`;
