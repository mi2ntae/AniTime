import { Button } from "@mui/material";
import http from "api/commonHttp";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { initMember } from "../reducer/member";
import Swal from "sweetalert2";

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
  const dispatch = useDispatch();
  //지훈
  const [originPW, setOriginPW] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [pwValid, setPwValid] = useState(true);
  const [pwCheck, setPwCheck] = useState(true); //비밀번호 확인
  //정현

  const navi = useNavigate();
  useEffect(() => {
    http.get(`/member/${generalNo}`).then((res) => {
      setgeneral(res.data);
    });
  }, []);

  useEffect(() => {
    const validatePassword =
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

    if (validatePassword.test(password) || !password) {
      setPwValid(true);
      return;
    }
    setPwValid(false);
    return;
  }, [passwordCheck, password]);

  useEffect(() => {
    // // console.log(passwordCheck.passwordCheck);
    if (
      (password.length && passwordCheck.length && password === passwordCheck) ||
      !passwordCheck
    ) {
      setPwCheck(true);
      return;
    }
    setPwCheck(false);
    return;
  }, [passwordCheck, password]);
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
    if (!pwValid) {
      alert(
        "비밀번호는 8~16자의 영문 소문자로 이루어져야 하며 숫자와 특수문자를 하나 이상씩 포함하여야 합니다."
      );
      return;
    }
    if (!pwCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (
      password === "" ||
      !password ||
      passwordCheck === "" ||
      !passwordCheck
    ) {
      // navi("/");
      alert("비밀번호를 입력해 주세요.");
      return;
    }
    // if(originPW===password){
    //   alert("이전과 다른 비밀번호를 입력해 주세요.");
    //   return;
    // }
    if (password !== passwordCheck) {
      alert("비밀번호가 다릅니다. 다시 확인해주세요.");
      return;
    }

    http
      .put(`member/${general.memberNo}`, {
        password: password,
      })
      .then((res) => {
        Swal.fire({
          position: "center",
          // icon: "success",
          imageUrl: "/icons/img_complete.svg",
          title: "성공적으로 변경되었습니다.",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navi("/");
          return;
        });
      })
      .catch((err) => {
        // console.log(err);
        alert("회원 정보 수정에 실패했습니다. 다시 시도해 주세요.");
      });
  };

  const handleSns = (e) => {
    e.preventDefault();
    http.put(`member/check/${generalNo}`).then(() => {
      alert("SNS연동이 되었습니다!");
      navi("/");
      return;
    });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      // icon: "success",
      imageUrl: "/icons/img_delete.svg",
      title: "정말로 탈퇴하시겠어요?",
      html: `삭제한 계정은 복구가 불가능해요!<br/>신중하게 검토한 후 탈퇴해 주세요.`,
      showCancelButton: true,
      confirmButtonColor: "#FF7676",
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        http.post(`member/delete/${generalNo}`).then((e) => {
          dispatch(initMember());
          Swal.fire({
            position: "center",
            // icon: "success",
            imageUrl: "/icons/img_complete.svg",
            title: "회원 탈퇴가 완료되었습니다.",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            navi("/");
            return;
          });
          return;
        });
      }
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
            onClick={handleDelete}
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
              <WriteTitle>회원 정보</WriteTitle>
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
                  placeholder="이메일" readOnly
                />
              </Row>
              <Row>
                <InputLabel htmlFor="phone">
                  휴대폰 번호<Red>*</Red>
                </InputLabel>
                <Input
                  type="text"
                  value={general.phone}
                  id="phone"
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Row>
              <Row style={pwValid ? { display: "none" } : { display: "block" }}>
                <div
                  style={{
                    marginLeft: "120px",
                    color: "#FF7676",
                    fontSize: "11px",
                  }}
                >
                  비밀번호는 영문 소문자, 숫자, 특수문자를 포함시켜 8~16자로
                  작성해주세요.
                </div>
              </Row>
              <Row>
                <InputLabel htmlFor="pwCheck">
                  비밀번호 확인<Red>*</Red>
                </InputLabel>
                <Input
                  type="password"
                  id="pwCheck"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
              </Row>
              <Row style={pwCheck ? { display: "none" } : { display: "block" }}>
                <div
                  style={{
                    marginLeft: "120px",
                    color: "#FF7676",
                    fontSize: "11px",
                  }}
                >
                  비밀번호가 일치하지 않습니다.
                </div>
              </Row>
              <Row>
                <InputLabel>
                  카카오 연동<Red>*</Red>
                </InputLabel>
                {!general.snsCheck ? (
                  <Button onClick={handleSns}>
                    <img src="kakao_login_medium_wide.png" alt="버튼X" />
                  </Button>
                ) : (
                  <Input
                    type="text"
                    value={general.email}
                    id="sDate"
                    //   onChange={(e) => setSYear(e.target.value)}
                    placeholder="KaKao계정" readOnly
                  />
                )}
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
