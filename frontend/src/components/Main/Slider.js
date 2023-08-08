import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import SliderItem from "./SliderItem";
import http from "api/commonHttp";

export default function Slider() {
  const [animals, setAnimals] = useState([]);

  const sliderRef = useRef();
  const index = useRef(0);
  const animalLen = useRef(1);

  const moveIndex = useCallback(
    (offset) => {
      const prev = index.current;
      index.current += offset;
      const sliderWidth = sliderRef.current.offsetWidth / 3;
      const itemWidth = sliderWidth / animalLen.current;
      sliderRef.current.animate(
        {
          transform: [
            `translateX(${-sliderWidth - prev * itemWidth}px)`,
            `translateX(${-sliderWidth - index.current * itemWidth}px)`,
          ],
        },
        {
          duration: 500, // 밀리초 지정
          fill: "forwards", // 종료 시 속성을 지님
          easing: "ease", // 가속도 종류
        }
      );
      index.current = (index.current + animalLen.current) % animalLen.current;
      console.log(index.current);
    },
    [animals]
  );

  useEffect(() => {
    // Todo: 서버와 통신하여 데이터 받기
    http
      .get(
        `desertion?generalNo=0&kindType=0&genderType=0&sortType=0&curPageNo=0`
      )
      .then(({ data }) => {
        console.log(data);
        setAnimals([...data, ...data, ...data]);
        animalLen.current = data.length;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // 자동 슬라이더
    // const interval = setInterval(() => {
    //   moveIndex(1);
    // }, 3000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, [moveIndex]);

  return (
    <Div>
      <SliderDiv ref={sliderRef}>
        {animals.map((animal, index) => (
          <SliderItem key={animal.desertionNo * 100 + index} animal={animal} />
        ))}
      </SliderDiv>
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

const SliderDiv = styled.div`
  display: flex;
  overflow: visible;
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
