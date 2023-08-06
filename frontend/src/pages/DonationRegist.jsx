import http from "api/commonHttp";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { keyframes, styled } from "styled-components";

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

  let shelter = useSelector((state) => state.member);

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
    if (!file.type.startsWith("image/")) {
      alert("포스터는 이미지 형식의 파일만 등록할 수 있습니다.");
      return;
    }

    setPoster(file);
    setPosterName(file.name);
  };

  const [thumbnailurl, setThumbnailUrl] = useState("");
  const thumbnailInputRef = useRef();
  const handleThumbnailClick = () => {
    thumbnailInputRef.current.click();
  };
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("썸네일은 이미지 형식의 파일만 등록할 수 있습니다.");
      return;
    }

    setThumbnail(file);
    const reader = new FileReader();
    console.log("???????");
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
      startAt: sYear + "-" + sMonth + "-" + sDay,
      endAt: eYear + "-" + eMonth + "-" + eDay,
      goalAmount: goal,
    };

    const boardReq = JSON.stringify(board);
    console.log(board);
    const formData = new FormData();
    formData.append("donationBoardRegistReq", boardReq);
    formData.append("poster", poster);
    formData.append("image", thumbnail);

    http
      .post(`/donation/shelter/board`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/mypage");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "96px",
        marginBottom: "40px",
      }}
    >
      <Container>
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
              <Title>후원 정보</Title>
              <Row>
                <Label htmlFor="title">
                  공고 제목<Red>*</Red>
                </Label>
                <Input
                  type="text"
                  value={title}
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="공고제목"
                />
              </Row>
              <Row>
                <Label htmlFor="sDate">
                  공고시작일<Red>*</Red>
                </Label>
                <Input
                  type="number"
                  value={sYear}
                  id="sDate"
                  onChange={(e) => setSYear(e.target.value)}
                  placeholder="연도"
                />
                <Input
                  type="number"
                  value={sMonth}
                  onChange={(e) => setSMonth(e.target.value)}
                  placeholder="월"
                />
                <Input
                  type="number"
                  value={sDay}
                  onChange={(e) => setSDay(e.target.value)}
                  placeholder="일"
                />
              </Row>
              <Row>
                <Label htmlFor="eDate">
                  공고종료일<Red>*</Red>
                </Label>
                <Input
                  type="number"
                  value={eYear}
                  id="eDate"
                  onChange={(e) => setEYear(e.target.value)}
                  placeholder="연도"
                />
                <Input
                  type="number"
                  value={eMonth}
                  onChange={(e) => setEMonth(e.target.value)}
                  placeholder="월"
                />
                <Input
                  type="number"
                  value={eDay}
                  onChange={(e) => setEDay(e.target.value)}
                  placeholder="일"
                />
              </Row>
              <Row>
                <Label htmlFor="goal">
                  목표금액<Red>*</Red>
                </Label>
                <Input
                  type="number"
                  value={goal}
                  id="goal"
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="목표금액"
                />
              </Row>
              <Row>
                <Label htmlFor="poster">
                  포스터첨부<Red>*</Red>
                </Label>
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
                  {poster === null ? "파일을 선택해주세요." : posterName}
                </Poster>
                <button
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
                </button>
              </Row>
            </div>
            <div style={{ flex: 1, maxWidth: "100%" }}>
              <Title>썸네일</Title>
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
                  backgroundSize: "100%",
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
                사진 사이즈는 어쩌고
              </div>
            </div>
          </div>
          <div style={{ marginTop: "64px", textAlign: "center" }}>
            <button
              type="submit"
              //   onClick={handleRippleEffect}
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
              실종 정보 등록
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 68%;
  min-width: 343px;
  border-radius: 8px;
  border: 1px solid var(--lightgrey, #e8ebee);
  position: relative;
  padding: 80px;
`;

const Title = styled.div`
  text-align: left;
  font-size: 16px;
  color: var(--blackgrey, #35383b);
  font-weight: 700;
  margin-bottom: 24px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  width: 100%;
`;

const Label = styled.label`
  min-width: 100px;
  text-align: left;
  font-size: 14px;
  color: var(--grey-2, #a7aeb4);
  height: 50px;
  line-height: 50px;
`;

const Input = styled.input`
  flex: 1;
  width: 86%;
  background-color: var(--lightestgrey, #f7f8fa);
  border: 0.77px solid var(--lightgrey, #e8ebee);
  border-radius: 12px;
  height: 50px;
  box-sizing: border-box;
  padding-left: 24px;
  color: #35383b;
  outline: none;

  /* Spinner 숨기기 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  /* 클릭시 border color 변경 */
  &:focus {
    border: 1px solid #3994f0;
  }

  &::placeholder {
    color: #a7aeb4;
  }
`;
const Poster = styled.div`
  flex: 5;
  width: 86%;
  background-color: var(--lightestgrey, #f7f8fa);
  border: 0.77px solid var(--lightgrey, #e8ebee);
  border-radius: 12px;
  height: 50px;
  box-sizing: border-box;
  padding-left: 24px;
  color: var(--grey-2, #a7aeb4);
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
`;

const Red = styled.span`
  color: var(--red, #ff7676);
`;
