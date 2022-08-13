import React from "../../../../_snowpack/pkg/react.js";
import {anyKeycodeToString} from "../../../utils/advanced-keys.js";
import {AccentButton} from "../accent-button.js";
import {KeycodeModal} from "../custom-keycode-modal.js";
export const PelpiKeycodeInput = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: () => setShowModal(true)
  }, anyKeycodeToString(props.value)), showModal && /* @__PURE__ */ React.createElement(KeycodeModal, {
    defaultValue: props.value,
    onChange: props.setValue,
    onConfirm: (keycode) => {
      props.setValue(keycode);
      setShowModal(false);
    },
    onExit: () => setShowModal(false)
  }));
};
