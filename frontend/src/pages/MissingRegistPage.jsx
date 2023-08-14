import { Button } from "@mui/material";
import http from "api/commonHttp";
import MapComponent from "components/Profile/MapComponent";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { keyframes, styled } from "styled-components";
import {
  WriteContainer,
  WriteTitle,
  Row,
  InputLabel,
  Input,
  Red,
  MainContainer,
} from "styled/styled";
import SelectBox from "components/Profile/SelectBox";
import DescModal from "components/Profile/DescModal";

export default function MissingRegistPage() {
  const general = useSelector((state) => state.member);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [kind, setKind] = useState("");
  const [gender, setGender] = useState("F");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [specialMark, setSpecialMark] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [image, setImage] = useState(null);
  const [imageurl, setImageurl] = useState(null);

  // select box 클릭시 border 생기는 처리
  // const [kindBoxClicked, setKindBoxClicked] = useState(false);
  // const [yearBoxClicked, setYearBoxClicked] = useState(false);
  // const [monthBoxClicked, setMonthBoxClicked] = useState(false);
  // const [dayBoxClicked, setDayBoxClicked] = useState(false);
  // // select box 이외의 영역 클릭시 닫히는 처리
  // const kindBoxClose = useRef();
  // const yearBoxClose = useRef();
  // const monthBoxClose = useRef();
  // const dayBoxClose = useRef();
  // const selectBoxCloseHandler = ({ target }) => {
  //   if (!kindBoxClose.current.contains(target)) setKindBoxClicked(false);
  //   if (!yearBoxClose.current.contains(target)) setYearBoxClicked(false);
  //   if (!monthBoxClose.current.contains(target)) setMonthBoxClicked(false);
  //   if (!dayBoxClose.current.contains(target)) setDayBoxClicked(false);
  // };
  // useEffect(() => {
  //   window.addEventListener("click", selectBoxCloseHandler);
  //   return () => {
  //     window.removeEventListener("click", selectBoxCloseHandler);
  //   };
  // });

  const kindData = ["개", "고양이"];

  // 연-월-일 데이터
  const currentYear = new Date().getFullYear();
  const yearData = [];
  for (let i = currentYear; i >= currentYear - 30; i--) {
    yearData.push(i);
  }
  const monthData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const dayDataFor28 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
  ];
  const dayDataFor29 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29,
  ];
  const dayDataFor30 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const dayDataFor31 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const [dayData, setDayData] = useState([]);

  useEffect(() => {
    if (day !== "") {
      if (
        (day === 30 && month === 2) ||
        (day === 29 && month === 2 && year % 4 !== 0)
      )
        setDay("");
      if (
        day === 31 &&
        (month === 2 ||
          month === 4 ||
          month === 6 ||
          month === 9 ||
          month === 11)
      )
        setDay("");
    }
    if (month === 2 && year % 4 === 0) setDayData(dayDataFor29);
    else if (month === 2) setDayData(dayDataFor28);
    else if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    )
      setDayData(dayDataFor31);
    else setDayData(dayDataFor30);
  }, [month, year]);

  // 위치검색 모달 띄우는 여부
  const [modal, setModal] = useState(false);

  // 지도검색 관련

  const getPosition = (y, x) => {
    setLat(y);
    setLon(x);
  };

  useEffect(() => {
    if (lat === "" || lon === "") return;
    const getAddressFromLatLng = (lat, lng) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const latlng = new window.kakao.maps.LatLng(lat, lng);

      geocoder.coord2Address(
        latlng.getLng(),
        latlng.getLat(),
        (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            setLocation(address);
          } else {
            // console.log("주소 변환 실패");
          }
        }
      );
    };

    getAddressFromLatLng(lat, lon);
  }, [lat, lon]);

  const imageInputRef = useRef();
  const handleimageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("이미지 형식의 파일만 등록 가능합니다.");
      return;
    }
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageurl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === "") {
      alert("이름은 필수 입력 항목입니다.");
      return;
    }
    if (category === "" || kind === "") {
      alert("품종은 필수 입력 항목입니다.");
      return;
    }
    if (gender === "") {
      alert("성별은 필수 입력 항목입니다.");
      return;
    }
    if (year === "" || month === "" || day === "") {
      alert("실종일은 필수 입력 항목입니다.");
      return;
    }
    if (location === "") {
      alert("실종위치는 필수 입력 항목입니다.");
      return;
    }

    const profile = {
      generalNo: general.memberNo,
      profileName: name,
      profileKind: category,
      detailKind: kind,
      sexCode: gender,
      profileAge: age,
      specialMark: specialMark,
      year: year,
      month: month,
      day: day,
      profileLocation: location,
      lat: lat,
      lon: lon,
      weight: weight,
    };
    const profileJSON = JSON.stringify(profile);
    const formData = new FormData();
    formData.append("profile", profileJSON);
    formData.append("image", image);

    http
      .post(`profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log("success");
        navigate("/missing");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <MainContainer>
      <WriteContainer>
        <h2 style={{ textAlign: "left", margin: 0 }}>실종동물등록</h2>
        <div
          style={{
            fontSize: "14px",
            textAlign: "right",
            marginBottom: "60px",
            color: "var(--darkgrey, #7d848a)",
          }}
        >
          <Red>*</Red>
          <span className="darkgrey">는 필수 입력 항목입니다</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: 0, display: "flex", gap: "56px" }}>
            <div style={{ flex: 4, alignItems: "center", maxWidth: "100%" }}>
              <WriteTitle>실종동물 정보</WriteTitle>
              <Row>
                <InputLabel htmlFor="title">
                  이름<Red>*</Red>
                </InputLabel>
                <Input
                  type="text"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="category">
                  품종<Red>*</Red>
                </InputLabel>
                <SelectBox
                  items={kindData}
                  placeholder="품종"
                  setValue={setCategory}
                />
                <Input
                  type="text"
                  value={kind}
                  onChange={(e) => setKind(e.target.value)}
                  placeholder="품종"
                />
              </Row>
              <Row>
                <InputLabel>
                  성별<Red>*</Red>
                </InputLabel>
                <RadioBox>
                  <input
                    type="radio"
                    id="F"
                    name="gender"
                    value="F"
                    onChange={(e) => setGender((prev) => e.target.value)}
                    checked={gender === "F"}
                  />
                  <label htmlFor="F">암컷</label>
                  <input
                    type="radio"
                    id="M"
                    name="gender"
                    value="M"
                    onChange={(e) => setGender((prev) => e.target.value)}
                    checked={gender === "M"}
                  />
                  <label htmlFor="M">수컷</label>
                </RadioBox>
              </Row>
              <Row>
                <InputLabel htmlFor="age">
                  출생연도<Red>*</Red>
                </InputLabel>
                <Input
                  type="number"
                  value={age}
                  id="age"
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="출생연도"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="weight">몸무게</InputLabel>
                <Input
                  type="number"
                  value={weight}
                  id="weight"
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="몸무게(kg)"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="specialMark">성격 및 기타</InputLabel>
                <Input
                  type="text"
                  value={specialMark}
                  id="specialMark"
                  onChange={(e) => setSpecialMark(e.target.value)}
                  placeholder="성격 및 기타"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="year">
                  실종일<Red>*</Red>
                </InputLabel>
                <SelectBox
                  items={yearData}
                  placeholder="연도"
                  setValue={setYear}
                />
                <SelectBox
                  items={monthData}
                  placeholder="월"
                  setValue={setMonth}
                />
                <SelectBox items={dayData} placeholder="일" setValue={setDay} />
              </Row>
              <Row>
                <InputLabel htmlFor="profileLocation">
                  실종위치<Red>*</Red>
                </InputLabel>
                <LocationInput
                  onClick={() => {
                    setModal(true);
                  }}
                  style={{
                    border: modal
                      ? "1px solid var(--primary, #3994f0)"
                      : "0.77px solid var(--lightgrey, #e8ebee)",
                  }}
                >
                  <span style={{ color: location ? "#35383B" : "#A7AEB4" }}>
                    {location ? location : "실종위치"}
                  </span>
                </LocationInput>
              </Row>
            </div>
            <div style={{ flex: 1, maxWidth: "100%" }}>
              <WriteTitle>사진</WriteTitle>
              <input
                ref={imageInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <div
                onClick={handleimageClick}
                style={{
                  background: imageurl
                    ? `url(${imageurl}) no-repeat center/cover`
                    : `url("/img_non_selected.png") no-repeat center/cover`,
                  aspectRatio: "1/1",
                  backgroundColor: "var(--lightestgrey, #f7f8fa)",
                  borderRadius: "12px",
                  border: "0.77px solid var(--lightgrey, #e8ebee)",
                  backgroundSize: "cover",
                }}
              />
              <div
                style={{
                  color: "var(--grey-2, #a7aeb4)",
                  fontSize: "12px",
                  textAlign: "left",
                  marginTop: "10px",
                }}
              >
                사진 사이즈는 어쩌고
              </div>
            </div>
          </div>
          <div style={{ marginTop: "64px", textAlign: "center" }}>
            <Button
              type="submit"
              style={{
                width: "280px",
                height: "50px",
                borderRadius: "12px",
                backgroundColor: "#3994f0",
                color: "white",
                fontSize: "16px",
                fontWeight: "700",
                border: "none",
                fontFamily: "nanumsquare",
              }}
            >
              실종동물 등록
            </Button>
          </div>
        </form>
      </WriteContainer>
      {modal && <MapComponent setModal={setModal} getPosition={getPosition} />}
      <DescModal />
    </MainContainer>
  );
}

const RadioBox = styled.div`
  width: 86%;
  margin: 0px 6% 0px 0px;
  line-height: 50px;

  input[type="radio"] {
    display: none;
  }

  label {
    position: relative;
    padding-left: 28px;
    margin-right: 40px;
    cursor: pointer;
    color: var(--darkgrey, #7d848a);
    font-size: 14px;
  }

  label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 1px solid #e8ebee;
    border-radius: 50%;
    background-color: transparent;
    color: var(--darkgrey, #7d848a);
    font-size: 14px;
  }

  input[type="radio"]:checked + label:after {
    content: "";
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 14px;
    height: 14px;
    background-color: #3994f0;
    border-radius: 50%;
    animation: ${keyframes`
    to {
      transform: translate(-50%, -50%) scale(1);
    }
  `} 0.3s forwards;
  }

  input[type="radio"]:checked + label {
    color: var(--darkestgrey, #535a61);
  }
`;
const LocationInput = styled.div`
  flex: 1;
  background-color: var(--lightestgrey, #f7f8fa);
  border-radius: 12px;
  height: 50px;
  box-sizing: border-box;
  padding-left: 24px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  font-size: 14px;
`;
