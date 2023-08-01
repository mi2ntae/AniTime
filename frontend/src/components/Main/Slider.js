import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import SliderItem from "./SliderItem";

export default function Slider() {
  const [animals, setAnimals] = useState([]);
  const [index, setIndex] = useState(0);

  const moveIndex = useCallback(
    (offset) => {
      setIndex((p) => (p + offset + animals.length) % animals.length);
    },
    [animals]
  );

  useEffect(() => {
    // Todo: 서버와 통신하여 데이터 받기
    const testData = [
      {
        desertionNo: 1,
        noticeNo: 1,
        kind: "고양이",
        sexcd: "F",
        status: "공고중", // 공고종료일로 계산
      },
      {
        desertionNo: 2,
        noticeNo: 1,
        kind: "고양이",
        sexcd: "M",
        status: "공고중", // 공고종료일로 계산
      },
      {
        desertionNo: 3,
        noticeNo: 1,
        kind: "고양이",
        sexcd: "F",
        status: "공고중", // 공고종료일로 계산
      },
      {
        desertionNo: 4,
        noticeNo: 1,
        kind: "고양이",
        sexcd: "F",
        status: "공고중", // 공고종료일로 계산
      },
      {
        desertionNo: 5,
        noticeNo: 1,
        kind: "개",
        sexcd: "F",
        status: "공고중", // 공고종료일로 계산
      },
      {
        desertionNo: 6,
        noticeNo: 1,
        kind: "고양이",
        sexcd: "F",
        status: "공고중", // 공고종료일로 계산
      },
    ];
    setAnimals(testData);
  }, []);

  useEffect(() => {
    // 자동 슬라이더
    const interval = setInterval(() => {
      moveIndex(1);
    }, 3000);
    console.log(interval);
    return () => {
      clearInterval(interval);
    };
  }, [moveIndex]);

  return (
    <Div>
      {animals.map((animal) => (
        <SliderItem key={animal.desertionNo} index={index} animal={animal} />
      ))}
      <ButtonDiv>
        <Button onClick={() => moveIndex(-1)}>
          <img src="icons/ic_arrow_left.svg" alt="left" />
        </Button>
        <Button onClick={() => moveIndex(1)}>
          <img src="icons/ic_arrow_right.svg" alt="right" />
        </Button>
      </ButtonDiv>
    </Div>
  );
}

const Div = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  /* min-width: 1200px; */
  overflow: hidden;
`;

const ButtonDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  background: none;
  border: none;
  margin: 32px;
  cursor: pointer;
`;
