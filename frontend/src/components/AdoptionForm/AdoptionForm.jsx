import React from "react";
import { styled } from "styled-components";

/**
 * 보호소 회원 마이페이지 미팅 내역 상세와
 * 미팅페이지에서 입양 폼 이미지를 불러오는 컴포넌트
 */
export default function AdoptionForm({ url }) {
  return (
    <Img
      title="확대하려면 클릭하세요"
      src={url}
      alt="입양신청폼"
      onClick={(e) => {
        window.open(`${url}`, "Child", "width=fit-content, height=fit-content");
      }}
    />
  );
}

const Img = styled.img`
  width: 100%;
  height: fit-content;
  min-height: 200px;
  cursor: pointer;
`;
