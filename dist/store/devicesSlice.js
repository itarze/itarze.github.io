import {createSelector, createSlice} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
const initialState = {
  selectedDevicePath: null,
  connectedDevices: {},
  supportedIds: {}
};
export const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    selectDevice: (state, action) => {
      if (!action.payload) {
        state.selectedDevicePath = null;
      } else {
        state.selectedDevicePath = action.payload.device.path;
      }
    },
    updateConnectedDevices: (state, action) => {
      state.connectedDevices = action.payload;
    },
    updateSupportedIds: (state, action) => {
      state.supportedIds = action.payload;
    },
    ensureSupportedId: (state, action) => {
      var _a;
      const {productId, version} = action.payload;
      state.supportedIds[productId] = (_a = state.supportedIds[productId]) != null ? _a : {};
      state.supportedIds[productId][version] = true;
    }
  }
});
export const {
  selectDevice,
  updateConnectedDevices,
  updateSupportedIds,
  ensureSupportedId
} = deviceSlice.actions;
export default deviceSlice.reducer;
export const getConnectedDevices = (state) => state.devices.connectedDevices;
export const getSelectedDevicePath = (state) => state.devices.selectedDevicePath;
export const getSupportedIds = (state) => state.devices.supportedIds;
export const getSelectedConnectedDevice = createSelector(getConnectedDevices, getSelectedDevicePath, (devices, path) => path && devices[path]);
