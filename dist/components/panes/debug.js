import React, {useRef, useState, useEffect, useCallback} from "../../../_snowpack/pkg/react.js";
import {Pane} from "./pane.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import {KeyboardValue} from "../../utils/keyboard-api.js";
import {anyKeycodeToString} from "../../utils/advanced-keys.js";
import {MusicalKeySlider} from "../inputs/musical-key-slider.js";
import {AccentSelect} from "../inputs/accent-select.js";
import {AccentButton} from "../inputs/accent-button.js";
import {AccentSlider} from "../inputs/accent-slider.js";
import {ArrayColorPicker} from "../inputs/color-picker.js";
import {PelpiKeycodeInput} from "../inputs/pelpi/keycode-input.js";
import {BlankPositionedKeyboard, getNextKey} from "../positioned-keyboard.js";
import {authGithub, getUser} from "../../utils/github.js";
import {
  ControlRow,
  Label,
  SubLabel,
  Detail,
  IndentedControlRow,
  OverflowCell,
  FlexCell
} from "./grid.js";
import Layouts from "../Layouts.js";
import {AccentRange} from "../inputs/accent-range.js";
import {useAppSelector} from "../../store/hooks.js";
import {
  getConnectedDevices,
  getSelectedConnectedDevice
} from "../../store/devicesSlice.js";
import {
  getBaseDefinitions,
  getDefinitions,
  getCustomDefinitions,
  getBasicKeyToByte
} from "../../store/definitionsSlice.js";
import TextInput from "../inputs/text-input.js";
import {useSize} from "../../utils/use-size.js";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;
const DebugPane = styled(Pane)`
  height: 100%;
  max-width: 100vw;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;
const MenuPanel = styled(OverflowCell)`
  flex: 1;
  padding: 1rem;

  @media (min-width: 1200px) {
    border: 0 none;
    border-left: 1px solid var(--color_dark-grey);
    max-width: 33rem;
    padding: 1.5rem;
  }
`;
const KeyboardPanel = styled(FlexCell)`
  flex: 1;

  @media (min-width: 1200px) {
    border: 0 none;
    box-sizing: border-box;
    height: 100%;
  }
`;
const ControlGroup = styled.div`
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  width: 100%;

  &:last-child {
    padding-bottom: 0;
  }
