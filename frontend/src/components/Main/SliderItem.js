import React from "react";
import { styled } from "styled-components";

export default function SliderItem({ animal }) {
  const width = 300;
  const { desertionNo, noticeNo, kind, sexcd, status } = animal;
  return (
    <Div>
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
