import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import SliderItem from "./SliderItem";

export default function Slider() {
  const [animals, setAnimals] = useState([]);
  const [index, setIndex] = useState(0);

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
      setIndex((p) => (p + 1) % animals.length);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [animals]);

  const moveIndex = (offset) => {
    setIndex((p) => (p + offset + animals.length) % animals.length);
  };

  return (
    <Div>
      <Button style={{ left: "30px" }} onClick={() => moveIndex(-1)}>
        왼
      </Button>
      <Button style={{ right: "30px" }} onClick={() => moveIndex(1)}>
        오
      </Button>
      {animals.map((animal) => (
        <SliderItem
          key={animal.desertionNo}
          index={index}
          animal={animal}
        ></SliderItem>
      ))}
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-width: 1200px;
`;

const Button = styled.button`
  position: absolute;
  background: none;
  z-index: 1;
`;
