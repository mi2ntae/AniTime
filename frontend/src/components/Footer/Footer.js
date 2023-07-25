import React from "react";
import { styled } from "styled-components";

export default function Footer() {
  return (
    <StyleFooter>
      <Div>
        <span>Copyright © Mo. I | All Rights Reserved </span>
        <span>권지훈 | 김민태 | 김정현 | 임성원 | 장명주 | 허재웅</span>
      </Div>
    </StyleFooter>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: 16px;
  height: 80px;
  min-width: 480px;
  max-width: 1240px;
  margin: auto;
`;

const StyleFooter = styled.footer`
  align-items: end;
  background-color: #f7f8fa;
  height: 96px;
  padding: 0 24px;
`;
