import {configureStore} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
import settingsReducer from "./settingsSlice.js";
import macrosReducer from "./macrosSlice.js";
import devicesReducer from "./devicesSlice.js";
import keymapReducer from "./keymapSlice.js";
import definitionsReducer from "./definitionsSlice.js";
import lightingReducer from "./lightingSlice.js";
import menusReducer from "./menusSlice.js";
import designReducer from "./designSlice.js";
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    macros: macrosReducer,
    devices: devicesReducer,
    keymap: keymapReducer,
    definitions: definitionsReducer,
    lighting: lightingReducer,
    menus: menusReducer,
    design: designReducer
  }
});
