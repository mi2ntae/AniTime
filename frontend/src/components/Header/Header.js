import React from "react";
import NavBar from "./NavBar";
import { styled } from "styled-components";
import Logo from "./Logo";
import Notice from "../Notice/Notice";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function Header() {
  // const member = useSelector((state) => state.member);

  return (
    <StyleHeader>
      <HeaderDiv>
        <Logo />
        <div style={{ flexGrow: 1 }}>
          <NavBar />
        </div>
        <HeaderRight>
          <Img src="/icons/header/ic_help.svg" alt="help" />
          <Notice />
          {/* <Link to={member.token ? "/mypage" : "/login"}> */}
          <Link to={"/mypage"}>
            <Img src="/icons/header/ic_account.svg" alt="account" />
          </Link>
        </HeaderRight>
      </HeaderDiv>
    </StyleHeader>
  );
}

const StyleHeader = styled.header`
  background-color: white;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 1;
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

const Img = styled.img`
  cursor: pointer;
`;
