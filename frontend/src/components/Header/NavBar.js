import React from "react";
import { styled } from "styled-components";

export default function NavBar() {
  const Link = styled.p`
    color: #35383b;
  `;

  const NavBar = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: auto;
    width: auto;
    max-width: 560px;
  `;

  return (
    <NavBar>
      <Link>입양하기</Link>
      <Link>실종동물</Link>
      <Link>후원하기</Link>
    </NavBar>
  );
}
