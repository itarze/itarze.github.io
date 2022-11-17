import React from "../../../../../../_snowpack/pkg/react.js";
import {getBasicKeyToByte} from "../../../../../store/definitionsSlice.js";
import {useAppSelector} from "../../../../../store/hooks.js";
import styled from "../../../../../../_snowpack/pkg/styled-components.js";
import KeycodeTextInput from "../../../../inputs/keycode-text-input.js";
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4px;
`;
const LabelText = styled.span`
  font-weight: 650;
  margin-right: 8px;
  width: 80px;
`;
const KeyInput = styled(KeycodeTextInput)`
  width: 64px;
  margin-right: 8px;
`;
export const EncoderCustomConfig = (props) => {
  const {
    encoderIdx,
    onChange,
    title,
    behaviors: [cw, ccw, press]
  } = props;
  const {basicKeyToByte, byteToKey} = useAppSelector(getBasicKeyToByte);
  const handleInputChange = (newValue, behaviorIdx) => {
    onChange(encoderIdx, behaviorIdx, newValue);
  };
  return /* @__PURE__ */ React.createElement(RowDiv, null, /* @__PURE__ */ React.createElement(LabelText, null, title), /* @__PURE__ */ React.createElement(KeyInput, {
    defaultValue: cw,
    basicKeyToByte,
    byteToKey,
    onBlur: (newValue) => handleInputChange(newValue, 0)
  }), /* @__PURE__ */ React.createElement(KeyInput, {
    defaultValue: ccw,
    basicKeyToByte,
    byteToKey,
    onBlur: (newValue) => handleInputChange(newValue, 1)
  }), /* @__PURE__ */ React.createElement(KeyInput, {
    defaultValue: press,
    basicKeyToByte,
    byteToKey,
    onBlur: (newValue) => handleInputChange(newValue, 2)
  }));
};
export default EncoderCustomConfig;
