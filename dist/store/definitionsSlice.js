import {createSelector, createSlice} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
import {
  bytesIntoNum,
  numIntoBytes,
  packBits,
  unpackBits
} from "../utils/bit-pack.js";
import {KeyboardValue} from "../utils/keyboard-api.js";
import {
  getSelectedDevicePath,
  getSelectedConnectedDevice
} from "./devicesSlice.js";
import {getMissingDefinition} from "../utils/device-store.js";
import {getBasicKeyDict} from "../utils/key-to-byte/dictionary-store.js";
import {getByteToKey} from "../utils/key.js";
const initialState = {
  definitions: {},
  customDefinitions: {},
  layoutOptionsMap: {}
};
const definitionsSlice = createSlice({
  name: "definitions",
  initialState,
  reducers: {
    updateDefinitions: (state, action) => {
      state.definitions = {...state.definitions, ...action.payload};
    },
    loadDefinition: (state, action) => {
      var _a;
      const {version, definition} = action.payload;
      const definitionEntry = (_a = state.customDefinitions[definition.vendorProductId]) != null ? _a : {};
      if (version === "v2") {
        definitionEntry[version] = definition;
      } else {
        definitionEntry[version] = definition;
      }
      state.customDefinitions[definition.vendorProductId] = definitionEntry;
    },
    updateLayoutOptions: (state, action) => {
      state.layoutOptionsMap = {...state.layoutOptionsMap, ...action.payload};
    }
  }
});
export const {loadDefinition, updateDefinitions, updateLayoutOptions} = definitionsSlice.actions;
export default definitionsSlice.reducer;
export const getBaseDefinitions = (state) => state.definitions.definitions;
export const getCustomDefinitions = (state) => state.definitions.customDefinitions;
export const getLayoutOptionsMap = (state) => state.definitions.layoutOptionsMap;
export const getDefinitions = createSelector(getBaseDefinitions, getCustomDefinitions, (definitions, customDefinitions) => ({...definitions, ...customDefinitions}));
export const getSelectedDefinition = createSelector(getDefinitions, getSelectedConnectedDevice, (definitions, connectedDevice) => connectedDevice && definitions && definitions[connectedDevice.vendorProductId] && definitions[connectedDevice.vendorProductId][connectedDevice.requiredDefinitionVersion]);
export const getBasicKeyToByte = createSelector(getSelectedConnectedDevice, (connectedDevice) => {
  const basicKeyToByte = getBasicKeyDict(connectedDevice ? connectedDevice.protocol : 0);
  return {basicKeyToByte, byteToKey: getByteToKey(basicKeyToByte)};
});
export const getSelectedLayoutOptions = createSelector(getSelectedDefinition, getLayoutOptionsMap, getSelectedDevicePath, (definition, map, path) => path && map[path] || definition && definition.layouts.labels && definition.layouts.labels.map((_) => 0) || []);
export const getSelectedOptionKeys = createSelector(getSelectedLayoutOptions, getSelectedDefinition, (layoutOptions, definition) => definition && layoutOptions.flatMap((option, idx) => definition.layouts.optionKeys[idx] && definition.layouts.optionKeys[idx][option] || []));
export const getSelectedKeyDefinitions = createSelector(getSelectedDefinition, getSelectedOptionKeys, (definition, optionKeys) => {
  if (definition && optionKeys) {
    return definition.layouts.keys.concat(optionKeys);
  }
  return [];
});
export const updateLayoutOption = (index, val) => async (dispatch, getState) => {
  const state = getState();
  const definition = getSelectedDefinition(state);
  const device = getSelectedConnectedDevice(state);
  const path = getSelectedDevicePath(state);
  if (!definition || !device || !path || !definition.layouts.labels) {
    return;
  }
  const optionsNums = definition.layouts.labels.map((layoutLabel) => Array.isArray(layoutLabel) ? layoutLabel.slice(1).length : 2);
  const {api} = device;
  const options = [...getSelectedLayoutOptions(state)];
  options[index] = val;
  const bytes = numIntoBytes(packBits(options.map((option, idx) => [option, optionsNums[idx]])));
  try {
    await api.setKeyboardValue(KeyboardValue.LAYOUT_OPTIONS, ...bytes);
  } catch (e) {
    console.warn("Setting layout option command not working");
  }
  dispatch(updateLayoutOptions({
    [path]: options
  }));
};
export const loadLayoutOptions = () => async (dispatch, getState) => {
  const state = getState();
  const selectedDefinition = getSelectedDefinition(state);
  const connectedDevice = getSelectedConnectedDevice(state);
  if (!connectedDevice || !selectedDefinition || !selectedDefinition.layouts.labels) {
    return;
  }
  const {api, device} = connectedDevice;
  try {
    const res = await api.getKeyboardValue(KeyboardValue.LAYOUT_OPTIONS, 4);
    const options = unpackBits(bytesIntoNum(res), selectedDefinition.layouts.labels.map((layoutLabel) => Array.isArray(layoutLabel) ? layoutLabel.slice(1).length : 2));
    dispatch(updateLayoutOptions({
      [device.path]: options
    }));
  } catch (e) {
    console.warn("Getting layout options command not working");
  }
};
export const reloadDefinitions = (connectedDevices) => async (dispatch, getState) => {
  const state = getState();
  const definitions = getDefinitions(state);
  const missingDefinitions = await Promise.all(Object.values(connectedDevices).filter(({vendorProductId, requiredDefinitionVersion}) => {
    return !definitions || !definitions[vendorProductId] || !definitions[vendorProductId][requiredDefinitionVersion];
  }).map(({device, requiredDefinitionVersion}) => getMissingDefinition(device, requiredDefinitionVersion)));
  if (!missingDefinitions.length) {
    return;
  }
  dispatch(updateDefinitions(missingDefinitions.reduce((p, [definition, version]) => ({
    ...p,
    [definition.vendorProductId]: {
      ...p[definition.vendorProductId],
      [version]: definition
    }
  }), {})));
};
