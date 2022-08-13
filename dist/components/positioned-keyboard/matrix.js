import React from "../../../_snowpack/pkg/react.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
export const Matrix = ({rowKeys, colKeys}) => /* @__PURE__ */ React.createElement(SVG, null, rowKeys.map((arr, index) => /* @__PURE__ */ React.createElement(RowLine, {
  points: arr.map((point) => (point || []).join(",")).join(" "),
  key: index
})), colKeys.map((arr, index) => /* @__PURE__ */ React.createElement(ColLine, {
  points: arr.map((point) => (point || []).join(",")).join(" "),
  key: index
})));
const SVG = styled.svg`
  transform: rotateZ(0);
  width: 100%;
  height: 100%;
`;
const RowLine = styled.polyline`
  stroke: var(--color_accent);
  stroke-width: 3;
  fill-opacity: 0;
  stroke-opacity: 0.4;
  stroke-linecap: round;
`;
const ColLine = styled.polyline`
  stroke: var(--color_light-grey);
  stroke-width: 3;
  fill-opacity: 0;
  stroke-opacity: 0.4;
  stroke-linecap: round;
`;
