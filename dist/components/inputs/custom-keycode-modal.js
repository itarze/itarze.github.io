import React, {useState} from "../../../_snowpack/pkg/react.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import {AccentButton} from "./accent-button.js";
import {AutocompleteItem} from "./autocomplete-keycode.js";
import {
  anyKeycodeToString,
  advancedStringToKeycode
} from "../../utils/advanced-keys.js";
import {useCombobox} from "../../../_snowpack/pkg/downshift.js";
import TextInput from "./text-input.js";
import {getKeycodesForKeyboard} from "../../utils/key.js";
import {useAppSelector} from "../../store/hooks.js";
import {
  getBasicKeyToByte,
  getSelectedDefinition
} from "../../store/definitionsSlice.js";
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const ModalContainer = styled.div`
  width: 480px;
  height: 200px;
  background-color: var(--color_jet);
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const PromptText = styled.h4`
  font-weight: 500;
  color: var(--color_medium-grey);
  font-size: 20px;
  margin: 0 0 20px 0;
`;
const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 220px;
`;
const AutocompleteContainer = styled.li`
  position: fixed;
  background-color: var(--color_light-jet);
  max-height: 210px;
  overflow: auto;
  border: 1px solid var(--color_dark-grey);
  margin: 0;
  padding: 0;
  width: auto;
  margin-top: -24px;
  line-height: normal;
`;
const AutocompleteItemRow = styled.li`
  &:not(:last-child) {
    border-bottom: 1px solid var(--color_dark-grey);
  }
`;
function isHex(input) {
  const lowercased = input.toLowerCase();
  const parsed = parseInt(lowercased, 16);
  return `0x${parsed.toString(16).toLowerCase()}` === lowercased;
}
function inputIsBasicByte(input, basicKeyToByte) {
  const keyCode = input.trim().toUpperCase();
  return keyCode in basicKeyToByte;
}
function basicByteFromInput(input, basicKeyToByte) {
  const keyCode = input.trim().toUpperCase();
  return basicKeyToByte[keyCode];
}
function inputIsAdvancedKeyCode(input, basicKeyToByte) {
  const keyCode = input.trim().toUpperCase();
  return advancedStringToKeycode(keyCode, basicKeyToByte) !== 0;
}
function advancedKeyCodeFromInput(input, basicKeyToByte) {
  const keyCode = input.trim().toUpperCase();
  return advancedStringToKeycode(keyCode, basicKeyToByte);
}
function inputIsHex(input) {
  return isHex(input.trim());
}
function hexFromInput(input) {
  const lowercased = input.toLowerCase();
  return parseInt(lowercased, 16);
}
function inputIsValid(input, basicKeyToByte) {
  return inputIsBasicByte(input, basicKeyToByte) || inputIsAdvancedKeyCode(input, basicKeyToByte) || inputIsHex(input);
}
function keycodeFromInput(input, basicKeyToByte) {
  if (inputIsBasicByte(input, basicKeyToByte)) {
    return basicByteFromInput(input, basicKeyToByte);
  }
  if (inputIsAdvancedKeyCode(input, basicKeyToByte)) {
    return advancedKeyCodeFromInput(input, basicKeyToByte);
  }
  if (inputIsHex(input)) {
    return hexFromInput(input);
  }
  return null;
}
const getInputItems = (arr) => arr.map((k) => {
  var _a;
  return {
    code: k.code,
    label: (_a = k.title) != null ? _a : k.name
  };
});
export const KeycodeModal = (props) => {
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const {basicKeyToByte, byteToKey} = useAppSelector(getBasicKeyToByte);
  if (!selectedDefinition) {
    return null;
  }
  const supportedInputItems = getInputItems(getKeycodesForKeyboard(selectedDefinition));
  const [inputItems, setInputItems] = useState(supportedInputItems);
  const defaultInput = anyKeycodeToString(props.defaultValue, basicKeyToByte, byteToKey);
  const {
    getMenuProps,
    getComboboxProps,
    getInputProps,
    highlightedIndex,
    inputValue,
    getItemProps,
    isOpen
  } = useCombobox({
    items: inputItems,
    initialIsOpen: defaultInput === "",
    defaultInputValue: defaultInput,
    itemToString: (item) => {
      var _a;
      return (_a = item == null ? void 0 : item.code) != null ? _a : "";
    },
    onInputValueChange: ({inputValue: inputValue2}) => {
      setInputItems(supportedInputItems.filter(({label, code}) => [label, code].flatMap((s) => s.split(/\s+/)).map((s) => s.toLowerCase()).some((s) => s.startsWith((inputValue2 != null ? inputValue2 : "").toLowerCase()))));
    }
  });
  const isValid = inputIsValid(inputValue, basicKeyToByte);
  return /* @__PURE__ */ React.createElement(ModalBackground, null, /* @__PURE__ */ React.createElement(ModalContainer, null, /* @__PURE__ */ React.createElement(PromptText, null, "Please enter your desired QMK keycode or hex code:"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    ...getComboboxProps()
  }, /* @__PURE__ */ React.createElement(TextInput, {
    ...getInputProps(),
    type: "text",
    placeholder: defaultInput || "KC_NO, 0xFF, etc."
  })), /* @__PURE__ */ React.createElement(AutocompleteContainer, {
    ...getMenuProps(),
    style: {
      display: isOpen && inputItems.length ? "block" : "none"
    }
  }, isOpen && inputItems.map((item, index) => /* @__PURE__ */ React.createElement(AutocompleteItemRow, {
    ...getItemProps({item, index})
  }, /* @__PURE__ */ React.createElement(AutocompleteItem, {
    selected: highlightedIndex === index,
    entity: item,
    key: item.code
  }))))), /* @__PURE__ */ React.createElement(RowDiv, null, /* @__PURE__ */ React.createElement(AccentButton, {
    disabled: !isValid,
    onClick: () => {
      props.onConfirm(keycodeFromInput(inputValue, basicKeyToByte));
    }
  }, "Confirm"), /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: props.onExit
  }, "Cancel"))));
};
