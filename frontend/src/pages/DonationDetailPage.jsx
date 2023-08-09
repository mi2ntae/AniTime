import { Button } from "@mui/material";
import { width } from "@mui/system";
import http from "api/commonHttp";
import Payment from "components/Donation/Payment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { keyframes, styled } from "styled-components";
import { MainContainer } from "styled/styled";

export default function DonationDetailPage() {
  const boardNo = useLocation().pathname.split("/").pop();
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [clickPayment, setClickPayment] = useState(false);

  useEffect(() => {
    http
      .get(`donation/${boardNo}`)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <MainContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "80px",
          gap: "24px",
        }}
      >
        <div
          style={{
            color: "#35383B",
            fontSize: "36px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {content.title}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "88px",
              height: "40px",
              backgroundColor: "#FFE5E5",
              color: "#F56666",
              fontSize: "20px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            D-{content.dday}
          </div>
        </div>
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "row",
            gap: "12%",
          }}
        >
          <div style={{ flex: 4, width: "100%" }}>
            <div
              style={{
                borderRadius: "10px",
                background: `url(${content.thumbnail}) no-repeat center/cover`,
                backgroundSize: "cover",
                width: "100%",
                aspectRatio: "1/1",
              }}
            />
          </div>
          <div
            style={{
              flex: 5,
              //   gap: "16px",
              //   justifyContent: "space-between",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <div
                style={{
                  color: "#6F6F6F",
                  fontSize: "18px",
                  fontWeight: 400,
                }}
              >
                모인 금액
              </div>
              <div>
                <span
                  style={{
                    color: "#35383B",
                    fontSize: "40px",
                    fontWeight: 400,
                  }}
                >
                  {content.attain}
                </span>
                <span
                  style={{
                    color: "#35383B",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  원
                </span>
                <span
                  style={{
                    color: "#A7AEB4",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  &nbsp;/ {content.goal}원
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "32px",
                  alignItems: "center",
                }}
              >
                <ProgressBar>
                  <Progress
                    style={{ width: `${content.achievement}%` }}
                    fillPercentage={content.achievement}
                  />
                </ProgressBar>
                <div
                  style={{
                    color: "#35383B",
                    fontSize: "20px",
                    fontWeight: 700,
                  }}
                >
                  {content.achievement}%
                </div>
              </div>
            </div>
            <div style={{ marginTop: "24px" }}>
              <div
                style={{
                  color: "#6F6F6F",
                  fontSize: "18px",
                  fontWeight: 400,
                  marginBottom: "16px",
                }}
              >
                후원 금액
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <NumInput
                  type="number"
                  placeholder="최소 1,000원"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <div style={{ textAlign: "right", flex: 1 }}>원</div>
              </div>
            </div>
            <div>
              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    id="agree"
                    style={{
                      border: "1.5px solid #E8EBEE",
                      borderRadius: "2px",
                    }}
                  />
                  <label
                    for="agree"
                    style={{
                      color: "#535A61",
                      fontSize: "14px",
                      fontWeight: "400",
                      marginLeft: "4px",
                    }}
                  >
                    약관에 동의합니다
                  </label>
                </div>
                <div
                  style={{
                    color: "#535A61",
                    fontSize: "14px",
                    fontWeight: 400,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  약관 확인하기
                  <img src="/icons/arrow_right.svg" />
                </div>
              </div>
            </div>
            {clickPayment ? (
              <Payment boardNo={boardNo} price={price} />
            ) : (
              <Button
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "50px",
                  borderRadius: "12px",
                  color: "#3994F0",
                  fontSize: "16px",
                  fontWeight: 700,
                  marginTop: "24px",
                  border: "1px solid #3994F0",
                }}
                onClick={() => setClickPayment(true)}
              >
                후원하기
              </Button>
            )}
          </div>
        </div>
        <img
          src={content.poster}
          style={{
            borderRadius: "10px",
            width: "100%",
            marginTop: "40px",
          }}
        />
      </div>
    </MainContainer>
  );
}

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f7f8fa;
  border-radius: 32px;
  // overflow: hidden;
  flex: 1;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #3994f0;
  border-radius: 32px;
  z-index: 999;
  animation: ${keyframes`
    0% {
      width: 0;
    }
    100% {
      width: ${(props) => props.fillPercentage}%;
    }
  `} 1s ease-out forwards;
`;

const NumInput = styled.input`
  background-color: #f7f8fa;
  border-radius: 12px;
  border: 0.77px solid var(--lightgrey, #e8ebee);
  outline: none;
  height: 50px;
  // flex: 1;
  width: 100%;
  max-width: 500px;
  padding-left: 24px;

  &:focus {
    border: 1px solid #3994f0;
  }

  /* Spinner 숨기기 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  &::placeholder {
    color: #a7aeb4;
  }
`;
