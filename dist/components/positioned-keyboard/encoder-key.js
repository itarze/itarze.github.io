import React, {memo} from "../../../_snowpack/pkg/react.js";
import {
  getDarkenedColor,
  getEncoderKeyContainerPosition,
  getRotationContainerTransform,
  KeyContainer,
  Legend,
  RotationContainer
} from "./base.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
const noop = (...args) => {
};
export const OuterEncoderKey = styled.div`
  overflow: hidden;
  border: 2px solid var(--color_accent);
  border-style: dotted;
  border-color: ${(props) => props.selected ? `var(--color_accent)` : props.backgroundColor};
  background-color: ${(props) => props.selected ? `var(--color_dark-accent)` : getDarkenedColor(props.backgroundColor)};
  animation-duration: ${(props) => props.selected ? 2 : 0}s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  height: 100%;
  border-radius: 50%;
  box-sizing: border-box;
  display: block;
  margin-right: 2px;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InnerEncoderKey = styled.div`
  width: 90%;
  height: 90%;
  background-color: ${(props) => props.selected ? `var(--color_accent)` : props.backgroundColor};
  background-color: #363434;
  color: #e8c4b8;
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const getEncoderLegends = (labels, t) => {
  return labels.map((label) => {
    const splitLabels = (label || "").split(" ");
    const minifiedLabel = splitLabels.map((l) => l[0]).join("");
    return /* @__PURE__ */ React.createElement(Legend, {
      key: label || "",
      color: "#E8C4B8",
      style: {fontSize: "8px", textAlign: "center"}
    }, minifiedLabel);
  });
};
export const InnerEncoderKeyContainer = styled.div``;
export const EncoderKeyComponent = memo(({
  x,
  y,
  w,
  h,
  c,
  t,
  r = 0,
  rx = 0,
  ry = 0,
  label,
  selected,
  id,
  onClick = noop
}) => {
  const containerOnClick = (evt) => {
    evt.stopPropagation();
    onClick(id);
  };
  const keyContainerStyle = getEncoderKeyContainerPosition({
    w,
    h,
    x,
    y
  });
  return /* @__PURE__ */ React.createElement(RotationContainer, {
    selected,
    style: {...getRotationContainerTransform({r, rx, ry})}
  }, /* @__PURE__ */ React.createElement(KeyContainer, {
    selected,
    style: keyContainerStyle,
    onClick: containerOnClick
  }, /* @__PURE__ */ React.createElement(OuterEncoderKey, {
    backgroundColor: c,
    selected,
    style: {borderWidth: `${~~(keyContainerStyle.height / 18)}px`}
  }, /* @__PURE__ */ React.createElement(InnerEncoderKey, {
    selected,
    backgroundColor: c
  }, /* @__PURE__ */ React.createElement(InnerEncoderKeyContainer, null)))));
});
