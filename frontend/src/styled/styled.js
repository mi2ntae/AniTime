import { styled } from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  justify-content: ${({ justifyContent }) => justifyContent || "space-between"};
  margin: auto;
  margin-top: 64px;
  padding: 20px;

  box-sizing: border-box;
  width: 100%;
  min-width: 480px;
  max-width: 1240px;
  min-height: calc(100vh - 160px);
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  border: none;
  border-radius: 8px;
  background-color: ${({ background_color }) => background_color || "white"};
  color: ${({ color }) => color || "black"};
  padding: ${({ padding }) => padding || "8px"};
  margin: ${({ margin }) => margin || "8px"};
  cursor: pointer;
`;

export { MainContainer, Button };