`;
const ControlGroupHeader = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 0.5rem;
`;
const GithubUserData = () => {
  const [userData, setUserData] = useState();
  const clickLogin = useCallback(async () => {
    await authGithub();
    const userData2 = await getUser();
    setUserData(userData2);
  }, []);
  useEffect(() => {
    (async () => {
      const userData2 = await getUser();
      setUserData(userData2);
    })();
  }, []);
  return /* @__PURE__ */ React.createElement(ControlGroup, null, /* @__PURE__ */ React.createElement(ControlGroupHeader, null, "GH Integration"), userData && /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, userData.login), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement("img", {
    src: userData.avatar_url,
    width: 40,
    height: 40
  }))), !userData && /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Login"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: clickLogin
  }, "OAuth me"))));
};
const TestControls = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [rangeVal, setRangeVal] = useState(0);
  const [colorVal, setColorVal] = useState([0, 0]);
  const [selectionVal, setSelectionVal] = useState(0);
  const [keycode, setKeycode] = useState(0);
  const {basicKeyToByte, byteToKey} = useAppSelector(getBasicKeyToByte);
  const selectOptions = [
    {label: "Option 1", value: "0"},
    {label: "Option 2", value: "1"}
  ];
  return /* @__PURE__ */ React.createElement(ControlGroup, null, /* @__PURE__ */ React.createElement(ControlGroupHeader, null, "Controls"), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Text Input"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(TextInput, null))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, keycode, " / ", anyKeycodeToString(keycode, basicKeyToByte, byteToKey)), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(PelpiKeycodeInput, {
    value: keycode,
    setValue: setKeycode,
    meta: {}
  }))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, colorVal[0], ", ", colorVal[1]), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(ArrayColorPicker, {
    color: colorVal,
    setColor: (hue, sat) => setColorVal([hue, sat])
  }))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, rangeVal), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentRange, {
    max: 100,
    min: 0,
    defaultValue: rangeVal,
    onChange: setRangeVal
  }))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, +isChecked), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
    isChecked,
    onChange: setIsChecked
  }))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, +selectionVal), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSelect, {
    defaultValue: selectOptions[selectionVal],
    options: selectOptions,
    onChange: (option) => {
      option && setSelectionVal(+option.value);
    }
  }))));
};
export const Debug = () => {
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  const api = selectedDevice ? selectedDevice.api : null;
  const connectedDevices = useAppSelector(getConnectedDevices);
  const allDefinitions = Object.entries(useAppSelector(getDefinitions)).flatMap(([id, versionMap]) => [
    [id, versionMap.v2],
    [id, versionMap.v3]
  ]).filter(([_, definition]) => definition !== void 0);
  const remoteDefinitions = Object.entries(useAppSelector(getBaseDefinitions)).flatMap(([id, versionMap]) => [
    [id, versionMap.v2],
    [id, versionMap.v3]
  ]).filter(([_, definition]) => definition !== void 0);
  const localDefinitions = Object.entries(useAppSelector(getCustomDefinitions)).flatMap(([id, versionMap]) => [
    [id, versionMap.v2],
    [id, versionMap.v3]
  ]).filter(([_, definition]) => definition !== void 0);
  const [selectedDefinitionIndex, setSelectedDefinition] = useState(0);
  const [selectedOptionKeys, setSelectedOptionKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  const options = allDefinitions.map(([, definition], index) => ({
    label: definition.name,
    value: `${index}`
  }));
  const entry = allDefinitions[selectedDefinitionIndex];
  const flexRef = useRef(null);
  const dimensions = useSize(flexRef);
  return /* @__PURE__ */ React.createElement(DebugPane, null, /* @__PURE__ */ React.createElement(KeyboardPanel, {
    ref: flexRef
  }, entry && /* @__PURE__ */ React.createElement(BlankPositionedKeyboard, {
    containerDimensions: dimensions,
    selectedDefinition: entry[1],
    showMatrix,
    selectedOptionKeys,
    selectedKey
  })), /* @__PURE__ */ React.createElement(MenuPanel, null, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(GithubUserData, null), /* @__PURE__ */ React.createElement(ControlGroup, null, /* @__PURE__ */ React.createElement(ControlGroupHeader, null, "Key Testing"), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Key sounds"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(MusicalKeySlider, null))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Show Matrix"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
    isChecked: showMatrix,
    onChange: (val) => setShowMatrix(val)
  }))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Set next key"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: () => {
      var _a;
      const {keys, optionKeys} = entry[1].layouts;
      const selectedOptionKeys2 = optionKeys ? Object.entries(optionKeys).flatMap(([key, options2]) => options2[0]) : [];
      const displayedKeys = [...keys, ...selectedOptionKeys2];
      if (selectedKey !== void 0) {
        setSelectedKey((_a = getNextKey(selectedKey, displayedKeys)) != null ? _a : void 0);
      }
    }
  }, "Next")))), options && /* @__PURE__ */ React.createElement(ControlGroup, null, /* @__PURE__ */ React.createElement(ControlGroupHeader, null, "Layout Testing"), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Dummy Keyboard"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSelect, {
    onChange: (option) => option && setSelectedDefinition(+option.value),
    defaultValue: options[0],
    options
  })))), entry && /* @__PURE__ */ React.createElement(Layouts, {
    definition: entry[1],
    onLayoutChange: (newSelectedOptionKeys) => {
      setSelectedOptionKeys(newSelectedOptionKeys);
    }
  }), api && /* @__PURE__ */ React.createElement(ControlGroup, null, /* @__PURE__ */ React.createElement(ControlGroupHeader, null, "Connected Device Debugging"), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "EEPROM Reset"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: () => api.resetEEPROM()
  }, "Reset"))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Bootloader Jump"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: () => api.jumpToBootloader()
  }, "Jump"))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Clear all macros"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: () => api.resetMacros()
  }, "Clear"))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Benchmark Switch State Query Speed"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: async () => {
      const start = performance.now();
      await Array(1e3).fill(0).map((_) => api.getKeyboardValue(KeyboardValue.SWITCH_MATRIX_STATE, 20));
      console.info("1000 commands in ", performance.now() - start, "ms");
    }
  }, "Benchmark")))), /* @__PURE__ */ React.createElement(ControlGroup, null, /* @__PURE__ */ React.createElement(ControlGroupHeader, null, "Device IDs"), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Connected Devices"), /* @__PURE__ */ React.createElement(Detail, null, Object.values(connectedDevices).length, " Devices")), Object.values(connectedDevices).map((device) => /* @__PURE__ */ React.createElement(IndentedControlRow, {
    key: device.device.path
  }, /* @__PURE__ */ React.createElement(SubLabel, null, allDefinitions.find(([id]) => id === device.vendorProductId.toString())[1].name), /* @__PURE__ */ React.createElement(Detail, null, "0x", device.vendorProductId.toString(16).toUpperCase()))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Local definitions"), /* @__PURE__ */ React.createElement(Detail, null, Object.values(localDefinitions).length, " Definitions")), Object.values(localDefinitions).map(([id, definition]) => /* @__PURE__ */ React.createElement(IndentedControlRow, {
    key: id
  }, /* @__PURE__ */ React.createElement(SubLabel, null, definition.name), /* @__PURE__ */ React.createElement(Detail, null, "0x", parseInt(id).toString(16).toUpperCase()))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", null, /* @__PURE__ */ React.createElement(Label, null, "Remote definitions"), /* @__PURE__ */ React.createElement(Detail, null, Object.values(remoteDefinitions).length, " Definitions")), Object.values(remoteDefinitions).map(([id, definition]) => /* @__PURE__ */ React.createElement(IndentedControlRow, null, /* @__PURE__ */ React.createElement(SubLabel, null, definition.name), /* @__PURE__ */ React.createElement(Detail, null, "0x", parseInt(id).toString(16).toUpperCase())))))), /* @__PURE__ */ React.createElement(TestControls, null))));
};
