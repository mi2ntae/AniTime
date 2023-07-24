import React from "react";
import NavBar from "./NavBar";
import { styled } from "styled-components";
import Logo from "./Logo";

export default function Header() {
  const Header = styled.header`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
  `;

  const Div = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-grow: 1;
  `;

  return (
    <Header>
      <Logo />
      <NavBar />
      <Div>
        <p>?</p>
        <p>알림창</p>
        <p>마이페이지</p>
      </Div>
    </Header>
  );
}
