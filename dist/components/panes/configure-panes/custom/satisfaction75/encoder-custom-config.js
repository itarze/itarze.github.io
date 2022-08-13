import React from "../../../../../../_snowpack/pkg/react.js";
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
export class EncoderCustomConfig extends React.Component {
  constructor() {
    super(...arguments);
    this.handleInputChange = (newValue, behaviorIdx) => {
      const {encoderIdx, onChange} = this.props;
      onChange(encoderIdx, behaviorIdx, newValue);
    };
  }
  render() {
    const {
      title,
      behaviors: [cw, ccw, press]
    } = this.props;
    return /* @__PURE__ */ React.createElement(RowDiv, null, /* @__PURE__ */ React.createElement(LabelText, null, title), /* @__PURE__ */ React.createElement(KeyInput, {
      defaultValue: cw,
      onBlur: (newValue) => this.handleInputChange(newValue, 0)
    }), /* @__PURE__ */ React.createElement(KeyInput, {
      defaultValue: ccw,
      onBlur: (newValue) => this.handleInputChange(newValue, 1)
    }), /* @__PURE__ */ React.createElement(KeyInput, {
      defaultValue: press,
      onBlur: (newValue) => this.handleInputChange(newValue, 2)
    }));
  }
}
export default EncoderCustomConfig;
