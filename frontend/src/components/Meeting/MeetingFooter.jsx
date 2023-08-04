import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import React from "react";
import { styled } from "styled-components";
import { Button } from "styled/styled";

export default function MeetingFooter({ control, handleControl, close }) {
  return (
    <Footer>
      <LeftDiv>
        <ImgButton>
          {control.video ? (
            <Videocam
              fontSize="large"
              sx={{ cursor: "pointer" }}
              onClick={() => handleControl((p) => ({ ...p, video: false }))}
            />
          ) : (
            <VideocamOff
              fontSize="large"
              onClick={() => handleControl((p) => ({ ...p, video: true }))}
              sx={{ opacity: "0.5", cursor: "pointer" }}
            />
          )}
          비디오 {control.video ? " 중지" : " 시작"}
        </ImgButton>
        <VerticalLine />
        <ImgButton>
          {control.mic ? (
            <Mic
              fontSize="large"
              onClick={() => handleControl((p) => ({ ...p, mic: false }))}
              sx={{ cursor: "pointer" }}
            />
          ) : (
            <MicOff
              fontSize="large"
              onClick={() => handleControl((p) => ({ ...p, mic: true }))}
              sx={{ opacity: "0.5", cursor: "pointer" }}
            />
          )}
          음소거 {control.mic ? "" : " 해제"}
        </ImgButton>
        <VerticalLine />
        <VolumDiv>
          {control.muted ? (
            <VolumeOff
              fontSize="large"
              onClick={() => handleControl((p) => ({ ...p, muted: false }))}
              sx={{ opacity: "0.5", cursor: "pointer" }}
            />
          ) : (
            <VolumeUp
              fontSize="large"
              onClick={() => handleControl((p) => ({ ...p, muted: true }))}
              sx={{ cursor: "pointer" }}
            />
          )}
        </VolumDiv>
      </LeftDiv>
      <RightDiv>
        <Button
          $background_color="#F05050"
          color="white"
          style={{ width: "120px", fontSize: "1.1rem" }}
          onClick={close}
        >
          상담종료
        </Button>
      </RightDiv>
    </Footer>
  );
}

const Footer = styled.div`
  background-color: #2e2f39;
  box-sizing: border-box;
  width: 100%;
  height: 152px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  gap: 16px;
  color: white;
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
`;
const RightDiv = styled.div`
  display: flex;
`;
const ImgButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 88px;
`;
const VolumDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VerticalLine = styled.div`
  background-color: white;
  width: 1px;
`;
