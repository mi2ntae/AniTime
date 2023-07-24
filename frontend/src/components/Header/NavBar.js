import React from "react";
import { styled } from "styled-components";

export default function NavBar() {
  return (
    <Nav>
      <Link>입양하기</Link>
      <Link>실종동물</Link>
      <Link>후원하기</Link>
    </Nav>
  );
}

const Link = styled.p`
  color: #35383b;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  width: auto;
  max-width: 560px;
`;
