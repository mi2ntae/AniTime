import React from "react";
import { styled } from "styled-components";

export default function Footer() {
  return (
    <StyleFooter>
      <FooterDiv>
        <span
          style={{
            color: "var(--darkestgrey, #535A61)",
            fontFeatureSettings: "'clig' off, 'liga' off",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          Copyright © Mo. I | All Rights Reserved{" "}
        </span>
        <span
          style={{
            color: "var(--darkestgrey, #535A61)",
            fontFeatureSettings: "'clig' off, 'liga' off",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          권지훈 | 김민태 | 김정현 | 임성원 | 장명주 | 허재웅
        </span>
      </FooterDiv>
    </StyleFooter>
  );
}

const StyleFooter = styled.footer`
  background-color: #f7f8fa;
  height: 96px;
  padding: 0 24px;
`;

const FooterDiv = styled.div`
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
