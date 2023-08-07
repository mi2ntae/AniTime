import React from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux/";
import {
  setDogChecked,
  setCatChecked,
  setKindType,
  setMaleChecked,
  setFemaleChecked,
  setGenderType,
  // setCheckedCnt,
} from "reducer/filterInfo";
export default function FilterItem() {
  const dispatch = useDispatch();
  let dogChecked = useSelector((state) => state.filterInfo.dogChecked);
  let catChecked = useSelector((state) => state.filterInfo.catChecked);
  let femaleChecked = useSelector((state) => state.filterInfo.femaleChecked);
  let maleChecked = useSelector((state) => state.filterInfo.maleChecked);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;

    if (value === "dog") {
      dogChecked = !dogChecked;
      dispatch(setDogChecked(dogChecked));
    } else if (value === "cat") {
      catChecked = !catChecked;
      dispatch(setCatChecked(catChecked));
    }
    let kindType = 0;

    // 개만 체크되어 있을 때
    if (dogChecked && !catChecked) {
      kindType = 1;
    }
    // 고양이만 체크되어 있을 때
    else if (!dogChecked && catChecked) {
      kindType = 2;
    }
    // 둘 다 체크 해제 되어있을 때
    else if (!dogChecked && !catChecked) {
      kindType = 3;
    }
    // 둘 다 체크되어 있을 때, 기본값
    else {
      kindType = 0;
    }
    dispatch(setKindType(kindType));

    if (value === "female") {
      femaleChecked = !femaleChecked;
      dispatch(setFemaleChecked(femaleChecked));
    } else if (value === "male") {
      maleChecked = !maleChecked;
      dispatch(setMaleChecked(maleChecked));
    }

    let genderType = 0;

    // 수컷만 체크되어 있을 때
    if (maleChecked && !femaleChecked) {
      genderType = 1;
    }
    // 암컷만 체크되어 있을 때
    else if (!maleChecked && femaleChecked) {
      genderType = 2;
    }
    // 둘 다 체크 해제 되어있을 때
    else if (!maleChecked && !femaleChecked) {
      genderType = 3;
    }
    // 둘 다 체크되어 있을 때, 기본값
    else {
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
            value="dog"
            checked={dogChecked}
            onChange={handleCheckboxChange}
          />
          <Font2>개</Font2>
        </Label>
        <Label>
          <StyledCheckbox
            name="animal"
            value="cat"
            checked={catChecked}
            onChange={handleCheckboxChange}
          />
          <Font2>고양이</Font2>
        </Label>
      </ContentDiv>
      <DivisionLine />
      <Font>성별</Font>
      <ContentDiv>
        <Label>
          <StyledCheckbox
            name="gender"
            value="male"
            checked={maleChecked}
            onChange={handleCheckboxChange}
          />
          <Font2>수컷</Font2>
        </Label>
        <Label>
          <StyledCheckbox
            name="gender"
            value="female"
            checked={femaleChecked}
            onChange={handleCheckboxChange}
          />
          <Font2>암컷</Font2>
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
  padding-left: 20px;
  font-size: 15px;
  align-items: center;
`;
const DivisionLine = styled.div`
  border-top: 1px solid #ccc;
`;
const Font = styled.div`
  padding-left: 35px;
  text-align: left;
  margin-top: 25px;
  font-size: 15px;
  font-weight: bold;
`;
const Font2 = styled.span`
  padding-left: 10px;
  text-align: left;
  font-size: 15px;
  // font-weight: bold;
`;
const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
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
