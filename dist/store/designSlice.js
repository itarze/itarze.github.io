import {createSlice} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
const initialState = {
  selectedVersion: "v3"
};
const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    selectVersion: (state, action) => {
      state.selectedVersion = action.payload;
    }
  }
});
export const {selectVersion} = designSlice.actions;
export default designSlice.reducer;
export const getSelectedVersion = (state) => state.design.selectedVersion;
