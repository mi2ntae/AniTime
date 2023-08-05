import http from "api/commonHttp";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MapComponent from "../components/Profile/MapComponent.jsx";
import { useNavigate } from "react-router";

export default function MissingRegist() {
  const [modal, setModal] = useState(false);
  const [dogorcat, setDogorcat] = useState(false);
  const [selectKind, setSelectKind] = useState(false);
  const [selectYear, setSelectYear] = useState(false);
  const [selectMonth, setSelectMonth] = useState(false);
  const [selectDay, setSelectDay] = useState(false);

  const yearList = [
    2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
    2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
    1999, 1998, 1997, 1996, 1995, 1994, 1993,
  ];
  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const dayList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const categoryClose = useRef();
  const kindClose = useRef();
  const yearClose = useRef();
  const monthClose = useRef();
  const dayClose = useRef();

  const handleNameKeyDown = (event) => {
    if (event.keyCode === 9) {
      event.preventDefault();
      event.target.blur();
      setDogorcat(true);
    }
  };
  const handleCategoryKeyDown = (event) => {
    if (event.keyCode === 9) {
      setDogorcat(false);
      setKind(true);
    }
  };

  const menuCloseHandler = ({ target }) => {
    if (!categoryClose.current.contains(target)) {
      setDogorcat(false);
    }
    if (!kindClose.current.contains(target)) {
      setSelectKind(false);
    }
    if (!yearClose.current.contains(target)) {
      setSelectYear(false);
    }
    if (!monthClose.current.contains(target)) {
      setSelectMonth(false);
    }
    if (!dayClose.current.contains(target)) setSelectDay(false);
  };

  useEffect(() => {
    window.addEventListener("click", menuCloseHandler);
    return () => {
      window.removeEventListener("click", menuCloseHandler);
    };
  });

  const [y, setY] = useState("");
  const [x, setX] = useState("");

  const getPosition = (y, x) => {
    setLat(y);
    setLon(x);
  };

  const [name, setName] = useState("");
  const [category, setCategory] = useState("축종");
  const [kind, setKind] = useState("품종");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [specialMark, setSpecialMark] = useState("");
  const [year, setYear] = useState("연도");
  const [month, setMonth] = useState("월");
  const [day, setDay] = useState("일");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [image, setImage] = useState(null);
  const [imageurl, setImageurl] = useState(null);

  const fileInputRef = useRef(null);

  let general = useSelector((state) => state.member);

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
            console.log("주소 변환 실패");
          }
        }
      );
    };

    getAddressFromLatLng(lat, lon);
  }, [lat, lon]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setY(position.coords.latitude);
          setX(position.coords.longitude);
        },
        function (error) {
          setY(37.5012860931305);
          setX(127.039604663862);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      setY(37.5012860931305);
      setX(127.039604663862);
    }
  }, [modal]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

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
    if (category === "축종" || kind === "품종") {
      alert("품종은 필수 입력 항목입니다.");
      return;
    }
    if (gender === "") {
      alert("성별은 필수 입력 항목입니다.");
      return;
    }
    if (year === "연도" || month === "월" || day === "일") {
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
    };
    console.log(profile);
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
        console.log("success");
        navigate("/missing");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const kindList = () => {
    if (category === "개") {
      return [
        "골든 리트리버",
        "그레이 하운드",
        "그레이트 피레니즈",
        "노퍽테리어믹스인듯",
        "닥스훈트",
        "달마시안",
        "도고 까니리오",
        "도베르만",
        "도사",
        "도사 믹스견",
        "동경견",
        "라브라도 리트리버",
        "라이카",
        "로트와일러",
        "로트와일러 믹스견",
        "리트리버와 웰시코기믹스로보임",
        "마리노이즈",
        "말라뮤트",
        "말라뮤트 믹스견",
        "말티즈",
        "말티푸",
        "미니어쳐 슈나우저",
        "미니어쳐 푸들",
        "미니어쳐 핀셔",
        "미상",
        "믹스견",
        "발바리",
        "베들링턴 테리어",
        "보더 콜리",
        "보스턴 테리어",
        "불독",
        "브리타니 스파니엘",
        "블랙 셰퍼트",
        "블랙탄",
        "비글",
        "비숑 프리제",
        "빠삐용",
        "사모예드",
        "삽살개",
        "샤페이",
        "세터",
        "세퍼드믹스",
        "셔틀랜드 쉽독",
        "셰퍼드",
        "쉬나우저",
        "슈나우져",
        "스탠다드 푸들",
        "스피츠",
        "스피츠믹스견",
        "시바",
        "시바견믹스인듯",
        "시베리안 허스키",
        "시츄",
        "아메리칸 불독",
        "아메리칸 핏불 테리어",
        "아메리칸불리",
        "아이리쉬 세터",
        "아키다",
        "아키다믹스",
        "알라스칸 말라뮤트",
        "엄마는 노리치테리어",
        "오브차카",
        "올드 잉글리쉬 불독",
        "올드 잉글리쉬 쉽독",
        "요크셔 테리어",
        "울프독",
        "웰시 코기 카디건",
        "웰시 코기 펨브로크",
        "이탈리안 그레이 하운드",
        "잉글리쉬 세터",
        "잉글리쉬 포인터",
        "재패니즈 스피츠",
        "저먼 셰퍼드 독",
        "저먼 포인터",
        "제주개",
        "진도견",
        "진도믹스견 추정",
        "차우차우",
        "치와와",
        "치와와믹스",
        "치와와믹스견",
        "캐벌리어 킹 찰스 스파니엘",
        "코카 스파니엘",
        "콜리",
        "토이 푸들",
        "퍼그",
        "페키니즈",
        "포메라니안",
        "포메라니안+스피츠=폼피츠",
        "포인터",
        "폼피츠",
        "푸들",
        "푸들믹스",
        "풍산견",
        "프렌치 불독",
        "플랫 코티드 리트리버",
        "핏불테리어",
        "핏불테리어 믹스견",
        "호피견",
        "화이트테리어",
        "휘펫",
      ];
    } else if (category === "고양이") {
      return [
        "고양이",
        "기타믹스",
        "노르웨이 숲",
        "러시안 블루",
        "레그돌",
        "먼치킨",
        "믹스묘",
        "벵갈",
        "봄베이",
        "브리티시 쇼트헤어",
        "샴",
        "스코티시폴드",
        "스핑크스",
        "아메리칸 쇼트헤어",
        "아메리칸 컬",
        "아비시니안",
        "이그조틱",
        "터키시 앙고라",
        "페르시안",
        "페르시안-페르시안 친칠라",
        "품종묘 추정",
        "한국 고양이",
        "히말라얀고양이",
      ];
    } else {
      return ["축종을 먼저 선택해주세요"];
    }
  };

  function handleRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.classList.add("ripple");

    button.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  }

  return (
    <div className="wrap">
      {modal && <div className="overlay" />}
      {/* display: block --- 가로행 전부 차지
            float는 붕 띄워서 왼쪽정렬, clear:both로 그 다음에 주면 정렬
            position: relative 후 top bottom left right로 좌표 이동
            부모에 position:relative 후 자식에 position:absolute하면 부모태그 기준으로 앋ㅎㅇ
            반응형 만드려면 width %와 max-width(=실제 content의 영역, 패딩 미포함) 설정
            패딩 보더 포함시키려면 box-sizing: border-box
            normalize.css
            343 패딩 16씩 */}
      <div className="container">
        <h2 className="title">실종동물등록</h2>
        <div className="essential-field">
          <span className="red">*</span>
          <span className="darkgrey">는 필수 입력 항목입니다</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="profile-info">
              <div className="small-title">실종동물 정보</div>
              <div className="input-field">
                <label className="label-area" htmlFor="name">
                  이름<span className="red">*</span>
                </label>
                <input
                  className="input-area"
                  type="text"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                  onKeyDown={handleNameKeyDown}
                />
              </div>

              <div className="input-field">
                <label className="label-area" htmlFor="profileKind">
                  품종<span className="red">*</span>
                </label>
                <div className="select-field">
                  <div
                    className="select-box"
                    onClick={() => {
                      setDogorcat(!dogorcat);
                    }}
                    style={
                      dogorcat
                        ? { border: "1px solid var(--primary, #3994f0)" }
                        : { border: "0.77px solid var(--lightgrey, #e8ebee)" }
                    }
                    ref={categoryClose}
                  >
                    <div className="selected">
                      <div
                        className="selected-value"
                        style={
                          category === "축종"
                            ? { color: "var(--grey-2, #A7AEB4)" }
                            : { color: "color: var(--blackgrey, #35383B)" }
                        }
                      >
                        {category}
                      </div>
                      <div className="selected-arrow">
                        <img src="/icons/ic_arrow_select.svg" />
                      </div>
                    </div>
                    {dogorcat && (
                      <ul className="option-box-container">
                        <li
                          className="option-box-element"
                          onClick={() => {
                            setCategory("개");
                            setKind("품종");
                          }}
                        >
                          개
                        </li>
                        <li
                          className="option-box-element"
                          onClick={() => {
                            setCategory("고양이");
                            setKind("품종");
                          }}
                        >
                          고양이
                        </li>
                      </ul>
                    )}
                  </div>
                  <div
                    className="select-box"
                    onClick={() => {
                      setSelectKind(!selectKind);
                    }}
                    style={
                      selectKind
                        ? { border: "1px solid var(--primary, #3994f0)" }
                        : { border: "0.77px solid var(--lightgrey, #e8ebee)" }
                    }
                    ref={kindClose}
                  >
                    <div className="selected">
                      <div
                        className="selected-value"
                        style={
                          kind === "품종"
                            ? { color: "var(--grey-2, #A7AEB4)" }
                            : { color: "color: var(--blackgrey, #35383B)" }
                        }
                      >
                        {kind}
                      </div>
                      <div className="selected-arrow">
                        <img src="/icons/ic_arrow_select.svg" />
                      </div>
                    </div>
                    {selectKind && (
                      <ul className="option-box-container">
                        {kindList().map((whichKind, index) => (
                          <li
                            key={index}
                            className="option-box-element"
                            onClick={() => {
                              setKind(whichKind);
                            }}
                          >
                            {whichKind}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="input-field">
                <label className="label-area" htmlFor="gender">
                  성별<span className="red">*</span>
                </label>
                <div className="radio-field">
                  <input
                    type="radio"
                    id="F"
                    name="gender"
                    value="F"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="F">암컷</label>
                  <input
                    type="radio"
                    id="M"
                    name="gender"
                    value="M"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="M">수컷</label>
                </div>
              </div>
              <div className="input-field">
                <label className="label-area" htmlFor="profileAge">
                  출생연도
                </label>
                <input
                  className="input-area"
                  type="number"
                  value={age}
                  id="profileAge"
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="출생연도"
                />
              </div>
              <div className="input-field">
                <label className="label-area" htmlFor="weight">
                  몸무게(kg)
                </label>
                <input
                  className="input-area"
                  type="number"
                  value={weight}
                  id="weight"
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="몸무게(kg)"
                />
              </div>
              <div className="input-field">
                <label className="label-area" htmlFor="specialMark">
                  성격 및 기타
                </label>
                <input
                  className="input-area"
                  type="text"
                  value={specialMark}
                  id="specialMark"
                  onChange={(e) => setSpecialMark(e.target.value)}
                  placeholder="성격 및 기타"
                />
              </div>
              <div className="input-field">
                <label className="label-area" htmlFor="dateAt">
                  실종일<span className="red">*</span>
                </label>
                <div className="select-field">
                  <div
                    className="select-box"
                    onClick={() => {
                      setSelectYear(!selectYear);
                    }}
                    style={
                      selectYear
                        ? { border: "1px solid var(--primary, #3994f0)" }
                        : { border: "0.77px solid var(--lightgrey, #e8ebee)" }
                    }
                    ref={yearClose}
                  >
                    <div className="selected">
                      <div
                        className="selected-value"
                        style={
                          year === "연도"
                            ? { color: "var(--grey-2, #A7AEB4)" }
                            : { color: "color: var(--blackgrey, #35383B)" }
                        }
                      >
                        {year}
                      </div>
                      <div className="selected-arrow">
                        <img src="/icons/ic_arrow_select.svg" />
                      </div>
                    </div>
                    {selectYear && (
                      <ul className="option-box-container">
                        {yearList.map((whichYear, index) => (
                          <li
                            key={index}
                            className="option-box-element"
                            onClick={() => {
                              setYear(whichYear);
                            }}
                          >
                            {whichYear}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div
                    className="select-box"
                    onClick={() => {
                      setSelectMonth(!selectMonth);
                    }}
                    style={
                      selectMonth
                        ? { border: "1px solid var(--primary, #3994f0)" }
                        : { border: "0.77px solid var(--lightgrey, #e8ebee)" }
                    }
                    ref={monthClose}
                  >
                    <div className="selected">
                      <div
                        className="selected-value"
                        style={
                          month === "월"
                            ? { color: "var(--grey-2, #A7AEB4)" }
                            : { color: "color: var(--blackgrey, #35383B)" }
                        }
                      >
                        {month}
                      </div>
                      <div className="selected-arrow">
                        <img src="/icons/ic_arrow_select.svg" />
                      </div>
                    </div>
                    {selectMonth && (
                      <ul className="option-box-container">
                        {monthList.map((whichMonth, index) => (
                          <li
                            key={index}
                            className="option-box-element"
                            onClick={() => {
                              setMonth(whichMonth);
                            }}
                          >
                            {whichMonth}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div
                    className="select-box"
                    onClick={() => {
                      setSelectDay(!selectDay);
                    }}
                    style={
                      selectDay
                        ? { border: "1px solid var(--primary, #3994f0)" }
                        : { border: "0.77px solid var(--lightgrey, #e8ebee)" }
                    }
                    ref={dayClose}
                  >
                    <div className="selected">
                      <div
                        className="selected-value"
                        style={
                          day === "일"
                            ? { color: "var(--grey-2, #A7AEB4)" }
                            : { color: "color: var(--blackgrey, #35383B)" }
                        }
                      >
                        {day}
                      </div>
                      <div className="selected-arrow">
                        <img src="/icons/ic_arrow_select.svg" />
                      </div>
                    </div>
                    {selectDay && (
                      <ul className="option-box-container">
                        {dayList.map((whichDay, index) => (
                          <li
                            key={index}
                            className="option-box-element"
                            onClick={() => {
                              setDay(whichDay);
                            }}
                          >
                            {whichDay}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label className="label-area" htmlFor="profileLocation">
                  실종위치
                  <span className="red">*</span>
                </label>
                {/* <input
                  className="input-area"
                  type="text"
                  value={location}
                  id="profileLocation"
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="실종위치"
                /> */}
                <div
                  className="location-area"
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
                </div>
              </div>
            </div>
            <div className="profile-img">
              <div className="small-title">사진</div>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div
                className="image"
                onClick={handleImageClick}
                style={{
                  background: imageurl
                    ? `url(${imageurl}) no-repeat center/cover`
                    : `url("/img_non_selected.png") no-repeat center/cover`,
                }}
              />
              <div className="image-desc">사진 사이즈는 어쩌고</div>
            </div>
          </div>

          <div className="btn-field">
            <button
              className="submit-btn"
              type="submit"
              onClick={handleRippleEffect}
            >
              실종 정보 등록
            </button>
          </div>
        </form>
        {/* <form className="inputForm" onSubmit={handleSearch}>
          <input
            placeholder="검색어를 입력하세요"
            onChange={onChange}
            value={inputText}
          />
          <button type="submit">검색</button>
        </form> */}
        {modal && (
          <MapComponent
            y={y}
            x={x}
            setModal={setModal}
            getPosition={getPosition}
          />
        )}
        {/* <MapComponent
          lat={lat}
          lon={lon}
          getPosition={getPosition}
          style={{ display: modal ? "block" : "none" }}
        /> */}
      </div>

      <style jsx="true">{`
        .wrap {
          display: flex;
          justify-content: center;
          margin-top: 96px;
          margin-bottom: 40px;
        }
        .container {
          width: 68%;
          min-width: 343px;
          border-radius: 8px;
          border: 1px solid var(--lightgrey, #e8ebee);
          position: relative;
          padding: 80px;
        }
        .title {
          text-align: left;
          margin: 0;
        }
        .essential-field {
          font-size: 14px;
          text-align: right;
          margin-bottom: 60px;
        }
        .input-container {
          margin: 0;
          display: flex;
          font-size: 14px;
        }
        .profile-info {
          flex: 4;
          align-items: center;
          max-width: 100%;
        }
        .profile-img {
          flex: 1;
          max-width: 100%;
        }
        .input-field {
          display: flex;
          margin-top: 16px;
          flex-direction: row;
          align-items: center;
          width: 100%;
        }
        .label-area {
          //   flex-grow: 1;
          width: 100px;
          text-align: left;
          font-size: 14px;
          color: var(--grey-2, #a7aeb4);
          height: 50px;
          line-height: 50px;
        }
        .input-area {
          width: 86%;
          //   flex-grow: 7;
          background-color: var(--lightestgrey, #f7f8fa);
          border: 0.77px solid var(--lightgrey, #e8ebee);
          border-radius: 12px;
          height: 50px;
          box-sizing: border-box;
          padding-left: 24px;
          margin-right: 6%;
          color: #35383b;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input::placeholder {
          color: #a7aeb4;
        }
        .location-area {
          width: 86%;
          //   flex-grow: 7;
          background-color: var(--lightestgrey, #f7f8fa);
          // border: 0.77px solid var(--lightgrey, #e8ebee);
          border-radius: 12px;
          height: 50px;
          box-sizing: border-box;
          padding-left: 24px;
          margin-right: 6%;
          vertical-align: middle;
          display: flex;
          align-items: center;
          font-size: 14px;
        }
        .select-field {
          width: 86%;
          //   flex-grow: 7;
          display: flex;
          margin: 0px 6% 0px 0px;
          // cursor: pointer;
          text-align: left;
          // /* 말줄임 */
          // white-space: nowrap;
          // text-overflow: ellipsis;
          // overflow: hidden;
          gap: 8px;
          flex-wrap: nowrap;
        }
        .select-box {
          flex: 1;
          background-color: var(--lightestgrey, #f7f8fa);
          // border: 0.77px solid var(--lightgrey, #e8ebee);
          border-radius: 12px;
          height: 50px;
          box-sizing: border-box;
          padding-left: 24px;
          display: flex;
          // justify-content: space-between;
          position: relative;
          max-width: 50%;
          flex-shrink: 0;
        }
        .selected {
          display: flex;
          flex-direction: row;
          flex: 1;
          // justify-content: space-between;
          align-items: center;
        }
        .selected-value {
          color: var(--grey-2, #a7aeb4);
          font-size: 14px;
          font-weight: 400;
          flex: 1;
          text-align: left;
          // margin-left: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .selected-arrow {
          margin-right: 16px;
        }
        .option-box-container {
          list-style-type: none;
          margin: 0px;

          background-color: var(--lightestgrey, #f7f8fa);
          border: 0.77px solid var(--lightgrey, #e8ebee);
          border-radius: 12px;
          // height: 50px;
          box-sizing: border-box;
          // padding: 0px 8px 0px 8px;
          padding: 0;
          position: absolute;
          cursor: pointer;
          top: 58px;
          left: 0px;
          flex-direction: column;
          width: 100%;
          align-items: center;
          max-height: 300px;
          overflow-y: auto;
          animation: revealFromTop 0.5s forwards;
          z-index: 555;
        }
        .option-box-container::-webkit-scrollbar {
          display: none;
        }
        .option-box-element {
          display: flex;
          width: 100%;
          align-items: center;
          height: 45px;
          padding: 0px 24px 0px 24px;
          box-sizing: border-box;
          overflow-y: auto;
        }
        .option-box-element:hover {
          background-color: #e8ebee;
        }
        .radio-field {
          width: 86%;
          margin: 0px 6% 0px 0px;
          line-height: 50px;
        }

        .radio-field input[type="radio"] {
          display: none; /* 라디오 버튼을 숨깁니다. */
        }

        .radio-field label {
          position: relative;
          padding-left: 28px; /* 텍스트와 커스텀 라디오 버튼 사이의 간격을 조정합니다. */
          margin-right: 40px; /* 각 라디오 버튼 항목 사이의 간격을 조정합니다. */
          cursor: pointer;
          color: var(--darkgrey, #7d848a);
          font-size: 14px;
        }

        .radio-field label:before {
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

        .radio-field input[type="radio"]:checked + label:after {
          content: "";
          position: absolute;
          left: 11px;
          top: 50%;
          transform: translate(-50%, -50%) scale(0); /* 초기 상태는 중앙에서 시작하며 크기는 0입니다. */
          width: 14px;
          height: 14px;
          background-color: #3994f0;
          border-radius: 50%;
          animation: scaleUp 0.3s forwards; /* 애니메이션을 적용합니다. */
        }

        .radio-field input[type="radio"]:checked + label {
          color: var(--darkestgrey, #535a61);
        }

        /* 애니메이션 효과를 정의합니다. */
        @keyframes scaleUp {
          to {
            transform: translate(-50%, -50%) scale(1);
          }
        }

        // .radio-field label {
        //   display: inline-block;
        //   margin-right: 16px;
        //   position: relative;
        //   padding-left: 28px; /* 텍스트와 커스텀 라디오 사이의 간격을 조정하기 위한 값 */
        //   cursor: pointer;
        // }
        // .radio-field label::before {
        //   content: "";
        //   position: absolute;
        //   left: 0;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   width: 20px;
        //   height: 20px;
        //   border: 1px solid #e8ebee;
        //   background-color: white;
        //   border-radius: 50%;
        //   box-sizing: border-box;
        // }
        // .radio-field input[type="radio"]:checked + label::before {
        //   width: 14px;
        //   height: 14px;
        //   // border: 1px solid #e8ebee;
        //   background-color: white;
        //   background-image: radial-gradient(#3994f0 7px, transparent 2px),
        //     radial-gradient(white 2px, transparent 7px);
        //   opacity: 1;
        //   animation: expandCircle 0.3s forwards;
        // }

        // .radio-field input[type="radio"] {
        //   display: none;
        // }
        // @keyframes expandCircle {
        //   0% {
        //     transform: scale(0);
        //   }
        //   100% {
        //     transform: scale(1);
        //   }
        // }
        // [type="radio"] {
        //   vertical-align: middle;
        //   appearance: none;
        //   border: 1px solid var(--lightgrey, #e8ebee);
        //   border-radius: 50%;
        //   width: 20px;
        //   height: 20px;
        // }
        // [type="radio"]:checked {
        //   border: 1px solid var(--lightgrey, #e8ebee);
        //   border: 3px solid white;
        //   background: var(--primary, #3994f0);
        // }
        .select-area {
          flex-grow: 1;
          background-color: var(--lightestgrey, #f7f8fa);
          border: 0.77px solid var(--lightgrey, #e8ebee);
          border-radius: 12px;
          height: 50px;
          box-sizing: border-box;
          padding-left: 24px;
        }
        .input-area:focus {
          border: 1px solid var(--primary, #3994f0);
          outline: none;
        }
        .red {
          color: var(--red, #ff7676);
        }
        .darkgrey {
          color: var(--darkgrey, #7d848a);
        }
        .small-title {
          text-align: left;
          font-size: 16px;
          color: var(--blackgrey, #35383b);
          font-weight: 700;
          margin-bottom: 24px;
        }
        .image {
          // height: 186px;
          aspect-ratio: 1/1;
          background-color: var(--lightestgrey, #f7f8fa);
          border-radius: 12px;
          border: 0.77px solid var(--lightgrey, #e8ebee);
          //   background-image: url("/img_add_photo.png");
          background-size: 50%;
          background-repeat: no-repeat;
          background-position: center;
        }
        .image-desc {
          color: var(--grey-2, #a7aeb4);
          font-size: 12px;
          text-align: left;
          margin-top: 10px;
        }
        .btn-field {
          margin-top: 64px;
          text-align: center;
        }
        .submit-btn {
          margin: auto;
          width: 280px;
          height: 50px;
          border-radius: 12px;
          background-color: var(--primary, #3994f0);
          color: white;
          font-size: 16px;
          font-weight: 700;
          border: none;
          position: relative;
          overflow: hidden;
          transform: translate3d(0, 0, 0);
        }
        /* 리플 애니메이션 스타일 */
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6); /* 리플 색상 */
          transform: scale(0);
          animation: ripple-animation 0.5s linear;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        MapComponent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.28);
          pointer-events: none; /* 클릭 이벤트를 무시하도록 설정 */
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.28);
          pointer-events: none; /* 클릭 이벤트를 무시하도록 설정 */
          z-index: 998;
        }
        @keyframes revealFromTop {
          from {
            clip-path: polygon(0 0, 100% 0, 100% 0%, 0 0%);
            opacity: 0.5;
          }
          to {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
