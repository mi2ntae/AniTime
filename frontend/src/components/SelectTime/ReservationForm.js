import { Form } from "react-router-dom";
import styled from "styled-components";

export default function ReservationForm() {
  return (
    <PageContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "97px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: "#000000",
            fontWeight: "bold",
          }}
        >
          입양 상담 신청서
        </div>
        <div
          style={{
            fontSize: "16px",
            color: "#6F6F6F",
            height: "30px",
          }}
        >
          아래 신청서를 작성하여 제출해 주세요.
        </div>
      </div>
      <FormContainer>
        <FormTop>
          {["이름", "전화번호", "이메일", "주소"].map((v) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "92px",
                  textAlign: "left",
                  textSize: "14px",
                  color: "#A7AEB4",
                }}
              >
                {v}
              </div>
              <InputTop></InputTop>
            </div>
          ))}
        </FormTop>
      </FormContainer>
    </PageContainer>
  );
}
const PageContainer = styled.div``;
const FormContainer = styled.div`
  width: 881px;
  height: 937px;
  border: 0.77px solid #e8ebee;
  border-radius: 8px;
  background-color: #ffffff;
`;
const FormTop = styled.div`
  display: flex;
  width: 721px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputTop = styled.input`
  color: #35383b;
  box-sizing: border-box;
  padding-left: 24px;
  width: 629px;
  height: 50px;
  font-size: 14px;
  background-color: #f7f8fa;
  border: 0.77px solid #e8ebee;
  border-radius: 12px;
  &:focus {
    outline: none;
    border: 1px solid #3994f0;
  }
`;
