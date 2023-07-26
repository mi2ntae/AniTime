import { styled } from "styled-components";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: 64px;
  padding: 20px;

  box-sizing: border-box;
  width: 100%;
  min-width: 480px;
  max-width: 1000px;
  min-height: calc(100vh - 160px);
`;

export { MainContainer };
