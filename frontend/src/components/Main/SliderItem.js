import React from "react";
import { styled } from "styled-components";

export default function SliderItem({ index, animal }) {
  const width = 300;
  const { desertionNo, noticeNo, kind, sexcd, status } = animal;
  return (
    <Div
      $width={width}
      style={{
        transform: `translateX(${index * -width}px)`,
        transition: "0.5s ease",
      }}
    >
      <p>{desertionNo}</p>
      <p>{noticeNo}</p>
      <p>{kind}</p>
      <p>{sexcd}</p>
      <p>{status}</p>
    </Div>
  );
}

const Div = styled.div`
  box-sizing: border-box;
  border: black 3px solid;
  width: ${({ $width }) => $width || 300}px;
  height: 400px;
  flex-shrink: 0;
`;
