import { Button } from "@mui/material";
import http from "api/commonHttp";
import SelectBox from "components/Profile/SelectBox";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  WriteContainer,
  WriteTitle,
  Row,
  InputLabel,
  Input,
  Poster,
  Red,
  MainContainer,
} from "styled/styled";

export default function DonationRegist() {
  const [title, setTitle] = useState("");
  const [sYear, setSYear] = useState("");
  const [sMonth, setSMonth] = useState("");
  const [sDay, setSDay] = useState("");
  const [eYear, setEYear] = useState("");
  const [eMonth, setEMonth] = useState("");
  const [eDay, setEDay] = useState("");
  const [goal, setGoal] = useState("");
  const [poster, setPoster] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const formatNumberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current.type = "number";
  };

  const handleBlur = () => {
    setIsFocused(false);
    inputRef.current.type = "text";
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    // 입력값이 int 범위를 초과하면 setGoal을 호출하지 않습니다.
    if (newValue <= 2147483647 && newValue >= -2147483648) {
      setGoal(newValue);
    }
  };

  const displayValue =
    isFocused || !goal ? goal : formatNumberWithCommas(goal) + " 원";

  let shelter = useSelector((state) => state.member);
  useEffect(() => {
    if (shelter.memberKind === 0) {
      alert("잘못된 접근입니다.");
      navigate("/donation");
    }
  }, []);

  const navigate = useNavigate();

  const [posterName, setPosterName] = useState("");
  const posterInputRef = useRef();
  const handlePosterClick = (event) => {
    event.preventDefault();
    posterInputRef.current.click();
  };
  const handlePosterChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    var maxSize = 10 * 1024 * 1024;
    var fileSize = file.size;

    if (fileSize > maxSize) {
      alert("파일 사이즈는 10MB 이내로 등록 가능합니다.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("포스터는 이미지 형식의 파일만 등록할 수 있습니다.");
      return;
    }

    setPoster(file);
    setPosterName(file.name);
  };

  // 연-월-일 데이터
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  const yearData = [];
  for (let i = currentYear; i <= currentYear + 30; i++) {
    yearData.push(i);
  }
  const curYMonthData = [];
  for (let i = currentMonth; i <= 12; i++) {
    curYMonthData.push(i);
  }
  const curYDayData = [];
  if (
    currentMonth === 1 ||
    currentMonth === 3 ||
    currentMonth === 5 ||
    currentMonth === 7 ||
    currentMonth === 8 ||
    currentMonth === 10 ||
    currentMonth === 12
  ) {
    for (let i = currentDay; i <= 31; i++) {
      curYDayData.push(i);
    }
  } else if (
    currentMonth === 4 ||
    currentMonth === 6 ||
    currentMonth === 9 ||
    currentMonth === 11
  ) {
    for (let i = currentDay; i <= 30; i++) {
      curYDayData.push(i);
    }
  } else if (currentYear % 4 === 0) {
    for (let i = currentDay; i <= 29; i++) {
      curYDayData.push(i);
    }
  } else {
    for (let i = currentDay; i <= 28; i++) {
      curYDayData.push(i);
    }
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
  const [sDayData, setSDayData] = useState([]);
  const [sMonthData, setSMonthData] = useState([]);

  useEffect(() => {
    if (sDay !== "") {
      if (
        (sDay === 30 && sMonth === 2) ||
        (sDay === 29 && sMonth === 2 && sYear % 4 !== 0)
      )
        setSDay("");
      if (
        sDay === 31 &&
        (sMonth === 2 ||
          sMonth === 4 ||
          sMonth === 6 ||
          sMonth === 9 ||
          sMonth === 11)
      ) {
        setSDay("");
      }
    }
    if (sMonth === 2 && sYear % 4 === 0) setSDayData(dayDataFor29);
    else if (sMonth === 2) setSDayData(dayDataFor28);
    else if (
      sMonth === 1 ||
      sMonth === 3 ||
      sMonth === 5 ||
      sMonth === 7 ||
      sMonth === 8 ||
      sMonth === 10 ||
      sMonth === 12
    )
      setSDayData(dayDataFor31);
    else setSDayData(dayDataFor30);

    if (sYear === currentYear) setSMonthData(curYMonthData);
    else setSMonthData(monthData);
    if (sYear === currentYear && sMonth === currentMonth)
      setSDayData(curYDayData);

    if (sMonth < currentMonth && sYear === currentYear) {
      setSMonth("");
      setSDay("");
    }
    if (eYear < sYear) {
      setEYear("");
      setEMonth("");
      setEDay("");
    } else if (eYear === sYear && eMonth < sMonth) {
      setEMonth("");
      setEDay("");
    } else if (eYear === sYear && eMonth === sMonth && eDay <= sDay)
      setEDay("");

    if (sYear > currentYear) {
      const tempYearData = [];
      for (let i = sYear; i <= currentYear + 30; i++) {
        tempYearData.push(i);
      }
      setEYearData(tempYearData);
    } else setEYearData(yearData);

    if (sYear === eYear && sMonth === eMonth && sDay >= eDay) setEDay("");

    if (eYear === sYear) {
      const tempMonthData = [];
      for (let i = sMonth; i <= 12; i++) {
        tempMonthData.push(i);
      }
      setEMonthData(tempMonthData);
    } else setEMonthData(monthData);
  }, [sMonth, sYear]);

  useEffect(() => {
    if (sYear === eYear && sMonth === eMonth && sDay >= eDay) setEDay("");
    if (eYear === sYear && eMonth === sMonth) {
      const tempDayData = [];
      let endDay = 30;

      if (
        eMonth === 1 ||
        eMonth === 3 ||
        eMonth === 5 ||
        eMonth === 7 ||
        eMonth === 8 ||
        eMonth === 10 ||
        eMonth === 12
      )
        endDay = 31;
      else if (eMonth === 2 && eYear % 4 === 0) endDay = 29;
      else if (eMonth === 2) endDay = 28;

      for (let i = sDay + 1; i <= endDay; i++) {
        tempDayData.push(i);
      }
      setEDayData(tempDayData);
    }
  }, [sDay]);
  const [eDayData, setEDayData] = useState([]);

  const [eMonthData, setEMonthData] = useState([]);
  const [eYearData, setEYearData] = useState([]);

  useEffect(() => {
    if (eDay !== "") {
      if (
        (eDay === 30 && eMonth === 2) ||
        (eDay === 29 && eMonth === 2 && eYear % 4 !== 0)
      )
        setEDay("");
      if (
        eDay === 31 &&
        (eMonth === 2 ||
          eMonth === 4 ||
          eMonth === 6 ||
          eMonth === 9 ||
          eMonth === 11)
      )
        setEDay("");
    }
    if (eMonth === 2 && eYear % 4 === 0) setEDayData(dayDataFor29);
    else if (eMonth === 2) setEDayData(dayDataFor28);
    else if (
      eMonth === 1 ||
      eMonth === 3 ||
      eMonth === 5 ||
      eMonth === 7 ||
      eMonth === 8 ||
      eMonth === 10 ||
      eMonth === 12
    )
      setEDayData(dayDataFor31);
    else setEDayData(dayDataFor30);

    if (eYear === sYear) {
      const tempMonthData = [];
      for (let i = sMonth; i <= 12; i++) {
        tempMonthData.push(i);
      }
      setEMonthData(tempMonthData);
    } else setEMonthData(monthData);

    if (eYear === sYear && eMonth === sMonth) {
      const tempDayData = [];
      let endDay = 30; // let으로 변경

      if (
        eMonth === 1 ||
        eMonth === 3 ||
        eMonth === 5 ||
        eMonth === 7 ||
        eMonth === 8 ||
        eMonth === 10 ||
        eMonth === 12
      )
        endDay = 31;
      else if (eMonth === 2 && eYear % 4 === 0) endDay = 29;
      else if (eMonth === 2) endDay = 28;

      for (let i = sDay + 1; i <= endDay; i++) {
        tempDayData.push(i);
      }
      setEDayData(tempDayData);
    }

    if (eMonth < sMonth && eYear === sYear) {
      setEMonth("");
      setEDay("");
    }
  }, [eMonth, eYear]);

  const [thumbnailurl, setThumbnailUrl] = useState("");
  const thumbnailInputRef = useRef();
  const handleThumbnailClick = () => {
    thumbnailInputRef.current.click();
  };
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    var maxSize = 5 * 1024 * 1024;
    var fileSize = file.size;

    if (fileSize > maxSize) {
      alert("파일 사이즈는 5MB 이내로 등록 가능합니다.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("썸네일은 이미지 형식의 파일만 등록할 수 있습니다.");
      return;
    }

    setThumbnail(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title === "") {
      alert("공고 제목은 필수 입력 사항입니다.");
      return;
    }
    if (sYear === "" || sMonth == "" || sDay == "") {
      alert("공고 시작일은 필수 입력 사항입니다.");
      return;
    }
    if (eYear === "" || eMonth == "" || eDay == "") {
      alert("공고 종료일은 필수 입력 사항입니다.");
      return;
    }
    if (goal === "") {
      alert("목표 금액은 필수 입력 사항입니다.");
      return;
    }
    if (poster === "") {
      alert("포스터 이미지는 필수 입력 사항입니다.");
      return;
    }

    const board = {
      shelterNo: shelter.memberNo,
      title: title,
      syear: sYear,
      smonth: sMonth,
      sday: sDay,
      eyear: eYear,
      emonth: eMonth,
      eday: eDay,
      goalAmount: goal,
    };

    const boardReq = board;
    const formData = new FormData();
    formData.append(
      `donationBoardRegistReq`,
      new Blob([JSON.stringify(boardReq)]),
      { type: "application/json" }
    );

    formData.append("poster", poster);
    formData.append("image", thumbnail);

    http
      .post(`/donation/shelter/board`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("후원공고 등록이 완료되었습니다.");
        navigate("/mypage");
      });
    // .catch((error) => console.log(error));
  };
  return (
    <MainContainer>
      <WriteContainer>
        <h2 style={{ textAlign: "left", margin: 0 }}>후원공고등록</h2>
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
              <WriteTitle>후원 정보</WriteTitle>
              <Row>
                <InputLabel htmlFor="title">
                  공고 제목<Red>*</Red>
                </InputLabel>
                <Input
                  type="text"
                  value={title}
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="공고제목"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="sDate">
                  공고시작일<Red>*</Red>
                </InputLabel>
                <SelectBox
                  items={yearData}
                  placeholder="연도"
                  setValue={setSYear}
                />
                <SelectBox
                  items={sMonthData}
                  placeholder="월"
                  setValue={setSMonth}
                  initialSelectedItem={sMonth}
                />
                <SelectBox
                  items={sDayData}
                  placeholder="일"
                  setValue={setSDay}
                  initialSelectedItem={sDay}
                />
              </Row>
              <Row>
                <InputLabel htmlFor="eDate">
                  공고종료일<Red>*</Red>
                </InputLabel>
                <SelectBox
                  items={eYearData}
                  placeholder="연도"
                  setValue={setEYear}
                  initialSelectedItem={eYear}
                />
                <SelectBox
                  items={eMonthData}
                  placeholder="월"
                  setValue={setEMonth}
                  initialSelectedItem={eMonth}
                />
                <SelectBox
                  items={eDayData}
                  placeholder="일"
                  setValue={setEDay}
                  initialSelectedItem={eDay}
                />
              </Row>
              <Row>
                <InputLabel htmlFor="goal">
                  목표금액<Red>*</Red>
                </InputLabel>
                <Input
                  ref={inputRef}
                  value={displayValue}
                  id="goal"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="목표금액 (10억 원까지 입력 가능)"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="poster">
                  포스터첨부<Red>*</Red>
                </InputLabel>
                <input
                  type="file"
                  ref={posterInputRef}
                  style={{ display: "none" }}
                  onChange={handlePosterChange}
                />
                <Poster
                  onClick={handlePosterClick}
                  style={
                    poster === null
                      ? { color: "#A7AEB4" }
                      : { color: "#35383B" }
                  }
                >
                  {poster === null
                    ? "포스터는 10MB 이내의 jpg, png, gif 파일만 등록 가능합니다"
                    : posterName}
                </Poster>
                <Button
                  style={{
                    border: "1px solid var(--primary, #3994F0)",
                    background: "var(--white, #FFF)",
                    borderRadius: "12px",
                    color: "var(--primary, #3994F0)",
                    fontSize: "16px",
                    fontWeight: 700,
                    minWidth: "80px",
                    height: "50px",
                    flex: 2,
                  }}
                  onClick={handlePosterClick}
                >
                  파일 선택
                </Button>
              </Row>
            </div>
            <div style={{ flex: 1, maxWidth: "100%" }}>
              <WriteTitle>썸네일</WriteTitle>
              <input
                ref={thumbnailInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleThumbnailChange}
              />
              <div
                onClick={handleThumbnailClick}
                style={{
                  background: thumbnailurl
                    ? `url(${thumbnailurl}) no-repeat center/cover`
                    : `url("/img_non_selected.png") no-repeat center/cover`,
                  aspectRatio: "1/1",
                  backgroundColor: "var(--lightestgrey, #f7f8fa)",
                  borderRadius: "12px",
                  border: "0.77px solid var(--lightgrey, #e8ebee)",
                  backgroundSize: "cover",
                }}
              />
              <div
                className="image-desc"
                style={{
                  color: "var(--grey-2, #a7aeb4)",
                  fontSize: "12px",
                  textAlign: "left",
                  marginTop: "10px",
                }}
              >
                사진은 5MB 이내의 jpg, png, gif 파일만 등록 가능합니다.
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
              }}
            >
              후원 공고 등록
            </Button>
          </div>
        </form>
      </WriteContainer>
    </MainContainer>
  );
}
