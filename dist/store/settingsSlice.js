import {createSlice} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
import {getSettings, setSettings} from "../utils/device-store.js";
const initialState = {
  ...getSettings(),
  isTestMatrixEnabled: false,
  restartRequired: false,
  allowGlobalHotKeys: false
};
const toggleBool = (state, key) => {
  state[key] = !state[key];
  setSettings(state);
};
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleKeyRemappingViaKeyboard: (state) => {
      toggleBool(state, "allowKeyboardKeyRemapping");
    },
    toggleFastRemap: (state) => {
      toggleBool(state, "disableFastRemap");
    },
    toggleHardwareAcceleration: (state) => {
      toggleBool(state, "disableHardwareAcceleration");
    },
    toggleCreatorMode: (state) => {
      toggleBool(state, "showDesignTab");
    },
    setTestMatrixEnabled: (state, action) => {
      state.isTestMatrixEnabled = action.payload;
    },
    disableGlobalHotKeys: (state) => {
      state.allowGlobalHotKeys = false;
    },
    enableGlobalHotKeys: (state) => {
      state.allowGlobalHotKeys = true;
    },
    requireRestart: (state) => {
      state.restartRequired = true;
    }
  }
});
export const {
  toggleKeyRemappingViaKeyboard,
  toggleFastRemap,
  toggleHardwareAcceleration,
  toggleCreatorMode,
  setTestMatrixEnabled,
  requireRestart,
  disableGlobalHotKeys,
  enableGlobalHotKeys
} = settingsSlice.actions;
export default settingsSlice.reducer;
export const getAllowKeyboardKeyRemapping = (state) => state.settings.allowKeyboardKeyRemapping;
export const getAllowGlobalHotKeys = (state) => state.settings.allowGlobalHotKeys;
export const getDisableFastRemap = (state) => state.settings.disableFastRemap;
export const getShowDesignTab = (state) => state.settings.showDesignTab;
export const getDisableHardwareAcceleration = (state) => state.settings.disableHardwareAcceleration;
export const getRestartRequired = (state) => state.settings.restartRequired;
export const getIsTestMatrixEnabled = (state) => state.settings.isTestMatrixEnabled;
