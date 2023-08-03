import http from "api/commonHttp";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MapComponent from "../components/Profile/MapComponent.jsx";

export default function MissingRegist() {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(!modal);
  };

  const getPosition = (y, x) => {
    setLat(y);
    setLon(x);
  };

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [kind, setKind] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [specialMark, setSpecialMark] = useState("");
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("01");
  const [day, setDay] = useState("01");
  const [location, setLocation] = useState("실종위치");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [image, setImage] = useState(null);
  const [imageurl, setImageurl] = useState(null);

  const fileInputRef = useRef(null);

  let general = useSelector((state) => state.member);

  useEffect(() => {
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

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       setCurLat(position.coords.latitude);
  //       setCurLon(position.coords.longitude);
  //       console.log(curLat);
  //       console.log(curLon);
  //     },
  //     function (error) {
  //       console.error("Error occurred. Error code: " + error.code);
  //       setCurLat(37.50128068899183);
  //       setCurLon(127.03959900643017);
  //     },
  //     { enableHighAccuracy: true }
  //   );
  // }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const profile = {
      generalNo: general.memberNo,
      profileName: name,
      profileKind: "개",
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
    const profileJSON = JSON.stringify(profile);
    const formData = new FormData();

    // formData.append("profile[generalNo]", general.memberNo);
    // formData.append("profile[profileName]", name);
    // formData.append("profile[profileKind]", category);
    // formData.append("profile[detailKind]", kind);
    // formData.append("profile[sexCode]", gender);
    // formData.append("profile[profileAge]", age);
    // formData.append("profile[specialMark]", specialMark);
    // formData.append("profile[year]", year);
    // formData.append("profile[month]", month);
    // formData.append("profile[day]", day);
    // formData.append("profile[profileLocation]", location);
    // formData.append("profile[lat]", lat);
    // formData.append("profile[lon]", lon);
    formData.append("profile", profileJSON);
    formData.append("image", image);

    http
      .post("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("success");
        console.log(formData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                />
              </div>

              <div className="input-field">
                <label className="label-area" htmlFor="profileKind">
                  축종<span className="red">*</span>
                </label>
                <div className="select-field">
                  <select
                    className="select-area"
                    value={category}
                    id="profileKind"
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="축종"
                  >
                    <option>개</option>
                    <option>고양이</option>
                  </select>
                  <div className="blank-area" />
                  <select
                    className="select-area"
                    value={kind}
                    placeholder="품종"
                    onChange={(e) => setKind(e.target.value)}
                  >
                    <option>개</option>
                    <option>고양이</option>
                  </select>
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
                  만 나이
                </label>
                <input
                  className="input-area"
                  type="number"
                  value={age}
                  id="profileAge"
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="만 나이"
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
                  <select
                    className="select-area"
                    value={year}
                    id="dateAt"
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="연도"
                  >
                    <option></option>
                  </select>
                  <div className="blank-area" />
                  <select
                    className="select-area"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    placeholder="월"
                  >
                    <option></option>
                  </select>
                  <div className="blank-area" />
                  <select
                    className="select-area"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    placeholder="일"
                  >
                    <option></option>
                  </select>
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
                    showModal();
                  }}
                >
                  <span>{location}</span>
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
            <button className="submit-btn" type="submit">
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
          <MapComponent setModal={setModal} getPosition={getPosition} />
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
          flex-grow: 4;
          align-items: center;
        }
        .profile-img {
          flex-grow: 1;
        }
        .input-field {
          display: flex;
          margin-top: 16px;
          flex-direction: row;
          align-items: center;
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
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .location-area {
          width: 86%;
          //   flex-grow: 7;
          background-color: var(--lightestgrey, #f7f8fa);
          border: 0.77px solid var(--lightgrey, #e8ebee);
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
          cursor: pointer;
          text-align: left;
          /* 말줄임 */
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .radio-field {
          width: 86%;
          margin: 0px 6% 0px 0px;
          line-height: 50px;
        }
        [type="radio"] {
          vertical-align: middle;
          appearance: none;
          border: 1px solid var(--lightgrey, #e8ebee);
          border-radius: 50%;
          width: 20px;
          height: 20px;
        }
        [type="radio"]:checked {
          border: 1px solid var(--lightgrey, #e8ebee);
          border: 3px solid white;
          background: var(--primary, #3994f0);
        }
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
        }
        .blank-area {
          margin-left: 8px;
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
      `}</style>
    </div>
  );
}
