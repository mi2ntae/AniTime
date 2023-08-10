import { useDispatch } from "react-redux";
import http from "../api/commonHttp";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginTab from "../components/Login/LoginTab.jsx";
import { styled } from "styled-components";

export default function LoginPage() {
  // 나중에 .env로 실행 or 빌드 중에 받아오게 해야함
  // const redirect_uri = "http://localhost:8000/api/auth/oauth2/kakao";
  const [tabNo, setTabNo] = useState("0");

  const dispatch = useDispatch();
  const navi = useNavigate();

  //입력 값이 없을 때는 true (제출 시 빈칸 여부 따로 따져야 함)
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [pwValid, setPwValid] = useState(true);
  const [pwCheck, setPwCheck] = useState(true); //비밀번호 확인

  //-----------공통 정보 저장 ------------------------
  const [commoninfo, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleTextValueChangeTop = (e) => {
    const { name, value } = e.target;
    setInfo((input) => {
      return { ...input, [name]: value };
    });
  };
  useEffect(() => {
    const validateEmail =
      /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;
    if (validateEmail.test(commoninfo.email) || !commoninfo.email) {
      setEmailValid(true);
      return;
    }
    setEmailValid(false);
    return;
  }, [commoninfo.email]);

  const [passwordCheck, setpPass] = useState({ passwordCheck: "" });

  const handlePassWordCheck = (e) => {
    const { name, value } = e.target;
    setpPass((input) => {
      return { ...input, [name]: value };
    });
  };

  useEffect(() => {
    const validatePassword =
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

    if (validatePassword.test(commoninfo.password) || !commoninfo.password) {
      setPwValid(true);
      return;
    }
    setPwValid(false);
    return;
  }, [passwordCheck.passwordCheck, commoninfo.password]);

  useEffect(() => {
    console.log(passwordCheck.passwordCheck);
    if (
      (commoninfo.password.length &&
        passwordCheck.passwordCheck.length &&
        commoninfo.password === passwordCheck.passwordCheck) ||
      !passwordCheck.passwordCheck
    ) {
      setPwCheck(true);
      return;
    }
    setPwCheck(false);
    return;
  }, [passwordCheck.passwordCheck, commoninfo.password]);

  useEffect(() => {
    if (
      (/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(commoninfo.phone) &&
        commoninfo.phone[0] == "0") ||
      !commoninfo.phone
    ) {
      setPhoneValid(true);
      return;
    }
    setPhoneValid(false);
    return;
  }, [commoninfo.phone]);
  //-------보호소 정보 저장 변수, onChange, Reset()---------
  const [shelterInfo, setShelterInfo] = useState({
    filedata: null,
  });
  const handleShelterValueimage = (e) => {
    console.log(e);
    const { name, files } = e.target;
    setShelterInfo((input) => {
      return { ...input, [name]: files.length > 0 ? files[0] : "" };
    });
  };
  const handleShelterValueChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setShelterInfo((input) => {
      return { ...input, [name]: value };
    });
  };

  const join = (event) => {
    event.preventDefault();

    const data = tabNo === "0" ? { ...commoninfo } : new FormData();

    if (tabNo !== "0") {
      data.append(
        `member`,
        new Blob([JSON.stringify({ ...commoninfo, addr: shelterInfo.addr })]),
        { type: "application/json" }
      );
      data.append(`image`, shelterInfo.filedata);
    }
    console.log(data);

    http
      .post(
        tabNo === "0" ? `auth/general` : `auth/shelter`,
        data,
        tabNo === "0" // 요청
          ? {
              headers: {
                "Content-Type": "application/json",
              },
            }
          : {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
        // password: data.get("password"),
        // memberKind: parseInt(tabNo),
      )
      .then((res) => {
        console.log(
          "보호소 회원 가입이 완료되었습니다.\n 추후 승인 후 이용 가능하십니다. "
        );
      })
      .catch((err) => {});
  };

  //   setShelterInfo((input) => {
  //     return { ...input, bisNoCheck: true };
  //   });
  //   console.log("사업자 번호 조회하는 이벤트입니다.");
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // setSelectedFile(file);
  };

  const handleUpload = () => {
    // if (selectedFile) {
    // 여기에서 파일 업로드 로직을 추가하세요.
    // 예: 서버로 파일 전송 등
    // }
  };

  // 전화번호 포맷으로 자동 전환
  // const phone = "010-12345678";

  // phone
  //   .replace(/[^0-9]/g, '') // 숫자를 제외한 모든 문자 제거
  //   .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`); 입력->01050161 -> state -> 010-5061-8916 -> html

  const checkBisNo = () => {
    //https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=CIph4Ep9WZIczZRzxN3VnWaqSnt22CGUzr0ykamQMkhFmozlHUowzXKwYrYJKpNAdkfaBrwZakZoFCoIc9gVkQ%3D%3D
    // 여긴 api용 822-05-01554 -> 이준협가게 샘플 사업자 번호
  };

  const tabChange = (event, newValue) => {
    setTabNo(newValue);
    console.log(commoninfo);
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setShelterInfo((input) => {
          return { ...input, ["addr"]: data.address };
        });
      },
    }).open();
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage: "url(/loginPageImg.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={7}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              gap: "20px",
              textDecoration: "none",
              marginBottom: "40px",
            }}
          >
            <img
              src="/icons/logo.svg"
              alt="애니타임"
              style={{ width: "40px" }}
            />
            <p
              style={{
                color: "#35383B",
                fontSize: "1.8rem",
                fontWeight: "900",
              }}
            >
              애니타임
            </p>
          </Link>
          <LoginTab value={tabNo} setValue={setTabNo} onChange={tabChange} />
          <Box
            component="form"
            noValidate
            sx={{
              mt: 1,
              maxWidth: 500,
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
              marginTop: "48px",
            }}
          >
            <Input
              placeholder={tabNo === "0" ? "이름" : "보호소 명"}
              required
              id="name"
              name="name"
              autoFocus
              value={commoninfo["name"]}
              onChange={handleTextValueChangeTop}
              autoComplete="name"
            />
            <Input
              style={emailValid ? {} : { backgroundColor: "red" }}
              placeholder="이메일"
              required
              id="email"
              type="email"
              label="Email"
              name="email"
              autoFocus
              value={commoninfo["email"]}
              onChange={handleTextValueChangeTop}
              autoComplete="email"
            />
            <Input
              style={phoneValid ? {} : { backgroundColor: "red" }}
              placeholder={tabNo === "0" ? "전화번호" : "대표번호"}
              required
              id="phone"
              name="phone"
              autoFocus
              value={commoninfo["phone"]}
              onChange={handleTextValueChangeTop}
              autoComplete="phone"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                flex: 1,
              }}
            >
              <PasswordInput
                style={pwValid ? {} : { backgroundColor: "red" }}
                placeholder="비밀번호"
                type={showPassword ? "text" : "password"}
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                onChange={handleTextValueChangeTop}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  height: "50px",
                  backgroundColor: "#f7f8fa",
                  borderWidth: "0.77px 0.77px 0.77px 0px",
                  borderStyle: "solid",
                  borderColor: "#e8ebee",
                  borderRadius: "0px 12px 12px 0px",
                  paddingRight: "24px",
                }}
              >
                <img
                  src={
                    showPassword ? "/icons/ic_eye_.svg" : "/icons/ic_eye.svg"
                  }
                />
              </button>
            </div>
            <Input
              style={pwCheck ? {} : { backgroundColor: "red" }}
              placeholder="비밀번호 확인"
              required
              id="passwordCheck"
              name="passwordCheck"
              type="password"
              autoFocus
              value={passwordCheck.passwordCheck}
              onChange={handlePassWordCheck}
            />

            {tabNo !== "0" && (
              <>
                {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Input
                    required
                    name="address"
                    type="text"
                    id="address"
                    autoComplete="current-addr"
                    value={shelterInfo["addr"]}
                    onChange={handleShelterValueChange}
                    placeholder="주소"
                  />
                  <AddressSearchBtn />
                </div> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Input
                    required
                    name="address"
                    type="text"
                    id="address"
                    autoComplete="current-addr"
                    value={shelterInfo["addr"]}
                    readOnly
                    placeholder="주소"
                  />
                  <Button
                    style={{
                      backgroundColor: "#3994F0",
                      color: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: 700,
                      borderRadius: "12px",
                      height: "50px",
                      marginBottom: 1,
                      boxShadow: "none",
                      width: "40%",
                    }}
                    onClick={openPostcode}
                  >
                    검색
                  </Button>
                </div>
                <input
                  name="filedata"
                  type="file"
                  id="filedata"
                  autoComplete="filedata"
                  onChange={handleShelterValueimage}
                  style={{ display: "none" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Input
                    required
                    name="evidency"
                    type="text"
                    id="evidency"
                    onChange={handleShelterValueChange}
                    placeholder="증빙서류"
                    autoComplete="evidency"
                    value={
                      shelterInfo["filedata"] === null
                        ? ""
                        : shelterInfo["filedata"].name
                    }
                    readOnly="true"
                  />
                  <Button
                    style={{
                      backgroundColor: "#3994F0",
                      color: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: 700,
                      borderRadius: "12px",
                      height: "50px",
                      marginBottom: 1,
                      boxShadow: "none",
                      width: "40%",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("filedata").click();
                    }}
                  >
                    첨부하기
                  </Button>
                </div>
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#A7AEB4",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 700,
                marginTop: "48px",
                borderRadius: "12px",
                height: "50px",
                marginBottom: 1,
                boxShadow: "none",
              }}
              onClick={join}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
const Input = styled.input`
  width: 100%;
  height: 50px;
  background-color: #f7f8fa;
  border-radius: 12px;
  border: 0.77px solid var(--lightgrey, #e8ebee);
  padding-left: 24px;
  font-size: 14px;
  font-weight: 400;
  outline: none;

  &::placeholder {
    color: var(--gray-scale-gray-1, #c1c1c1);
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #f7f8fa inset;
    background-image: url("/icons/ic_lock.svg");
    background-repeat: no-repeat;
    background-position: 24px center;
  }
`;

const PasswordInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: #f7f8fa;
  border-radius: 12px 0px 0px 12px;
  border-width: 0.77px 0px 0.77px 0.77px;
  border-style: solid;
  border-color: #e8ebee;
  padding-left: 24px;
  font-size: 14px;
  font-weight: 400;
  outline: none;

  &::placeholder {
    color: var(--gray-scale-gray-1, #c1c1c1);
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #f7f8fa inset;
    background-image: url("/icons/ic_lock.svg");
    background-repeat: no-repeat;
    background-position: 24px center;
  }
`;
