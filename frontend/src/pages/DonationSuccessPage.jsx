import Header from "components/Header/Header";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useEffect } from "react";
import http from "api/commonHttp";
import { useNavigate } from "react-router-dom";

export default function DonationSuccessPage() {
  const navi = useNavigate();
  const params = new URL(document.location.toString()).searchParams;
  const orderId = params.get("orderId");
  const paymentKey = params.get("paymentKey");
  const amount = params.get("amount");
  useEffect(() => {
    http
      .get("donation/payment", {
        params: {
          paymentKey: paymentKey,
          orderId: orderId,
          amount: amount
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        navi("/donation/fail");
      });
  }, []);
  return (
    <>
      <Header />
      <Div>
        <img src="../icons/img_complete.svg" alt="Error" />
        <Text>후원이 완료되었습니다.</Text>
        <Link to={"/donation"} style={{
          textDecoration: "none"
        }}>공고 목록 돌아가기</Link>
      </Div>
    </>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Text = styled.p`
  color: #535a61;
  font-weight: bolder;
  font-size: 30px;
`;
