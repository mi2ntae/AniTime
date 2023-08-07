import { css, styled } from "styled-components";
import { Box } from "@mui/material";
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  ${({ $vertical }) =>
    $vertical &&
    css`
      flex-direction: column;
      justify-content: flex-start;
    `}
  margin: auto;
  margin-top: 64px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  max-width: 1240px;
  min-width: 800px;
  min-height: calc(100vh - 160px);
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  border: ${({ $border }) => $border || "none"};
  border-radius: 8px;
  background-color: ${({ $background_color }) => $background_color || "white"};
  color: ${({ color }) => color || "black"};
  padding: ${({ padding }) => padding || "8px"};
  margin: ${({ margin }) => margin || "8px"};
  cursor: pointer;
`;

const HorizontalContainer = styled.div`
  // display: flex;
  // justify-content: center;
  // margin: auto;
  // margin-top: 64px;
  // padding: 20px;
  // box-sizing: border-box;
  // // width: 100%;
  // max-width: 80%;
  // min-width: 800px;
  // min-height: calc(100vh - 160px);

  display: flex;
  justify-content: space-between;
  width: 60%;
  margin: 96px auto 32px auto;
`;

const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 39px;
  margin-bottom: 74px;
`;

const StyledBox = styled(Box)`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "85px"};
  background-color: ${({ background_color }) => background_color || "#3994F0"};
  color: ${({ color }) => color || "white"};
`;

export { MainContainer, Button, HorizontalContainer, ProgressBar, StyledBox };
