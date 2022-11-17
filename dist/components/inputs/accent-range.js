import React from "../../../_snowpack/pkg/react.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
const Container = styled.span`
  display: inline-block;
  line-height: initial;
  width: 200px;
`;
const SliderInput = styled.input.attrs({type: "range"})`
  accent-color: var(--color_accent);
  width: 100%;
`;
export const AccentRange = (props) => /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(SliderInput, {
  ...props,
  onChange: (e) => {
    props.onChange && props.onChange(+e.target.value);
  }
}));
