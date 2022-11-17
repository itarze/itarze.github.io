import React from "../../../../../../_snowpack/pkg/react.js";
import styled from "../../../../../../_snowpack/pkg/styled-components.js";
import {ControlRow, Label, Detail} from "../../../grid.js";
import {AccentSlider} from "../../../../inputs/accent-slider.js";
import {ErrorMessage} from "../../../../styled.js";
import {AccentButton} from "../../../../inputs/accent-button.js";
import ReactTextareaAutocomplete from "../../../../../../_snowpack/pkg/@webscopeio/react-textarea-autocomplete.js";
import {
  AutocompleteItem,
  AutocompleteLoading,
  findKeycodes
} from "../../../../inputs/autocomplete-keycode.js";
import {getMacroValidator} from "../../../../../utils/macro-api/index.js";
const ToastErrorMessage = styled(ErrorMessage)`
  margin: 0;
  width: 100%;
  font-size: 14px;
  display: block;
  &:empty {
    display: none;
  }
`;
const Message = styled.div`
  color: var(--color_accent);
`;
const Link = styled.a`
  font-size: 18x !important;
  color: var(--color_accent);
  text-decoration: underline;
`;
const DescriptionLabel = styled(Label)`
  font-size: 14px;
  line-height: 18px;
  font-style: oblique;
  color: var(--color_dark-grey);
  padding-left: 5px;
`;
const AutoHeightRow = styled(ControlRow)`
  height: auto;
`;
const TextArea = styled.textarea`
  box-sizing: border-box;
  background: var(--color_jet);
  padding: 5px 10px;
  border-color: var(--color_medium-grey);
  color: var(--color_medium-grey);
  width: 100%;
  height: 200px;
  font-size: 16px;
  line-height: 18px;
  resize: none;
  font-family: 'Source Code Pro';
  font-weight: 500;
  &::placeholder {
    color: var(--color_dark-grey);
  }
  &:focus {
    color: var(--color_accent);
    outline-color: var(--color_accent);
  }
`;
export const MacroDetailPane = (props) => {
  const enterToken = "{KC_ENT}";
  const currentMacro = props.macroExpressions[props.selectedMacro] || "";
  const textareaInitialValue = currentMacro.trimRight().replace(new RegExp(`${enterToken}$`), "");
  const [currentValue, setCurrentValue] = React.useState(textareaInitialValue);
  const [appendEnter, setAppendEnter] = React.useState(currentMacro.trimRight().endsWith(enterToken));
  const [errorMessage, setErrorMessage] = React.useState(void 0);
  const saveMacro = () => {
    const value = appendEnter ? currentValue + enterToken : currentValue;
    const validate = getMacroValidator(props.protocol);
    const validationResult = validate(value);
    if (validationResult.isValid) {
      props.saveMacros(value);
      setErrorMessage(void 0);
    } else {
      setErrorMessage(validationResult.errorMessage);
    }
  };
  const hasError = errorMessage !== void 0;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AutoHeightRow, null, /* @__PURE__ */ React.createElement(ReactTextareaAutocomplete, {
    value: currentValue,
    onChange: (e) => setCurrentValue(e.target.value),
    loadingComponent: AutocompleteLoading,
    style: {
      fontSize: "16px",
      lineHeight: "18px",
      width: "100%",
      height: "140px",
      resize: "none",
      borderColor: hasError ? "#d15e5e" : "var(--color_medium-grey)"
    },
    containerStyle: {
      border: "none",
      lineHeight: "20px"
    },
    itemStyle: {
      borderColor: "var(--color_dark-grey)",
      backgroundColor: "var(-color_light-jet)"
    },
    dropdownStyle: {
      zIndex: 999,
      backgroundColor: "var(--color_light-jet)"
    },
    listStyle: {
      position: "fixed",
      backgroundColor: "var(--color_light-jet)",
      maxHeight: "210px",
      overflow: "auto",
      border: "1px solid var(--color_dark-grey)"
    },
    minChar: 0,
    textAreaComponent: TextArea,
    movePopupAsYouType: true,
    placeholder: `Enter the macro you want M${props.selectedMacro} to execute...`,
    trigger: {
      "?": {
        dataProvider: findKeycodes,
        component: AutocompleteItem,
        output: (item) => ({
          text: item.code,
          caretPosition: "end"
        })
      },
      "{": {
        dataProvider: findKeycodes,
        component: AutocompleteItem,
        output: (item) => ({
          text: `{${item.code},`,
          caretPosition: "end"
        })
      },
      ",": {
        dataProvider: findKeycodes,
        component: AutocompleteItem,
        output: (item) => {
          return {
            text: `,${item.code},`,
            caretPosition: "end"
          };
        }
      }
    }
  })), /* @__PURE__ */ React.createElement(AutoHeightRow, null, /* @__PURE__ */ React.createElement(DescriptionLabel, null, /* @__PURE__ */ React.createElement(ToastErrorMessage, null, errorMessage), /* @__PURE__ */ React.createElement(Message, null, "Enter text directly, or wrap", " ", /* @__PURE__ */ React.createElement(Link, {
    href: "https://docs.qmk.fm/#/keycodes_basic",
    target: "_blank"
  }, "Basic Keycodes"), " ", "in ", "{}"), /* @__PURE__ */ React.createElement(Message, null, "Single tap: ", "{KC_XXX}"), /* @__PURE__ */ React.createElement(Message, null, "Chord: ", "{KC_XXX, KC_YYY, KC_ZZZ}"), props.protocol >= 11 ? /* @__PURE__ */ React.createElement(Message, null, "Delay (ms): ", "{NNNN}", " ") : "", /* @__PURE__ */ React.createElement(Message, null, "Type ? to search for keycodes")), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentButton, {
    disabled: currentMacro === (appendEnter ? currentValue + enterToken : currentValue),
    onClick: saveMacro
  }, "Save"))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Tap 'Enter' at end of macro"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
    isChecked: appendEnter,
    onChange: setAppendEnter
  }))));
};
