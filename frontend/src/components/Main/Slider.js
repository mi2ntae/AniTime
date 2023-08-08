import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import SliderItem from "./SliderItem";
import http from "api/commonHttp";

export default function Slider() {
  const [animals, setAnimals] = useState([]);

  const sliderRef = useRef();
  const index = useRef(0);
  const animalLen = useRef(1);
  const interval = useRef();
  const intervalTime = 3000;

  /**
   * index를 변경하여 슬라이더를 이동하는 함수
   */
  const moveIndex = useCallback((offset) => {
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
  }, []);

  /**
   * 좌우 버튼 클릭시 작동하는 함수
   * 설정된 interval을 해제하고 moveIndex 실행후 다시 새로운 interval 설정
   * 좌우 버튼 클릭시에도 interval이 남아 시간을 세는 것을 방지하기 위한 함수
   */
  const handleClick = useCallback(
    (offset) => {
      clearInterval(interval.current);
      moveIndex(offset);
      interval.current = setInterval(() => {
        moveIndex(1);
      }, intervalTime);
    },
    [moveIndex]
  );

  /**
   * api를 사용하여 백엔드에서 데이터 가져오기
   * 무한 슬라이더를 위해 앞뒤로 붙임
   */
  useEffect(() => {
    http
      .get(
        `desertion?generalNo=0&kindType=0&genderType=0&sortType=0&curPageNo=0`
      )
      .then(({ data }) => {
        setAnimals([...data, ...data, ...data]);
        animalLen.current = data.length;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /**
   * 최초에 슬라이더에 interval을 설정해주는 함수
   * unmount시에 interval 해제
   */
  useEffect(() => {
    interval.current = setInterval(() => {
      moveIndex(1);
    }, intervalTime);
    return () => {
      clearInterval(interval.current);
    };
  }, [moveIndex]);

  return (
    <Div>
      <SliderDiv ref={sliderRef}>
        {animals.map((animal, index) => (
          <SliderItem key={animal.desertionNo * 100 + index} animal={animal} />
        ))}
      </SliderDiv>
      <Button onClick={() => handleClick(-1)} style={{ left: 0 }}>
        <img src="icons/ic_arrow_left.svg" alt="left" />
      </Button>
      <Button onClick={() => handleClick(1)} style={{ right: 0 }}>
        <img src="icons/ic_arrow_right.svg" alt="right" />
      </Button>
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
  padding: 0 8px;
  gap: 16px;
`;

const Button = styled.button`
  position: absolute;
  background: none;
  border: none;
  margin: 32px;
  cursor: pointer;
`;
