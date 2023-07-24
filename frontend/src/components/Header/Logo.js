import React from "react";
import { styled } from "styled-components";

export default function Logo() {
  const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
  `;
  const Title = styled.p`
    margin-left: 8px;
    font-weight: bold;
    font-size: 1.2rem;
  `;
  return (
    <Div>
      <img src="/icons/logo.svg" alt="애니타임" />
      <Title>애니타임</Title>
    </Div>
  );
}
