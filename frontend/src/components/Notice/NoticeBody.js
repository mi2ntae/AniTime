import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";

export default function NoticeBody({ closeNotice }) {
  const noticeRef = useRef(null);
  useEffect(() => {
    const handler = (event) => {
      if (noticeRef.current && !noticeRef.current.contains(event.target)) {
        closeNotice();
        document.removeEventListener("mousedown", handler);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <NoticeContainer ref={noticeRef}>
      <p>notice</p>
    </NoticeContainer>
  );
}

const NoticeContainer = styled.div`
  border: black 1px solid;

  background-color: #ffffff;
  z-index: 10;
  position: absolute;
  transform: translate(-168px, 172px);

  width: 400px;
  height: 320px;
  border-radius: 15px;
`;
