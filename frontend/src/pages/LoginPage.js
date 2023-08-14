import { useDispatch } from "react-redux";
import { setMember } from "../reducer/member";
import http from "../api/commonHttp";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import LoginTab from "../components/Login/LoginTab.jsx";
import { styled } from "styled-components";
import { Button } from "@mui/material";

export default function LoginPage() {
  // 나중에 .env로 실행 or 빌드 중에 받아오게 해야함
  const api_key = "2ac7d3d2bff68cb6f3ed6501ef44f2ae";
  const redirect_uri = "https://i9a208.p.ssafy.io/kakaoLogin";
  const dispatch = useDispatch();
  const navi = useNavigate();

  const [tabNo, setTabNo] = useState("0");
  const login = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    http
      .post(`auth`, {
        email: data.get("email"),
        password: data.get("password"),
        memberKind: parseInt(tabNo),
      })
      .then((res) => {
        dispatch(setMember(res));
        navi("/");
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const kakaoLogin = async () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  };

  const tabChange = (event, newValue) => {
    setTabNo(newValue);
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // 로그인 기억 여부
  const [isChecked, setIsChecked] = useState(false);

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
            onSubmit={login}
            sx={{
              mt: 1,
              maxWidth: 500,
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
              marginTop: "64px",
            }}
          >
            <Input
              style={{ backgroundImage: "url('/icons/ic_mail.svg')" }}
              placeholder="이메일"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
                style={{ backgroundImage: "url('/icons/ic_lock.svg')" }}
                placeholder="비밀번호"
                type={showPassword ? "text" : "password"}
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
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
            <div>
              <Checkbox>
                로그인 기억하기
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <span className="checkmark"></span>
              </Checkbox>
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#3994F0",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 700,
                marginTop: "48px",
                borderRadius: "12px",
                height: "50px",
                marginBottom: 1,
                boxShadow: "none",
              }}
            >
              로그인
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#E8EBEE" }}
              />
              <span style={{ margin: "0px 16px 0px 16px", color: "#E8EBEE" }}>
                or
              </span>
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#E8EBEE" }}
              />
            </div>
            <Button
              onClick={kakaoLogin}
              style={{
                backgroundColor: "#FEE500",
                color: "#363636",
                fontSize: "16px",
                fontWeight: 700,
                marginTop: 2,
                borderRadius: "12px",
                height: "50px",
                gap: "16px",
              }}
            >
              <img src="/icons/ic_kakao.svg" /> 카카오톡으로 시작하기
            </Button>
            <Button
              style={{
                backgroundColor: "#FFFFFF",
                color: "#363636",
                fontSize: "16px",
                fontWeight: 700,
                borderRadius: "12px",
                height: "50px",
                border: "1px solid #E8EBEE",
                boxShadow: "none",
              }}
              onClick={(e) => {
                e.preventDefault();
                navi("/join");
                return;
              }}
              fullWidth
              variant="contained"
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
  padding-left: 56px;
  font-size: 14px;
  font-weight: 400;
  outline: none;

  background-image: url("/icons/ic_mail.svg");
  background-repeat: no-repeat;
  background-position: 24px center;

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
  padding-left: 56px;
  font-size: 14px;
  font-weight: 400;
  outline: none;

  background-image: url("/icons/ic_lock.svg");
  background-repeat: no-repeat;
  background-position: 24px center;

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

const Checkbox = styled.label`
  display: flex;
  align-items: center; /* 상하 중앙 정렬을 위한 설정 */
  position: relative;
  cursor: pointer;
  user-select: none;
  padding-left: 28px;
  margin-right: 16px;
  font-size: 14px;
  color: var(--darkestgrey, #535a61);
  font-weight: 400;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark::after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark::after {
    display: block;
  }

  .checkmark {
    position: absolute;
    top: 50%; /* 세로 중앙 정렬을 위한 설정 */
    left: 0;
    transform: translateY(-50%); /* 세로 중앙 정렬을 위한 설정 */
    width: 18px;
    height: 18px;
    border: 1px solid #e8ebee;
    border-radius: 2px;
    z-index: 1;
    background-color: transparent;
  }

  .checkmark::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 14px;
    height: 14px;
    background-image: url("/icons/ic_checked.svg");
    background-repeat: no-repeat;
    background-position: center center;
    z-index: 2;
  }

  input:focus ~ .checkmark {
    border-color: #535a61;
  }

  input:checked ~ .checkmark {
    background-color: #535a61;
    border-color: #535a61;
  }
`;
