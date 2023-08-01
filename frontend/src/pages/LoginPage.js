import { useSelector, useDispatch } from "react-redux";
import { setMember } from "../reducer/member";
import { MainContainer } from "styled/styled";
import { styled } from "styled-components";
import http from "../api/commonHttp";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const member = useSelector((state) => {
    return state.member;
  });
  console.log("rend");
  // post 예시
  const login = () => {
    http
      .post(`auth`, {
        email: "v",
        password: "v",
        memberKind: 0,
      })
      .then((res) => {
        console.log(res.member);
        dispatch(setMember(res));
      });
  };

  // get 예시
  const memberNo = 2;
  const authen = () => {
    http.get(`member/${memberNo}`).then((res) => {
      console.log(res);
    });
  };

  const kakao = () => {
    window.location.href =
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=sVWt0le2n7eZSmkObGJ4&redirect_uri=http://localhost:8000/auth/oauth2/naver&state=anitime";
    // location.href = "http://localhost:8000/oauth2/authorization/kakao";
    // http.get(`member/${memberNo}`).then((res) => {
    //   console.log(res);
    // });
  };
  return (
    <PageContainer>
      <MainContainer>
        <div>
          <div>{member.name}</div>
          <button onClick={login}>로그인</button>
          <button onClick={authen}>테스트</button>
          <button onClick={kakao}>카카오</button>
        </div>
        <Link to="/">메인</Link>
      </MainContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
