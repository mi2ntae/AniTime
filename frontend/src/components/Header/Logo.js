import React from "react";
import { styled } from "styled-components";

export default function Logo() {
  const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  `;
  const Title = styled.p`
    margin-left: 5px;
    font-weight: bold;
    font-size: 1.3rem;
  `;
  return (
    <Div>
      <img src="/icons/logo.svg" />
      <Title>애니타임</Title>
    </Div>
  );
}
