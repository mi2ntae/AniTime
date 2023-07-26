import React, { useEffect, useRef } from "react";
import { css, styled } from "styled-components";

export default function Modal({ close, isNotice, children }) {
  const modalRef = useRef(null);
  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close();
        document.removeEventListener("mousedown", handler);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <ModalContainer $isNotice={isNotice} ref={modalRef}>
      {children}
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  border: black 1px solid;

  background-color: #ffffff;
  z-index: 10;
  position: absolute;
  ${(props) =>
    props.$isNotice
      ? css`
          transform: translate(-168px, 172px);
          width: 400px;
          height: 320px;
        `
      : css`
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 560px;
        `}

  border-radius: 15px;
`;
