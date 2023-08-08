import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function Logo({ white }) {
  return (
    <Div to="/">
      <img src="/icons/logo.svg" alt="애니타임" />
      <Title $white={white}>애니타임</Title>
    </Div>
  );
}

const Div = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  text-decoration: none;
  color: #35383b;
`;

const Title = styled.p`
  margin-left: 8px;
  font-weight: bold;
  font-size: 1.2rem;
  ${({ $white }) => $white && "color: #FFFFFF"};
`;
