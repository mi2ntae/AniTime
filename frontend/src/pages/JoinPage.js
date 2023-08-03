import { useDispatch } from "react-redux";
import { setMember } from "../reducer/member";
import http from "../api/commonHttp";
// import { Link } from "react-router-dom";
import Logo from "../components/Header/Logo";
import { Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Phone } from "@mui/icons-material";

const defaultTheme = createTheme();
export default function LoginPage() {
  // 나중에 .env로 실행 or 빌드 중에 받아오게 해야함
  // const redirect_uri = "http://localhost:8000/api/auth/oauth2/kakao";
  const [tabNo, setTabNo] = useState("0");

  const dispatch = useDispatch();
  const navi = useNavigate();

  //-----------공통 정보 저장 ------------------------
  const [commoninfo, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordCheck: "",
  });
  const handleTextValueChangeTop = (e) => {
    const { name, value } = e.target;
    setInfo((input) => {
      return { ...input, [name]: value };
    });
  };

  //-------보호소 정보 저장 변수, onChange, Reset()---------
  const [shelterInfo, setShelterInfo] = useState({
    bisNo: "",
    bisNoCheck: false,
    filedata: null,
  });
  const handleShelterValueimage = (e) => {
    console.log(e);
    const { name, value } = e.target.files.length > 1 ? e.target.files[0] : "";
    setInfo((input) => {
      return { ...input, [name]: value };
    });
  };
  const handleShelterValueChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setInfo((input) => {
      return { ...input, [name]: value };
    });
  };

  const handleShelterValueReset = () => {
    setInfo({
      bisNo: "",
      bisNoCheck: false,
      filedata: null,
    });
  };
  // const [addrCheck, setAddr] = useState(false);
  // const [bischeck, setbisNo] = useState(false);
  // const [, setSheNo] = useState(false);
  // const [phone, setPhone] = useState(false);

  const bisNoCehck = (e) => {
    e.preventDefault();
    console.log("사업자 번호 조회하는 이벤트입니다.");
  };

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
    handleShelterValueReset();
    console.log(commoninfo);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: "url(/loginPageImg.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 0,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Logo />
            <Tabs
              value={tabNo}
              onChange={tabChange}
              // textColor="secondary"
              // indicatorColor="secondary"
              aria-label="secondary tabs example"
              style={{
                marginTop: 10,
              }}
            >
              <Tab
                value="0"
                label="일반 회원"
                sx={{
                  fontWeight: "bold",
                }}
              />
              <Tab
                value="1"
                label="보호소 회원"
                sx={{
                  fontWeight: "bold",
                }}
              />
            </Tabs>
            <Box
              component="form"
              noValidate
              // onSubmit={login}
              sx={{ mt: 1, maxWidth: 500 }}
            >
              <TextField
                margin="small"
                required
                fullWidth
                size=""
                id="name"
                label={tabNo === "0" ? "이름" : "보호소 명"}
                name="name"
                autoComplete="name"
                autoFocus
                backgroundcolor="Black"
                value={commoninfo["name"]}
                onChange={handleTextValueChangeTop}
              />

              <TextField
                margin="small"
                required
                fullWidth
                id="email"
                type="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                backgroundcolor="Black"
                value={commoninfo["email"]}
                onChange={handleTextValueChangeTop}
              />
              <TextField
                margin="small"
                required
                fullWidth
                id="phone"
                type="email"
                label={tabNo === "0" ? "전화번호" : "대표번호"}
                name="phone"
                autoComplete="phone"
                autoFocus
                backgroundcolor="Black"
                value={commoninfo["phone"]}
                onChange={handleTextValueChangeTop}
              />
              <TextField
                margin="small"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                value={commoninfo["password"]}
                onChange={handleTextValueChangeTop}
              />
              <TextField
                margin="small"
                required
                fullWidth
                name="passwordCheck"
                label="비밀번호 확인"
                type="password"
                id="passwordCheck"
                autoComplete="current-password"
                value={commoninfo["passwordCheck"]}
                onChange={handleTextValueChangeTop}
              />
              {tabNo !== "0" && (
                <>
                  <TextField
                    marginTop="10"
                    required
                    name="passwordCheck"
                    label="사업자 번호"
                    type="text"
                    id="passwordCheck"
                    onChange={handleShelterValueChange}
                    autoComplete="current-password"
                    sx={{
                      width: "70%",
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      height: "56px",
                      width: "25%",
                      marginLeft: "5%",
                      fontWeight: "fontWeightBold",
                      fontSize: 13,
                    }}
                    onClick={bisNoCehck}
                  >
                    업종 조회 하기
                  </Button>

                  <input
                    name="filedata"
                    type="file"
                    id="filedata"
                    autoComplete="filedata"
                    onChange={handleShelterValueimage}
                    value={shelterInfo["filedata"]}
                    // style={{ display: "none" }}
                  />
                  <TextField
                    margin="small"
                    required
                    fullWidth
                    name="passwordCheck"
                    label="사업자 등록증"
                    type="text"
                    id="passwordCheck"
                    autoComplete="current-password"
                    // InputProps={{ readOnly: true }}
                    value={shelterInfo["filedata"]}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("filedata").click();
                    }}
                  />
                </>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: 400,
                  fontWeight: "fontWeightBold",
                  fontSize: 18,
                }}
                style={{
                  marginLeft: 50,
                }}
              >
                로그인
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
