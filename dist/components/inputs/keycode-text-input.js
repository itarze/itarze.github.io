import React from "../../../_snowpack/pkg/react.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import {
  advancedStringToKeycode,
  anyKeycodeToString
} from "../../utils/advanced-keys.js";
const NormalInput = styled.input`
  border: none;
  border-bottom: 1px solid var(--color_dark-grey);
  color: var(--color_accent);
  background: var(--color_light-jet);
  transition: all 0.4s ease-out;
  font-size: 18px;
  margin-bottom: 25px;
  height: 30px;
  padding: 0 5px;
  &:focus {
    outline: none;
    color: var(--color_accent);
    border-color: var(--color_accent);
  }
  &::placeholder {
    color: var(--color_dark-grey);
  }
`;
const ErrorInput = styled(NormalInput)`
  border-color: #d15e5e;
  color: #d15e5e;
`;
export class KeycodeTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = (e) => {
      const value = e.target.value;
      this.setState({currentValue: value});
    };
    this.handleBlur = (e) => {
      const {onBlur, basicKeyToByte: basicKeyToByte2} = this.props;
      const {lastDefault} = this.state;
      const value = e.target.value.trim().toUpperCase();
      const advancedParsed = advancedStringToKeycode(value, basicKeyToByte2);
      if (Object.keys(basicKeyToByte2).includes(value)) {
        if (lastDefault !== basicKeyToByte2[value]) {
          onBlur(basicKeyToByte2[value]);
        }
        this.setState({isError: false});
      } else if (advancedParsed !== 0) {
        if (lastDefault !== advancedParsed) {
          onBlur(advancedParsed);
        }
        this.setState({isError: false});
      } else if (new RegExp(/^0x[0-9A-Fa-f]{1,4}$/g).test(e.target.value.trim())) {
        onBlur(parseInt(e.target.value.trim(), 16));
        this.setState({isError: false});
      } else {
        this.setState({isError: true});
      }
    };
    const {defaultValue, basicKeyToByte, byteToKey} = props;
    let currentValue = anyKeycodeToString(defaultValue, basicKeyToByte, byteToKey);
    this.state = {
      lastDefault: defaultValue,
      defaultValueAsString: currentValue,
      currentParsed: defaultValue,
      currentValue,
      isError: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.lastDefault !== props.defaultValue && state.currentParsed !== props.defaultValue) {
      return {
        ...state,
        currentValue: anyKeycodeToString(props.defaultValue, props.basicKeyToByte, props.byteToKey),
        currentParsed: props.defaultValue,
        lastDefault: props.defaultValue
      };
    }
    return state;
  }
  render() {
    const {currentValue, isError} = this.state;
    const InputComponent = isError ? ErrorInput : NormalInput;
    return /* @__PURE__ */ React.createElement(InputComponent, {
      type: "text",
      placeholder: this.props.defaultValue ? this.state.defaultValueAsString : "KC_NO, 0xFF, etc.",
      value: currentValue,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      className: this.props.className
    });
  }
}
export default KeycodeTextInput;
