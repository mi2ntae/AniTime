import { useSelector, useDispatch } from "react-redux";
import { setMember } from "../reducer/member";
import { MainContainer } from "styled/styled";
import { styled } from "styled-components";

export default function LoginPage() {
  const dispach = useDispatch();
  const member = useSelector((state) => {
    // console.log(state);
    return state.member;
  });
  console.log("rend");
  const addNumber = () => {
    dispach(
      setMember({
        token: "fff",
        memberNo: -1,
        name: "asd",
        memberKind: -1,
        snsCheck: false,
      })
    );
  };
  return (
    <PageContainer>
      <MainContainer>
        <div>
          <div>{member.token}</div>
          <button onClick={addNumber}>+</button>
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
