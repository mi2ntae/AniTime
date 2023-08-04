import React, { useEffect, useRef } from "react";
import { css, styled } from "styled-components";

export default function Modal({
  close,
  center,
  posX,
  posY,
  children,
  width,
  height,
}) {
  const modalRef = useRef(null);
  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close();
      }
    };
    if (close) {
      document.addEventListener("click", handler);
    }
    return () => {
      if (close) {
        document.removeEventListener("click", handler);
      }
    };
  });

  return (
    <ModalContainer
      $center={center}
      $posX={posX}
      $posY={posY}
      $width={width}
      $height={height}
      ref={modalRef}
    >
      {children}
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  box-shadow: 0 0 10px gray;
  background-color: #ffffff;
  z-index: 10;
  position: absolute;
  width: ${(props) => props.$width || "auto"};
  height: ${(props) => props.$height || "auto"};
  ${(props) =>
    props.$center &&
    css`
      bottom: 50%;
      left: 50%;
    `}
  transform: translate(-50%, 50%) ${(props) =>
    props.$posX && "translateX(" + props.$posX + ")"} ${(props) =>
    props.$posY && "translateY(" + props.$posY + ")"};

  border-radius: 8px;
`;
