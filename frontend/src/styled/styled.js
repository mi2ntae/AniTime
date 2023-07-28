import { css, styled } from "styled-components";

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
  border: none;
  border-radius: 8px;
  background-color: ${({ background_color }) => background_color || "white"};
  color: ${({ color }) => color || "black"};
  padding: ${({ padding }) => padding || "8px"};
  margin: ${({ margin }) => margin || "8px"};
  cursor: pointer;
`;

export { MainContainer, Button };
