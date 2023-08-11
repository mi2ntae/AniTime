import React, { useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux/";
import {
  setKindType,
  setGenderType,
  setInputAnimal,
  setInputGender,
} from "reducer/filterInfo";

export default function FilterItem() {
  let dispatch = useDispatch();

  let inputAnimal = useSelector((state) => state.filterInfo.inputAnimal);
  let inputGender = useSelector((state) => state.filterInfo.inputGender);

  const handleClickRadioButtonAnimal = (radioBtnName) => {
    dispatch(setInputAnimal(radioBtnName));
    let kindType = 0;
    if (radioBtnName === "dog") {
      kindType = 1;
    } else if (radioBtnName === "cat") {
      kindType = 2;
    } else if (radioBtnName === "animal") {
      kindType = 0;
    }
    dispatch(setKindType(kindType));
  };
  const handleClickRadioButtonGender = (radioBtnName) => {
    dispatch(setInputGender(radioBtnName));
    let genderType = 0;
    if (radioBtnName === "female") {
      genderType = 2;
    } else if (radioBtnName === "male") {
      genderType = 1;
    } else if (radioBtnName === "gender") {
      genderType = 0;
    }
    dispatch(setGenderType(genderType));
  };

  return (
    <ItemDiv>
      <Font>축종</Font>
      <ContentDiv>
        <Label>
          <StyledCheckbox
            name="animal"
            value="allAnimal"
            checked={inputAnimal === "animal"}
            onClick={() => handleClickRadioButtonAnimal("animal")}
          />
          <Font2 onClick={() => handleClickRadioButtonAnimal("animal")}>
            전체
          </Font2>
        </Label>
        <Label>
          <StyledCheckbox
            name="animal"
            value="dog"
            checked={inputAnimal === "dog"}
            onClick={() => handleClickRadioButtonAnimal("dog")}
          />
          <Font2 onClick={() => handleClickRadioButtonAnimal("dog")}>개</Font2>
        </Label>
        <Label>
          <StyledCheckbox
            name="animal"
            value="cat"
            checked={inputAnimal === "cat"}
            onClick={() => handleClickRadioButtonAnimal("cat")}
          />
          <Font2 onClick={() => handleClickRadioButtonAnimal("cat")}>
            고양이
          </Font2>
        </Label>
      </ContentDiv>
      <DivisionLine />
      <Font>성별</Font>
      <ContentDiv>
        <Label>
          <StyledCheckbox
            name="gender"
            value="allGender"
            checked={inputGender === "gender"}
            onClick={() => handleClickRadioButtonGender("gender")}
          />
          <Font2 onClick={() => handleClickRadioButtonGender("gender")}>
            전체
          </Font2>
        </Label>
        <Label>
          <StyledCheckbox
            name="gender"
            value="male"
            checked={inputGender === "male"}
            onClick={() => handleClickRadioButtonGender("male")}
          />
          <Font2 onClick={() => handleClickRadioButtonGender("male")}>
            수컷
          </Font2>
        </Label>
        <Label>
          <StyledCheckbox
            name="gender"
            value="female"
            checked={inputGender === "female"}
            onClick={() => handleClickRadioButtonGender("female")}
          />
          <Font2 onClick={() => handleClickRadioButtonGender("female")}>
            암컷
          </Font2>
        </Label>
      </ContentDiv>
    </ItemDiv>
  );
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
`;

const ContentDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  color: black;
  // text-right-padding: 0px;
`;
const Label = styled.span`
  display: flex;
  margin: 10px 20px 10px 0px;
  padding-left: 8px;
  font-size: 15px;
  align-items: center;
`;
const DivisionLine = styled.div`
  border-top: 1px solid #ccc;
`;
const Font = styled.div`
  padding-left: 35px;
  text-align: left;
  padding-top: 25px;
  // margin-top: 25px;
  font-size: 15px;
  font-weight: bold;
`;
const Font2 = styled.span`
  padding-left: 10px;
  text-align: left;
  font-size: 15px;
  // font-weight: bold;
`;
const StyledCheckbox = styled.input.attrs({ type: "radio" })`
  -webkit-appearance: none;
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
  outline: none !important;
  border: 2px solid #e8ebee;
  border-radius: 2px;
  background: white;

  &:checked {
    background-color: #535a61;
    border-color: #535a61;
    color: white;
  }
  &:checked::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 5px;
    width: 4px;
    height: 9px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;
