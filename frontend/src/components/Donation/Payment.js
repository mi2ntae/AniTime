import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { Button } from "styled/styled";

export default function Payment() {
  const selector = "#payment-widget";
  const member = useSelector((state) => state.member);
  const clientKey = "test_ck_7DLJOpm5QrlKM42ZEqeVPNdxbWnY";
  const customerKey = "anitime_" + member.memberNo;
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(500);

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
              // 후원 공고 제목 넣어줘
              orderName: "1 2",
              customerName: member.name,
              customerEmail: member.memberNo,
              successUrl: `${window.location.origin}/donation/success`,
              failUrl: `${window.location.origin}/donation/fail`,
            });
          } catch (error) {
            console.log(error);
          }
        }}
        $border="#E8EBEE 3px solid"
        $background_color="#58ACFA"
        color="white"
        style={{
          fontWeight: "bold",
          width: 100,
          marginTop: 10,
          marginLeft: 20,
          fontSize: 16,
        }}
      >
        결제
      </Button>
    </Div>
  );
}

const Div = styled.div`
  margin: auto;
  width: 500px;
  height: 100%;
`;
