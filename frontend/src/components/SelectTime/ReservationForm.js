import { Form, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { Button } from "styled/styled";
import { ProgressBar } from "styled/styled";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import http from "api/commonHttp";

export default function ReservationForm() {
  const generalNo = useSelector((state) => state.member.memberNo);
  const reservedDate = useSelector((state) => state.reservedDate);
  const desertionNo = useSelector((state) => state.desertionNo);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [address, setAddress] = useState("");
  //객체를 그냥 name:"asdf",phone:"000" 형태로 할까?
  const inquiryTop = ["이름", "전화번호", "이메일", "주소"];
  const inquiryBottom = ["1. 질문1", "2. 질문2", "3. 질문3"];
  const [inputTop, setInputTop] = useState({});
  const [inputBottom, setInputBottom] = useState({});
  const handleTextValueChangeTop = (e) => {
    const { name, value } = e.target;
    setInputTop((input) => {
      return { ...input, [name]: value };
    });
    console.log(inputTop);
  };
  const handleTextValueChangeBottom = (e) => {
    const { name, value } = e.target;
    setInputBottom((input) => {
      return { ...input, [name]: value };
    });
  };
  const nullCheck = () => {
    if (!checked) {
      alert("약관에 동의해 주세요.");
      return;
    }
    if (
      !(
        Object.keys(inputTop).length === inquiryTop.length &&
        Object.keys(inputBottom).length === inquiryBottom.length
      )
    ) {
      alert("모든 답을 작성해 주세요.");
      return;
    }
    for (const key in inputTop) {
      if (inputTop[key] === null || inputTop[key] === "") {
        alert("모든 답을 작성해 주세요.");
        return;
      }
    }
    for (const key in inputBottom) {
      if (inputBottom[key] === null || inputBottom[key] === "") {
        alert("모든 답을 작성해 주세요.");
        return;
      }
    }
    //정보 성공적으로 전송
    Swal.fire({
      position: "center",
      // icon: "success",
      title: "미팅을 예약하시겠어요?",
      showCancelButton: true,
      confirmButtonColor: "#3994F0",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        const data = new FormData();
        data.append(
          `meetReservation`,
          new Blob([
            JSON.stringify({
              desertionNo: desertionNo,
              generalNo: generalNo,
              reservedDate: reservedDate.date + "T" + reservedDate.time,
            }),
          ]),
          {
            type: "application/json",
          }
        );
        http
          .post(`meet/reservation`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.code === 200) {
              Swal.fire({
                position: "center",
                // icon: "success",
                imageUrl: "/icons/img_complete.svg",
                title: "성공적으로 예약되었습니다.",
                showConfirmButton: false,
                timer: 1000,
              }).then((res) => {
                navigate("/");
              });
            }
          })
          .catch(() => {
            Swal.fire({
              position: "center",
              icon: "error",
              // imageUrl: "/icons/img_complete.svg",
              title: "오류가 발생했습니다.",
              showConfirmButton: false,
              timer: 1000,
            });
          });
      } else return;
    });
  };

  return (
    <PageContainer>
      <ProgressBar>
        <div>
          <img src={`/icons/Component 25.svg`} />
        </div>
        <div
          style={{
            width: "312px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "#7D848A",
            }}
          >
            미팅일자 선택
          </div>
          <div
            style={{
              color: "#35383B",
              fontWeight: "bold",
            }}
          >
            신청서 작성
          </div>
        </div>
      </ProgressBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "47px",
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
          <div
            style={{
              marginBottom: "24px",
              textAlign: "left",
              textSize: "16px",
              fontWeight: "bold",
            }}
          >
            입양자 정보
          </div>
          {inquiryTop.map((v, i) => (
            <InputContainer>
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
              <InputTop
                id={`inputTop${i}`}
                name={`inputTop${i}`}
                value={`inputTop${i}`.value}
                onChange={handleTextValueChangeTop}
              ></InputTop>
            </InputContainer>
          ))}
          {/* <InputContainer>
            <div
              style={{
                width: "92px",
                textAlign: "left",
                textSize: "14px",
                color: "#A7AEB4",
              }}
            >
              주소
            </div>
            <InputTop
              style={{ width: "467px" }}
              id="address"
              name="address"
              value={address}
              onChange={setAddress}
            ></InputTop>
            <Button
              style={{
                marginLeft: "8px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              width="154px"
              height="50px"
              background_color="#3994F0"
              color="#ffffff"
              margin="0px"
            >
              검색
            </Button>
          </InputContainer> */}
        </FormTop>
        <FormBottom>
          <div
            style={{
              marginBottom: "24px",
              textAlign: "left",
              textSize: "16px",
              fontWeight: "bold",
            }}
          >
            사전 질문
          </div>
          {inquiryBottom.map((v, i) => (
            <div>
              <div
                style={{
                  height: "22px",
                  textAlign: "left",
                  textSize: "14px",
                  color: "#A7AEB4",
                  marginBottom: "8px",
                  marginTop: "8px",
                }}
              >
                {v}
              </div>
              <InputBottom
                id={`inputBottom${i}`}
                name={`inputBottom${i}`}
                value={`inputBottom${i}`.value}
                onChange={handleTextValueChangeBottom}
              ></InputBottom>
            </div>
          ))}
        </FormBottom>
        <div
          style={{
            display: "flex",
            marginTop: "97px",
          }}
        >
          <input
            id="contract"
            checked={checked}
            onChange={() => setChecked(() => !checked)}
            type="checkbox"
          />
          <label for="contract">약관에 동의합니다.</label>
        </div>
      </FormContainer>
      <Button
        onClick={nullCheck}
        style={{
          fontSize: "16px",
          fontWeight: "bold",
        }}
        width="280px"
        height="50px"
        $background_color="#3994F0"
        color="#ffffff"
      >
        계속
      </Button>
    </PageContainer>
  );
}
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FormContainer = styled.div`
  width: 881px;
  height: 937px;
  border: 0.77px solid #e8ebee;
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FormTop = styled.div`
  display: flex;
  width: 721px;
  flex-direction: column;
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
const FormBottom = styled.div``;
const InputBottom = styled.input`
  color: #35383b;
  box-sizing: border-box;
  padding-left: 24px;
  width: 721px;
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
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
