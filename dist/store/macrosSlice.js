import {createSlice} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
import {getMacroAPI} from "../utils/macro-api/index.js";
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
export const loadMacros = (connectedDevice, basicKeyToByte) => async (dispatch) => {
  const {api, protocol} = connectedDevice;
  if (protocol < 8) {
    dispatch(setMacrosNotSupported());
  } else {
    try {
      const macroApi = getMacroAPI(protocol, api);
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
  const {api, protocol} = connectedDevice;
  const macroApi = getMacroAPI(protocol, api);
  if (macroApi) {
    await macroApi.writeMacroExpressions(macros);
    dispatch(saveMacrosSuccess(macros));
  }
};
export const getIsMacroFeatureSupported = (state) => state.macros.isFeatureSupported;
