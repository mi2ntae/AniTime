import React from "react";
import { styled } from "styled-components";
import { Button } from "styled/styled";

export default function ShelterDonation() {
  return (
    <>
      <TabHeader>
        <TabTitle>후원 현황</TabTitle>
        <Button $background_color="#3994F0" color="#FFFFFF">
          후원공고 등록하기
        </Button>
      </TabHeader>
      <div>내용?</div>
    </>
  );
}

const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
`;
const TabTitle = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 16px;
`;
