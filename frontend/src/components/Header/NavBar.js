import React from "react";
import { styled } from "styled-components";

export default function NavBar() {
  const NavBar = styled.div`
    flex-grow: 3;
  `;

  return (
    <NavBar>
      <p>NavBar</p>
    </NavBar>
  );
}
