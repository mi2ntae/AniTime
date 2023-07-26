import React, { useEffect, useRef } from "react";
import { css, styled } from "styled-components";

export default function Modal({ close, posX, posY, children }) {
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
    <ModalContainer $posX={posX} $posY={posY} ref={modalRef}>
      {children}
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  // 모달 위치 확인용 테두리
  border: black 1px solid;

  background-color: #ffffff;
  z-index: 10;
  position: absolute;
  ${(props) =>
    !(props.$posX || props.$posY) &&
    css`
      bottom: 50%;
      left: 50%;
    `}
  transform: translate(-50%, 50%) ${(props) =>
    props.$posX && "translateX(" + props.$posX + ")"} ${(props) =>
    props.$posY && "translateY(" + props.$posY + ")"};

  border-radius: 15px;
`;
