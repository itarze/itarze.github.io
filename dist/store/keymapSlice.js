import {createSelector, createSlice} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
import {
  getDefinitions,
  getSelectedDefinition,
  getSelectedKeyDefinitions
} from "./definitionsSlice.js";
import {
  getSelectedConnectedDevice,
  getSelectedDevicePath,
  selectDevice
} from "./devicesSlice.js";
const initialState = {
  rawDeviceMap: {},
  numberOfLayers: 4,
  selectedLayerIndex: 0,
  selectedKey: null
};
export const keymapSlice = createSlice({
  name: "keymap",
  initialState,
  reducers: {
    setNumberOfLayers: (state, action) => {
      state.numberOfLayers = action.payload;
    },
    loadLayerSuccess: (state, action) => {
      const {layerIndex, keymap, devicePath} = action.payload;
      state.rawDeviceMap[devicePath] = state.rawDeviceMap[devicePath] || Array(state.numberOfLayers).fill({
        keymap: [],
        isLoaded: false
      });
      state.rawDeviceMap[devicePath][layerIndex] = {
        keymap,
        isLoaded: true
      };
    },
    setLayer: (state, action) => {
      state.selectedLayerIndex = action.payload;
    },
    clearSelectedKey: (state) => {
      state.selectedKey = null;
    },
    updateSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    saveKeymapSuccess: (state, action) => {
      const {layers, devicePath} = action.payload;
      state.rawDeviceMap[devicePath] = layers;
    },
    setKey: (state, action) => {
      const {keymapIndex, value, devicePath} = action.payload;
      const {selectedLayerIndex} = state;
      state.rawDeviceMap[devicePath][selectedLayerIndex].keymap[keymapIndex] = value;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(selectDevice, (state) => {
      state.selectedKey = null;
    });
  }
});
export const {
  setNumberOfLayers,
  setLayer,
  loadLayerSuccess,
  clearSelectedKey,
  setKey,
  updateSelectedKey,
  saveKeymapSuccess
} = keymapSlice.actions;
export default keymapSlice.reducer;
export const loadKeymapFromDevice = (connectedDevice) => async (dispatch, getState) => {
  const state = getState();
  if (getLoadProgress(state) === 1) {
    return;
  }
  const {api, device, vendorProductId, requiredDefinitionVersion} = connectedDevice;
  const numberOfLayers = await api.getLayerCount();
  dispatch(setNumberOfLayers(numberOfLayers));
  const {matrix} = getDefinitions(state)[vendorProductId][requiredDefinitionVersion];
  for (var layerIndex = 0; layerIndex < numberOfLayers; layerIndex++) {
    const keymap = await api.readRawMatrix(matrix, layerIndex);
    dispatch(loadLayerSuccess({layerIndex, keymap, devicePath: device.path}));
  }
};
export const saveRawKeymapToDevice = (keymap, connectedDevice) => async (dispatch, getState) => {
  const state = getState();
  const {api} = connectedDevice;
  const definition = getSelectedDefinition(state);
  if (!api || !definition) {
    return;
  }
  const {matrix} = definition;
  await api.writeRawMatrix(matrix, keymap);
  const layers = keymap.map((layer) => ({
    keymap: layer,
    isLoaded: true
  }));
  dispatch(saveKeymapSuccess({layers, devicePath: connectedDevice.device.path}));
};
export const updateKey = (keyIndex, value) => async (dispatch, getState) => {
  const state = getState();
  const keys = getSelectedKeyDefinitions(state);
  const connectedDevice = getSelectedConnectedDevice(state);
  const selectedDefinition = getSelectedDefinition(state);
  if (!connectedDevice || !keys || !selectedDefinition) {
    return;
  }
  const selectedLayerIndex = getSelectedLayerIndex(state);
  const {api, device} = connectedDevice;
  const {row, col} = keys[keyIndex];
  await api.setKey(selectedLayerIndex, row, col, value);
  const {matrix} = selectedDefinition;
  const keymapIndex = row * matrix.cols + col;
  dispatch(setKey({keymapIndex, value, devicePath: device.path}));
};
export const getSelectedKey = (state) => state.keymap.selectedKey;
export const getRawDeviceMap = (state) => state.keymap.rawDeviceMap;
export const getNumberOfLayers = (state) => state.keymap.numberOfLayers;
export const getSelectedLayerIndex = (state) => state.keymap.selectedLayerIndex;
export const getSelectedRawLayers = createSelector(getRawDeviceMap, getSelectedDevicePath, (rawDeviceMap, devicePath) => devicePath && rawDeviceMap[devicePath] || []);
export const getLoadProgress = createSelector(getSelectedRawLayers, getNumberOfLayers, (layers, layerCount) => layers && layers.filter((layer) => layer.isLoaded).length / layerCount);
export const getSelectedRawLayer = createSelector(getSelectedRawLayers, getSelectedLayerIndex, (deviceLayers, layerIndex) => deviceLayers && deviceLayers[layerIndex]);
export const getSelectedKeymaps = createSelector(getSelectedKeyDefinitions, getSelectedDefinition, getSelectedRawLayers, (keys, definition, layers) => {
  if (definition && layers) {
    const rawKeymaps = layers.map((layer) => layer.keymap);
    const {
      matrix: {cols}
    } = definition;
    return rawKeymaps.map((keymap) => keys.map(({row, col}) => keymap[row * cols + col]));
  }
  return void 0;
});
export const getSelectedKeymap = createSelector(getSelectedKeymaps, getSelectedLayerIndex, (deviceLayers, layerIndex) => deviceLayers && deviceLayers[layerIndex]);
