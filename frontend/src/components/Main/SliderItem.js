import React from "react";
import { styled } from "styled-components";

export default function SliderItem({ index, animal }) {
  const { desertionNo, noticeNo, kind, sexcd, status } = animal;
  return (
    <Div
      style={{
        transform: `translateX(${index * -300}px)`,
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
  width: 300px;
  height: 400px;
  flex-shrink: 0;
`;
