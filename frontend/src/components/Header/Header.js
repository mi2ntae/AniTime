import React from "react";
import NavBar from "./NavBar";
import { styled } from "styled-components";
import Logo from "./Logo";
import Notice from "../Notice/Notice";

export default function Header() {
  return (
    <StyleHeader>
      <HeaderDiv>
        <Logo />
        <div style={{ flexGrow: 1 }}>
          <NavBar />
        </div>
        <HeaderRight>
          <img src="/icons/ic_help.svg" alt="help" />
          {/* <img src="/icons/ic_notification.svg" alt="notification" /> */}
          <Notice />
          <img src="/icons/ic_account.svg" alt="account" />
        </HeaderRight>
      </HeaderDiv>
    </StyleHeader>
  );
}

const StyleHeader = styled.header`
  background-color: white;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  min-width: 480px;
  max-width: 1240px;
  margin: auto;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 160px;
`;
