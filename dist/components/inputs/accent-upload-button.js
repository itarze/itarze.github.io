import React from "../../../_snowpack/pkg/react.js";
import {AccentButton} from "./accent-button.js";
export function AccentUploadButton(props) {
  const input = React.useRef();
  function onChange(e) {
    props.onLoad(e.target.files[0]);
    input.current.value = null;
  }
  return /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: () => input.current && input.current.click()
  }, props.children, /* @__PURE__ */ React.createElement("input", {
    ref: input,
    type: "file",
    accept: "application/json",
    style: {display: "none"},
    onChange
  }));
}
