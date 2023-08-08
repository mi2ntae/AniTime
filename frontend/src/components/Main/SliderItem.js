import React from "react";
import { styled } from "styled-components";

export default function SliderItem({ animal }) {
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
  width: 300px;
  height: 400px;
  flex-shrink: 0;
`;
