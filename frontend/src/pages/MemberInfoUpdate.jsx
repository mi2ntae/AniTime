import { Button } from "@mui/material";
// import http from "api/commonHttp";
// import { useRef, useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import {
  WriteContainer,
  WriteTitle,
  Row,
  InputLabel,
  Input,
  Red,
  MainContainer,
} from "styled/styled";

export default function DonationRegist() {
  //   const [title, setTitle] = useState("");
  //   const [sYear, setSYear] = useState("");
  //   const [sMonth, setSMonth] = useState("");
  //   const [sDay, setSDay] = useState("");
  //   const [eYear, setEYear] = useState("");
  //   const [eMonth, setEMonth] = useState("");
  //   const [eDay, setEDay] = useState("");
  //   const [goal, setGoal] = useState("");
  //   //   const [poster, setPoster] = useState(null);
  //   const [thumbnail, setThumbnail] = useState(null);

  let general = useSelector((state) => state.member);

  //   const navigate = useNavigate();

  //   //   const [posterName, setPosterName] = useState("");
  //   const posterInputRef = useRef();
  //   const handlePosterClick = (event) => {
  //     event.preventDefault();
  //     posterInputRef.current.click();
  //   };
  //   const handlePosterChange = (event) => {
  //     const file = event.target.files[0];
  //     if (!file) return;
  //     if (!file.type.startsWith("image/")) {
  //       alert("포스터는 이미지 형식의 파일만 등록할 수 있습니다.");
  //       return;
  //     }

  //     setPoster(file);
  //     setPosterName(file.name);
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();

  //     if (title === "") {
  //       alert("공고 제목은 필수 입력 사항입니다.");
  //       return;
  //     }
  //     if (sYear === "" || sMonth == "" || sDay == "") {
  //       alert("공고 시작일은 필수 입력 사항입니다.");
  //       return;
  //     }
  //     if (eYear === "" || eMonth == "" || eDay == "") {
  //       alert("공고 종료일은 필수 입력 사항입니다.");
  //       return;
  //     }
  //     if (goal === "") {
  //       alert("목표 금액은 필수 입력 사항입니다.");
  //       return;
  //     }
  //     if (poster === "") {
  //       alert("포스터 이미지는 필수 입력 사항입니다.");
  //       return;
  //     }

  //     const board = {
  //       shelterNo: general.memberNo,
  //       title: title,
  //       startAt: sYear + "-" + sMonth + "-" + sDay,
  //       endAt: eYear + "-" + eMonth + "-" + eDay,
  //       goalAmount: goal,
  //     };

  //     const boardReq = JSON.stringify(board);
  //     console.log(board);
  //     const formData = new FormData();
  //     formData.append("donationBoardRegistReq", boardReq);
  //     // formData.append("poster", poster);
  //     formData.append("image", thumbnail);

  //     http
  //       .post(`/donation/shelter/board`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then(() => {
  //         navigate("/mypage");
  //       })
  //       .catch((error) => console.log(error));
  //   };
  return (
    <MainContainer>
      <WriteContainer>
        <h2 style={{ textAlign: "left", margin: 0 }}>회원정보수정</h2>
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
        <form>
          <div style={{ margin: 0, display: "flex", gap: "56px" }}>
            <div style={{ flex: 4, alignItems: "center", maxWidth: "100%" }}>
              <WriteTitle>후원 정보</WriteTitle>
              <Row>
                <InputLabel htmlFor="title">
                  이름<Red>*</Red>
                </InputLabel>
                <Input
                  type="text"
                  id="title"
                  placeholder={general.member.name}
                />
              </Row>
              <Row>
                <InputLabel htmlFor="sDate">
                  공고시작일<Red>*</Red>
                </InputLabel>
                <Input
                  type="number"
                  //   value={sYear}
                  id="sDate"
                  //   onChange={(e) => setSYear(e.target.value)}
                  placeholder="연도"
                />
                <Input
                  type="number"
                  //   value={sMonth}
                  //   onChange={(e) => setSMonth(e.target.value)}
                  placeholder="월"
                />
                <Input
                  type="number"
                  //   value={sDay}
                  //   onChange={(e) => setSDay(e.target.value)}
                  placeholder="일"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="eDate">
                  공고종료일<Red>*</Red>
                </InputLabel>
                <Input
                  type="number"
                  //   value={eYear}
                  id="eDate"
                  //   onChange={(e) => setEYear(e.target.value)}
                  placeholder="연도"
                />
                <Input
                  type="number"
                  //   value={eMonth}
                  //   onChange={(e) => setEMonth(e.target.value)}
                  placeholder="월"
                />
                <Input
                  type="number"
                  //   value={eDay}
                  //   onChange={(e) => setEDay(e.target.value)}
                  placeholder="일"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="goal">
                  목표금액<Red>*</Red>
                </InputLabel>
                <Input
                  type="number"
                  //   value={goal}
                  id="goal"
                  //   onChange={(e) => setGoal(e.target.value)}
                  placeholder="목표금액"
                />
              </Row>
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
