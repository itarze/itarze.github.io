import React from "../../../../../../_snowpack/pkg/react.js";
import styled from "../../../../../../_snowpack/pkg/styled-components.js";
const MODES = {
  ENC_MODE_VOLUME: 0,
  ENC_MODE_MEDIA: 1,
  ENC_MODE_SCROLL: 2,
  ENC_MODE_BRIGHTNESS: 3,
  ENC_MODE_BACKLIGHT: 4,
  ENC_MODE_CUSTOM0: 5,
  ENC_MODE_CUSTOM1: 6,
  ENC_MODE_CUSTOM2: 7
};
const MODE_LABELS = {
  ENC_MODE_VOLUME: "Volume",
  ENC_MODE_MEDIA: "Media",
  ENC_MODE_SCROLL: "Scroll",
  ENC_MODE_BRIGHTNESS: "Brightness",
  ENC_MODE_BACKLIGHT: "Backlight",
  ENC_MODE_CUSTOM0: "Custom 0",
  ENC_MODE_CUSTOM1: "Custom 1",
  ENC_MODE_CUSTOM2: "Custom 2"
};
const CenteredColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
export class EncoderModeToggle extends React.Component {
  constructor() {
    super(...arguments);
    this.handleInputChange = (event) => {
      const {enabledModes, onChange} = this.props;
      const {
        target: {checked: value, name}
      } = event;
      const flagBit = 1 << MODES[name];
      const newEnabledModes = value ? enabledModes | flagBit : enabledModes & ~flagBit;
      onChange(newEnabledModes);
    };
    this.isChecked = (modeIdx) => (1 << modeIdx & this.props.enabledModes) > 0;
  }
  render() {
    return /* @__PURE__ */ React.createElement(CenteredColumnDiv, null, /* @__PURE__ */ React.createElement("h3", null, "Enabled Encoder Modes:"), /* @__PURE__ */ React.createElement("p", null, "Only the selected encoder modes will be available on the keyboard"), /* @__PURE__ */ React.createElement(ColumnDiv, null, Object.entries(MODES).map(([key, value]) => /* @__PURE__ */ React.createElement("label", {
      key: value,
      htmlFor: MODE_LABELS[key]
    }, /* @__PURE__ */ React.createElement("input", {
      name: key,
      id: MODE_LABELS[key],
      type: "checkbox",
      checked: this.isChecked(value),
      onChange: this.handleInputChange,
      key: value
    }), MODE_LABELS[key]))));
  }
}
export default EncoderModeToggle;
