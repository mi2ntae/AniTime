import React from "react";
import OvVideoComponent from "./OvVideo";
import { styled } from "styled-components";

export default function StreamComponent({ streamManager }) {
  return (
    <Div>
      <OvVideoComponent streamManager={streamManager} />
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
