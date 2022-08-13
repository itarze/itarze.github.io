import React from "../../../../_snowpack/pkg/react.js";
import {AccentButton} from "../accent-button.js";
export const PelpiToggleInput = (props) => {
  return /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: () => props.setValue(0)
  }, props.meta.label);
};
