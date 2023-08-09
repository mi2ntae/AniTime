import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export default function NavBar() {
  // const activeStyle = {
  //   color: "#3994f0",
  // };
  return (
    <Nav>
      <LinkP to="desertion">입양하기</LinkP>
      <LinkP to="missing">실종동물</LinkP>
      <LinkP to="donation">후원하기</LinkP>
    </Nav>
  );
}

const LinkP = styled(NavLink)`
  color: #35383b;
  text-decoration: none;
  &.active {
    color: #3994f0;
    font-weight: 800;
    transition: 0.1s;
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  width: auto;
  max-width: 560px;
  &.active {
    color: #3994f0;
  }
`;
