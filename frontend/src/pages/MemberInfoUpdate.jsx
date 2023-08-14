import { Button } from "@mui/material";
import http from "api/commonHttp";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  WriteContainer,
  WriteTitle,
  Row,
  InputLabel,
  Input,
  Red,
  MainContainer,
} from "styled/styled";

export default function UserUpdate() {
  let generalNo = useSelector((state) => state.member.memberNo);
  // console.log(generalNo);
  const [general, setgeneral] = useState({
    email: "",
    memberKind: 0,
    memberNo: 0,
    name: "",
    password: "",
    phone: "",
    snsCheck: false,
    snsToken: "",
  });
  const [password, setPassword] = useState(general.password);
  const [passwordCheck, setPasswordCheck] = useState("");

  const navi = useNavigate();
  useEffect(() => {
    http.get(`/member/${generalNo}`).then((res) => {
      setgeneral(res.data);
      setPassword(res.data.password);
    });
  }, []);
  // console.log(general);
  // // console.log(password);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === "" || general.password === password) {
      navi("/");
      return;
    }
    if (password !== passwordCheck) {
      alert("비밀번호가 다릅니다 다시 확인해주세요");
      return;
    }

    http
      .put(`member/${general.memberNo}`, {
        password: password,
      })
      .then((res) => {
        navi("/");
        return;
      })
      .catch((err) => {
        // console.log(err);
        alert("회원 정보 수정에 실패 했습니다. 다시 시도해 주세요");
      });
  };

  const handelSns = (e) => {
    e.preventDefault();
    http.put(`member/check/${generalNo}`).then(() => {
      alert("SNS연동이 되었습니다!");
      navi("/");
      return;
    });
  };
  //   if (sYear === "" || sMonth == "" || sDay == "") {
  //     alert("공고 시작일은 필수 입력 사항입니다.");
  //     return;
  //   }
  //   if (eYear === "" || eMonth == "" || eDay == "") {
  //     alert("공고 종료일은 필수 입력 사항입니다.");
  //     return;
  //   }
  //   if (goal === "") {
  //     alert("목표 금액은 필수 입력 사항입니다.");
  //     return;
  //   }
  //   if (poster === "") {
  //     alert("포스터 이미지는 필수 입력 사항입니다.");
  //     return;
  //   }

  //     const board = {
  //       shelterNo: generalNo,
  //       title: title,
  //       startAt: sYear + "-" + sMonth + "-" + sDay,
  //       endAt: eYear + "-" + eMonth + "-" + eDay,
  //       goalAmount: goal,
  //     };

  //     const boardReq = JSON.stringify(board);
  //     // console.log(board);
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
  //       .catch((error) => // console.log(error));
  return (
    <MainContainer>
      <WriteContainer>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ textAlign: "left", margin: 0 }}>회원정보수정</h2>
          <Button
            style={{
              color: "red",
            }}
          >
            탈퇴하기
          </Button>
        </div>
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
                <Input type="text" id="title" value={general.name} readOnly />
              </Row>
              <Row>
                <InputLabel htmlFor="sDate">
                  이메일<Red>*</Red>
                </InputLabel>
                <Input
                  type="text"
                  value={general.email}
                  id="sDate"
                  //   onChange={(e) => setSYear(e.target.value)}
                  placeholder="연도"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="goal">
                  휴대폰 번호<Red>*</Red>
                </InputLabel>
                <Input
                  type="number"
                  value={general.phone}
                  id="goal"
                  //   onChange={(e) => setGoal(e.target.value)}
                  // placeholder=""
                  readOnly
                />
              </Row>
              <Row>
                <InputLabel htmlFor="eDate">
                  비밀번호<Red>*</Red>
                </InputLabel>
                <Input
                  type="password"
                  //   value={eYear}
                  id="eDate"
                  value={password}
                  onFocus={(e) => setPassword("")}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Row>
              <Row>
                <InputLabel htmlFor="goal">
                  비밀번호 확인<Red>*</Red>
                </InputLabel>
                <Input
                  type="text"
                  id="goal"
                  value={passwordCheck}
                  onFocus={(e) => setPasswordCheck("")}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
              </Row>

              <Row>
                <InputLabel htmlFor="goal">
                  카카오 연동<Red>*</Red>
                </InputLabel>
                <Button onClick={handelSns}>
                  <img src="kakao_login_medium_wide.png" alt="버튼X" />
                </Button>
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
              onClick={handleSubmit}
            >
              수정하기
            </Button>
          </div>
        </form>
      </WriteContainer>
    </MainContainer>
  );
}
