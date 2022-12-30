import React, {createRef, useEffect, useState} from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import {mapEvtToKeycode, getByteForCode} from "../utils/key.js";
import {startMonitoring, usbDetect} from "../utils/usb-hid.js";
import {Title} from "./title-bar.js";
import {
  getLightingDefinition,
  isVIADefinitionV2,
  LightingValue
} from "../../_snowpack/pkg/@the-via/reader.js";
import {getNextKey} from "./positioned-keyboard.js";
import {useDispatch} from "../../_snowpack/pkg/react-redux.js";
import {getSelectedConnectedDevice} from "../store/devicesSlice.js";
import {
  loadSupportedIds,
  reloadConnectedDevices
} from "../store/devicesThunks.js";
import {
  disableGlobalHotKeys,
  enableGlobalHotKeys,
  getAllowGlobalHotKeys,
  getAllowKeyboardKeyRemapping,
  getDisableFastRemap
} from "../store/settingsSlice.js";
import {useAppSelector} from "../store/hooks.js";
import {
  getSelectedKey,
  getSelectedLayerIndex,
  updateKey,
  updateSelectedKey as updateSelectedKeyAction
} from "../store/keymapSlice.js";
import {
  getBasicKeyToByte,
  getSelectedDefinition,
  getSelectedKeyDefinitions
} from "../store/definitionsSlice.js";
const ErrorHome = styled.div`
  background: var(--color_jet);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  overflow: hidden;
`;
const UsbError = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin: 0 auto;
  max-width: 650px;
  text-align: center;
`;
const UsbErrorIcon = styled.div`
  font-size: 2rem;
`;
const UsbErrorHeading = styled.h1`
  margin: 1rem 0 0;
`;
const UsbErrorWebHIDLink = styled.a`
  text-decoration: underline;
`;
const timeoutRepeater = (fn, timeout, numToRepeat = 0) => () => setTimeout(() => {
  fn();
  if (numToRepeat > 0) {
    timeoutRepeater(fn, timeout, numToRepeat - 1)();
  }
}, timeout);
export const Home = (props) => {
  const {hasHIDSupport} = props;
  const dispatch = useDispatch();
  const allowKeyRemappingViaKeyboard = useAppSelector(getAllowKeyboardKeyRemapping);
  const globalHotKeysAllowed = useAppSelector(getAllowGlobalHotKeys);
  const selectedKey = useAppSelector(getSelectedKey);
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const selectedLayerIndex = useAppSelector(getSelectedLayerIndex);
  const selectedKeyDefinitions = useAppSelector(getSelectedKeyDefinitions);
  const disableFastRemap = useAppSelector(getDisableFastRemap);
  const {basicKeyToByte} = useAppSelector(getBasicKeyToByte);
  const updateDevicesRepeat = timeoutRepeater(() => {
    dispatch(reloadConnectedDevices());
  }, 500, 1);
  const updateSelectedKey = async (value) => {
    if (selectedLayerIndex !== null && selectedKey !== null && selectedDefinition) {
      dispatch(updateKey(selectedKey, value));
      dispatch(updateSelectedKeyAction(disableFastRemap ? null : getNextKey(selectedKey, selectedKeyDefinitions)));
    }
  };
  const handleKeys = (evt) => {
    if (allowKeyRemappingViaKeyboard && globalHotKeysAllowed && selectedKey !== null) {
      const keycode = mapEvtToKeycode(evt);
      if (keycode) {
        updateSelectedKey(getByteForCode(keycode, basicKeyToByte));
      }
    }
  };
  const enableKeyPressListener = () => {
    const body = document.body;
    if (body) {
      body.addEventListener("keydown", handleKeys);
    }
  };
  const disableKeyPressListener = () => {
    const body = document.body;
    if (body) {
      body.removeEventListener("keydown", handleKeys);
    }
  };
  const toggleLights = async () => {
    if (!selectedDevice) {
      return;
    }
    const {api} = selectedDevice;
    if (!isVIADefinitionV2(selectedDefinition)) {
      return;
    }
    if (api && selectedDefinition && getLightingDefinition(selectedDefinition.lighting).supportedLightingValues.includes(LightingValue.BACKLIGHT_EFFECT)) {
      const val = await api.getRGBMode();
      const newVal = val !== 0 ? 0 : getLightingDefinition(selectedDefinition.lighting).effects.length - 1;
      api.setRGBMode(newVal);
      api.timeout(200);
      api.setRGBMode(val);
      api.timeout(200);
      api.setRGBMode(newVal);
      api.timeout(200);
      await api.setRGBMode(val);
    }
  };
  const [, setSelectedTitle] = useState(null);
  const homeElem = createRef();
  useEffect(() => {
    if (!hasHIDSupport) {
      return;
    }
    if (homeElem.current) {
      homeElem.current.focus();
    }
    startMonitoring();
    dispatch(enableGlobalHotKeys());
    usbDetect.on("change", updateDevicesRepeat);
    dispatch(loadSupportedIds());
    enableKeyPressListener();
    return () => {
      usbDetect.off("change", updateDevicesRepeat);
      dispatch(disableGlobalHotKeys());
      disableKeyPressListener();
    };
  }, []);
  useEffect(() => {
    setSelectedTitle(selectedDevice ? Title.KEYS : null);
    dispatch(updateSelectedKeyAction(null));
    toggleLights();
  }, [selectedDevice]);
  return /* @__PURE__ */ React.createElement(ErrorHome, {
    ref: homeElem,
    tabIndex: 0,
    style: {flex: 1}
  }, !hasHIDSupport ? /* @__PURE__ */ React.createElement(UsbError, null, /* @__PURE__ */ React.createElement(UsbErrorIcon, null, "❌"), /* @__PURE__ */ React.createElement(UsbErrorHeading, null, "USB Detection Error"), /* @__PURE__ */ React.createElement("p", null, "Looks like there was a problem getting USB detection working. Right now, we only support", " ", /* @__PURE__ */ React.createElement(UsbErrorWebHIDLink, {
    href: "https://caniuse.com/?search=webhid",
    target: "_blank"
  }, "browsers that have WebHID enabled"), ", so make sure yours is compatible before trying again.")) : props.children);
};
