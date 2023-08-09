import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { keyframes, styled } from "styled-components";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

export default function Payment({ boardNo, price }) {
  const selector = "#payment-widget";
  const member = useSelector((state) => state.member);
  const clientKey = "test_ck_7DLJOpm5QrlKM42ZEqeVPNdxbWnY";
  const customerKey = "anitime_" + member.memberNo;
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: price }
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  return (
    <Div>
      <div id="payment-widget" />
      <Button
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;

          try {
            await paymentWidget?.requestPayment({
              orderId: nanoid(),
              orderName: `${boardNo} ${member.memberNo}`,
              customerName: member.name,
              customerEmail: member.memberNo,
              successUrl: `${window.location.origin}/donation/success`,
              failUrl: `${window.location.origin}/donation/fail`,
            });
          } catch (error) {
            console.log(error);
          }
        }}
        style={{
          backgroundColor: "#3994F0",
          width: "100%",
          height: "50px",
          borderRadius: "12px",
          color: "white",
          fontSize: "16px",
          fontWeight: 700,
          marginTop: "24px",
        }}
      >
        후원하기
      </Button>
    </Div>
  );
}

const Div = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  animation: ${keyframes`
    0% {
      height: 0;
    }
    100% {
      height: 100%;
    }
  `} 5s ease-out forwards;
`;
