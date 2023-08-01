import { useSelector, useDispatch } from "react-redux";
import { setMember } from "../reducer/member";
import http from "../api/commonHttp";
// import { Link } from "react-router-dom";
import Logo from "../components/Header/Logo";
//
import { Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const defaultTheme = createTheme();
export default function LoginPage() {
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
      .catch((err) => {});
  };

  const tabChange = (event, newValue) => {
    setTabNo(newValue);
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
            backgroundImage:
              "url(https://anitime.s3.ap-northeast-2.amazonaws.com/loginPageImg.png)",
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
              my: 8,
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
                marginTop: 30,
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
              onSubmit={login}
              sx={{ mt: 1, maxWidth: 500 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                backgroundcolor="Black"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="로그인 기억하기"
                style={{
                  float: "left",
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 400 }}
                fontWeight="fontWeightBold"
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
