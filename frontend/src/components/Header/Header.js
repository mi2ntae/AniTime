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
    height: 64px;
    min-width: 480px;
    max-width: 1240px;
    margin: auto;
  `;

  const Grow = styled.div`
    flex-grow: 1;
  `;

  const Right = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 160px;
  `;

  return (
    <Header>
      <Logo />
      <Grow>
        <NavBar />
      </Grow>
      <Right>
        <img src="/icons/ic_help.svg" alt="help" />
        <img src="/icons/ic_notification.svg" alt="notification" />
        <img src="/icons/ic_account.svg" alt="account" />
      </Right>
    </Header>
  );
}
