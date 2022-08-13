import React from "../../../_snowpack/pkg/react.js";
import Slider from "../../../_snowpack/pkg/rc-slider.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
const Container = styled.span`
  display: inline-block;
  line-height: initial;
  width: 200px;
`;
export const AccentRange = (props) => /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Slider, {
  ...props,
  railStyle: {backgroundColor: "var(--color_dark-grey)"},
  trackStyle: {backgroundColor: "var(--color_accent)"},
  handleStyle: {
    borderColor: "var(--color_accent)",
    backgroundColor: "var(--color_accent)"
  }
}));
