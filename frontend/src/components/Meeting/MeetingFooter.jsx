import React from "react";
import { styled } from "styled-components";

export default function MeetingFooter() {
  return <Footer></Footer>;
}

const Footer = styled.div`
  background-color: #2e2f39;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
  color: white;
`;
