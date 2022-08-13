import React, {createRef, useEffect, useState} from "../../_snowpack/pkg/react.js";
import styles from "./Home.module.css.proxy.js";
import {mapEvtToKeycode, getByteForCode} from "../utils/key.js";
import {startMonitoring, usbDetect} from "../utils/usb-hid.js";
import {Title} from "./title-bar.js";
import {
  getLightingDefinition,
  isVIADefinitionV2,
  LightingValue
} from "../../_snowpack/pkg/via-reader.js";
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
  getSelectedDefinition,
  getSelectedKeyDefinitions
} from "../store/definitionsSlice.js";
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
        updateSelectedKey(getByteForCode(keycode));
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
  const [selectedTitle, setSelectedTitle] = useState(null);
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
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.home,
    ref: homeElem,
    tabIndex: 0,
    style: {flex: 1}
  }, !hasHIDSupport ? /* @__PURE__ */ React.createElement("div", {
    className: styles.usbError
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.usbErrorIcon
  }, "❌"), /* @__PURE__ */ React.createElement("h1", {
    className: styles.usbErrorHeading
  }, "USB Detection Error"), /* @__PURE__ */ React.createElement("p", null, "Looks like there was a problem getting USB detection working. Right now, we only support", " ", /* @__PURE__ */ React.createElement("a", {
    className: styles.usbErrorWebHIDLink,
    href: "https://caniuse.com/?search=webhid",
    target: "_blank"
  }, "browsers that have WebHID enabled"), ", so make sure yours is compatible before trying again.")) : props.children);
};
