import {createSelector, createSlice} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
import {
  isVIADefinitionV2,
  isVIADefinitionV3,
  isVIAMenu
} from "../../_snowpack/pkg/@the-via/reader.js";
import {getSelectedDefinition} from "./definitionsSlice.js";
import {
  getSelectedConnectedDevice,
  getSelectedDevicePath
} from "./devicesSlice.js";
import {getCommonMenus} from "../utils/device-store.js";
import {
  makeCustomMenu
} from "../components/panes/configure-panes/custom/menu-generator.js";
const initialState = {
  customMenuDataMap: {},
  commonMenusMap: {}
};
const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    updateSelectedCustomMenuData: (state, action) => {
      const {devicePath, menuData} = action.payload;
      state.customMenuDataMap[devicePath] = menuData;
    },
    updateCommonMenus: (state, action) => {
      const {commonMenuMap} = action.payload;
      state.commonMenusMap = commonMenuMap;
    },
    updateCustomMenuData: (state, action) => {
      state.customMenuDataMap = {...state.customMenuDataMap, ...action.payload};
    }
  }
});
export const {updateSelectedCustomMenuData, updateCustomMenuData} = menusSlice.actions;
export default menusSlice.reducer;
export const updateCustomMenuValue = (command, ...rest) => async (dispatch, getState) => {
  const state = getState();
  const connectedDevice = getSelectedConnectedDevice(state);
  if (!connectedDevice) {
    return;
  }
  const menuData = getSelectedCustomMenuData(state);
  const commands = getCustomCommands(state);
  const data = {
    ...menuData,
    [command]: [...rest.slice(commands[command].length)]
  };
  const {api, device} = connectedDevice;
  dispatch(updateSelectedCustomMenuData({
    menuData: data,
    devicePath: device.path
  }));
  api.setCustomMenuValue(...rest.slice(0));
  const channel = rest[0];
  api.commitCustomMenu(channel);
};
export const tryResolveCommonMenu = (id) => {
  const commonMenus = getCommonMenus();
  if (typeof id === "string") {
    return commonMenus[id] || id;
  }
  return id;
};
export const updateV3MenuData = (connectedDevice) => async (dispatch, getState) => {
  const state = getState();
  const {api, protocol, device} = connectedDevice;
  const definition = getSelectedDefinition(state);
  if (!isVIADefinitionV3(definition)) {
    throw new Error("V3 menus are only compatible with V3 VIA definitions.");
  }
  const menus = getV3Menus(state);
  const commands = menus.flatMap(extractCommands);
  if (commands.length !== 0 && protocol >= 11) {
    let props = {};
    const commandPromises = commands.map(([name, channelId, ...command]) => ({
      command: name,
      promise: api.getCustomMenuValue([channelId].concat(command))
    }));
    const commandPromisesRes = await Promise.all(commandPromises.map((c) => c.promise));
    props = commandPromises.reduce(({res, ref}, n, idx) => ({
      ref,
      res: {...res, [n.command]: ref[idx].slice(1)}
    }), {res: props, ref: commandPromisesRes}).res;
    dispatch(updateCustomMenuData({
      [device.path]: {
        ...props
      }
    }));
  }
};
const extractCommands = (menuOrControls) => {
  if (typeof menuOrControls === "string") {
    return [];
  }
  return "type" in menuOrControls ? [menuOrControls.content] : "content" in menuOrControls ? menuOrControls.content.flatMap(extractCommands) : [];
};
export const getCommonMenusDataMap = (state) => state.menus.commonMenusMap;
export const getCustomMenuDataMap = (state) => state.menus.customMenuDataMap;
export const getSelectedCustomMenuData = createSelector(getCustomMenuDataMap, getSelectedDevicePath, (map, path) => path && map[path]);
export const getV3Menus = createSelector(getSelectedDefinition, (definition) => {
  if (!definition || !isVIADefinitionV3(definition)) {
    return [];
  }
  return (definition.menus || []).flatMap(tryResolveCommonMenu).map((menu, idx) => isVIAMenu(menu) ? compileMenu("custom_menu", 3, menu, idx) : menu);
});
export const getV3MenuComponents = createSelector(getSelectedDefinition, (definition) => {
  if (!definition || !isVIADefinitionV3(definition)) {
    return [];
  }
  return (definition.menus || []).flatMap(tryResolveCommonMenu).map((menu, idx) => isVIAMenu(menu) ? makeCustomMenu(compileMenu("custom_menu", 3, menu, idx), idx) : menu);
});
export const getCustomCommands = createSelector(getSelectedDefinition, getV3Menus, (definition, v3Menus) => {
  if (!definition) {
    return [];
  }
  const menus = isVIADefinitionV2(definition) ? definition.customMenus : v3Menus;
  if (menus === void 0) {
    return [];
  }
  return menus.flatMap(extractCommands).reduce((p, n) => {
    return {
      ...p,
      [n[0]]: n.slice(1)
    };
  }, {});
});
const compileMenu = (partial, depth = 0, val, idx) => {
  console.log("compiling menu");
  return depth === 0 ? val : {
    ...val,
    _id: `${partial}_${idx}`,
    content: val.label !== void 0 ? val.content.map((contentVal, contentIdx) => compileMenu(`${partial}_${contentIdx}`, depth - 1, contentVal, idx)) : val.content.map((contentVal, contentIdx) => compileMenu(`${partial}_${contentIdx}`, depth, contentVal, idx))
  };
};
