import React from "react";
import { styled } from "styled-components";
import { MainContainer } from "styled/styled";
import DesertionGuide from "./DesertionGuide";
import ReservationForm from "components/SelectTime/ReservationForm";
import SelectTime from "../SelectTime/SelectTime";

export default function DesertionReservation() {
  var agreed = true;
  var selected = false;
  // 배경색 넣기
  return (
    <MainContainer
      style={{
        width: "100vw",
        backgroundColor: "#F7F8FA !important",
      }}
    >
      {agreed ? (
        <div
          style={{
            width: "inherit",
          }}
        >
          <ProgressBar>
            <div>
              {selected ? (
                <img src={`/icons/Component 25.svg`} />
              ) : (
                <img src={`/icons/Component 24.svg`} />
              )}
            </div>
            <div
              style={{
                width: "312px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={
                  selected
                    ? {
                        color: "#7D848A",
                      }
                    : {
                        color: "#35383B",
                        fontWeight: "bold",
                      }
                }
              >
                미팅일자 선택
              </div>
              <div
                style={
                  selected
                    ? {
                        color: "#35383B",
                        fontWeight: "bold",
                      }
                    : {
                        color: "#7D848A",
                      }
                }
              >
                신청서 작성
              </div>
            </div>
          </ProgressBar>
          {selected ? <ReservationForm /> : <SelectTime />}
        </div>
      ) : (
        <DesertionGuide />
      )}
    </MainContainer>
  );
}

const PageContainer = styled.div`
  border: 2px solid blue;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 39px;
  margin-bottom: 74px;
`;
