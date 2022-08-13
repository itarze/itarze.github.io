import {createSlice} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
import {MacroAPI} from "../utils/macro-api.js";
const initialState = {
  expressions: [],
  isFeatureSupported: true
};
export const macrosSlice = createSlice({
  name: "macros",
  initialState,
  reducers: {
    loadMacrosSuccess: (state, action) => {
      state.expressions = action.payload;
    },
    saveMacrosSuccess: (state, action) => {
      state.expressions = action.payload;
    },
    setMacrosNotSupported: (state) => {
      state.isFeatureSupported = false;
    }
  }
});
export const {loadMacrosSuccess, saveMacrosSuccess, setMacrosNotSupported} = macrosSlice.actions;
export default macrosSlice.reducer;
export const loadMacros = (connectedDevice) => async (dispatch) => {
  const {api, protocol} = connectedDevice;
  if (protocol < 8) {
    dispatch(setMacrosNotSupported());
  } else {
    try {
      const macroApi = new MacroAPI(api);
      if (macroApi) {
        const macros = await macroApi.readMacroExpressions();
        dispatch(loadMacrosSuccess(macros));
      }
    } catch (err) {
      dispatch(setMacrosNotSupported());
    }
  }
};
export const saveMacros = (connectedDevice, macros) => async (dispatch) => {
  const {api} = connectedDevice;
  const macroApi = new MacroAPI(api);
  if (macroApi) {
    await macroApi.writeMacroExpressions(macros);
    dispatch(saveMacrosSuccess(macros));
  }
};
export const getIsMacroFeatureSupported = (state) => state.macros.isFeatureSupported;
