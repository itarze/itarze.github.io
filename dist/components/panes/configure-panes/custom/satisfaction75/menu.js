import React, {Component} from "../../../../../../_snowpack/pkg/react.js";
import styled from "../../../../../../_snowpack/pkg/styled-components.js";
import Select from "../../../../../../_snowpack/pkg/react-select.js";
import {
  getEncoderModes,
  setEncoderModes,
  getDefaultOLED,
  setDefaultOLED,
  getOLEDMode,
  setOLEDMode,
  getCustomEncoderConfig,
  setCustomEncoderConfig
} from "./api.js";
import {EncoderModeToggle} from "./encoder-mode-toggle.js";
import {EncoderCustomConfig} from "./encoder-custom-config.js";
import {getSelectedConnectedDevice} from "../../../../../store/devicesSlice.js";
import {useAppSelector} from "../../../../../store/hooks.js";
const MenuContainer = styled.div`
  display: flex;
  color: #717070;
  padding: 24px;
  font-family: GothamRounded;
  h3 {
    margin: 4px 0;
  }
  p {
    margin: 4px 0 8px 0;
    width: 288px;
    font-size: 13px;
    text-align: center;
  }
`;
const SectionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;
const OLEDSelectContainer = styled.div`
  width: 156px;
  margin-bottom: 12px;
`;
const CustomEncoderContainer = styled.div`
  padding-left: 112px;
  display: flex;
  flex-direction: row;
`;
const LabelText = styled.span`
  font-weight: 650;
  margin-right: 8px;
  width: 64px;
`;
const OLED_OPTIONS = [
  {value: 0, label: "Default"},
  {value: 1, label: "Time"},
  {value: 2, label: "Off"}
];
export const SatisfactionMenu = () => {
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  if (selectedDevice) {
    return /* @__PURE__ */ React.createElement(BaseSatisfactionMenu, {
      api: selectedDevice.api
    });
  }
  return null;
};
class BaseSatisfactionMenu extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      enabledModes: 31,
      defaultOLEDMode: 0,
      currOLEDMode: 0,
      encoderBehaviors: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    };
    this.fetchDataAndSet = async () => {
      const {api} = this.props;
      const promises = [
        getEncoderModes(api),
        getDefaultOLED(api),
        getOLEDMode(api),
        getCustomEncoderConfig(api, 0),
        getCustomEncoderConfig(api, 1),
        getCustomEncoderConfig(api, 2)
      ];
      const [
        enabledModes,
        defaultOLEDMode,
        currOLEDMode,
        encoder0,
        encoder1,
        encoder2
      ] = await Promise.all(promises);
      this.setState({
        enabledModes,
        defaultOLEDMode,
        currOLEDMode,
        encoderBehaviors: [encoder0, encoder1, encoder2]
      });
    };
    this.onEncoderModeChange = (newEncoderModes) => {
      const {api} = this.props;
      const {enabledModes: currentModes} = this.state;
      if (currentModes !== newEncoderModes) {
        this.setState({enabledModes: newEncoderModes});
        setEncoderModes(api, newEncoderModes);
      }
    };
    this.onEncoderCustomConfigChange = (encoderIdx, behavior, newValue) => {
      const {api} = this.props;
      const newBehaviors = [...this.state.encoderBehaviors];
      newBehaviors[encoderIdx][behavior] = newValue;
      this.setState({encoderBehaviors: newBehaviors});
      setCustomEncoderConfig(api, encoderIdx, behavior, newValue);
    };
    this.onOLEDDefaultChange = (input) => {
      const {value: newDefaultOLEDMode} = input;
      const {api} = this.props;
      const {defaultOLEDMode: currentMode} = this.state;
      if (currentMode !== newDefaultOLEDMode) {
        this.setState({defaultOLEDMode: newDefaultOLEDMode});
        setDefaultOLED(api, newDefaultOLEDMode);
      }
    };
    this.onOLEDChange = (input) => {
      const {value: newOLEDMode} = input;
      const {api} = this.props;
      const {currOLEDMode} = this.state;
      if (currOLEDMode !== newOLEDMode) {
        this.setState({currOLEDMode: newOLEDMode});
        setOLEDMode(api, newOLEDMode);
      }
    };
  }
  componentDidMount() {
    this.fetchDataAndSet();
  }
  render() {
    const {api} = this.props;
    const {enabledModes, defaultOLEDMode, currOLEDMode, encoderBehaviors} = this.state;
    if (api) {
      return /* @__PURE__ */ React.createElement(MenuContainer, null, /* @__PURE__ */ React.createElement(SectionContainer, null, /* @__PURE__ */ React.createElement(EncoderModeToggle, {
        onChange: this.onEncoderModeChange,
        enabledModes
      })), /* @__PURE__ */ React.createElement(SectionContainer, null, /* @__PURE__ */ React.createElement("h3", null, "Default OLED Mode:"), /* @__PURE__ */ React.createElement("p", null, "This is the OLED mode that will be selected by default when you plug in your keyboard."), /* @__PURE__ */ React.createElement(OLEDSelectContainer, null, /* @__PURE__ */ React.createElement(Select, {
        value: OLED_OPTIONS.find((e) => e.value === defaultOLEDMode),
        onChange: this.onOLEDDefaultChange,
        options: OLED_OPTIONS
      })), /* @__PURE__ */ React.createElement("h3", null, "Current OLED Mode:"), /* @__PURE__ */ React.createElement("p", null, "Change your ", "keyboard's", " current OLED mode"), /* @__PURE__ */ React.createElement(OLEDSelectContainer, null, /* @__PURE__ */ React.createElement(Select, {
        value: OLED_OPTIONS.find((e) => e.value === currOLEDMode),
        onChange: this.onOLEDChange,
        options: OLED_OPTIONS,
        menuPlacement: "top"
      }))), /* @__PURE__ */ React.createElement(SectionContainer, null, /* @__PURE__ */ React.createElement("h3", null, "Custom Encoder Configuration:"), /* @__PURE__ */ React.createElement("p", null, "Configure the behavior of encoder custom modes"), /* @__PURE__ */ React.createElement(CustomEncoderContainer, null, /* @__PURE__ */ React.createElement(LabelText, null, "CW"), /* @__PURE__ */ React.createElement(LabelText, null, "CCW"), /* @__PURE__ */ React.createElement(LabelText, null, "Press")), /* @__PURE__ */ React.createElement(EncoderCustomConfig, {
        title: "Custom 0",
        encoderIdx: 0,
        behaviors: encoderBehaviors[0],
        onChange: this.onEncoderCustomConfigChange
      }), /* @__PURE__ */ React.createElement(EncoderCustomConfig, {
        title: "Custom 1",
        encoderIdx: 1,
        behaviors: encoderBehaviors[1],
        onChange: this.onEncoderCustomConfigChange
      }), /* @__PURE__ */ React.createElement(EncoderCustomConfig, {
        title: "Custom 2",
        encoderIdx: 2,
        behaviors: encoderBehaviors[2],
        onChange: this.onEncoderCustomConfigChange
      })));
    }
    return null;
  }
}
