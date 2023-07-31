import { useSelector, useDispatch } from "react-redux";
import { setMember } from "../reducer/member";
import { MainContainer } from "styled/styled";
import { styled } from "styled-components";
import http from "../api/commonHttp";

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
  return (
    <PageContainer>
      <MainContainer>
        <div>
          <div>{member.name}</div>
          <button onClick={login}>+</button>
          <button onClick={authen}>-</button>
        </div>
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
