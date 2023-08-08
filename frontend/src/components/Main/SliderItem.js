import AnimalItem from "components/Desertion/AnimalItem";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setDesertionNo } from "reducer/detailInfo";
import { styled } from "styled-components";

export default function SliderItem({ animal }) {
  // const { desertionNo, noticeNo, kind, sexcd, status } = animal;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    dispatch(setDesertionNo(animal.desertionNo));
    navigate("/desertion");
  }, [animal, dispatch, navigate]);

  return (
    <Div>
      <AnimalItem animal={animal} handleClick={handleClick} />
    </Div>
  );
}

const Div = styled.div`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  flex-shrink: 0;
`;
