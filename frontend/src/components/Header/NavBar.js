import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function NavBar() {
  return (
    <Nav>
      <LinkP to="desertion">입양하기</LinkP>
      <LinkP to="missing">실종동물</LinkP>
      <LinkP to="">후원하기</LinkP>
    </Nav>
  );
}

const LinkP = styled(Link)`
  color: #35383b;
  text-decoration: none;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  width: auto;
  max-width: 560px;
`;
