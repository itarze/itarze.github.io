import {
  getTheme
} from "../../_snowpack/pkg/via-reader.js";
import {Store} from "../shims/via-app-store.js";
import {getVendorProductId} from "./hid-keyboards.js";
let deviceStore;
const defaultStoreData = {
  definitionIndex: {
    generatedAt: -1,
    version: "2.0.0",
    theme: getTheme(),
    supportedVendorProductIdMap: {}
  },
  definitions: {},
  settings: {
    allowKeyboardKeyRemapping: false,
    showDesignTab: false,
    disableFastRemap: false,
    disableHardwareAcceleration: false
  },
  commonMenus: {}
};
function initDeviceStore() {
  deviceStore = new Store(defaultStoreData);
}
initDeviceStore();
export async function syncStore() {
  const currentDefinitionIndex = deviceStore.get("definitionIndex");
  try {
    const response = await fetch("/definitions/supported_kbs.json", {
      cache: "reload"
    });
    const json = await response.json();
    if (json.generatedAt !== (currentDefinitionIndex == null ? void 0 : currentDefinitionIndex.generatedAt)) {
      await setCommonMenus();
      const v2vpidMap = json.vendorProductIds.v2.reduce((acc, id) => {
        acc[id] = acc[id] || {};
        acc[id].v2 = acc[id].v3 = true;
        return acc;
      }, {});
      const vpidMap = json.vendorProductIds.v3.reduce((acc, def) => {
        acc[def] = acc[def] || {};
        acc[def].v3 = true;
        return acc;
      }, v2vpidMap);
      const newIndex = {
        ...json,
        supportedVendorProductIdMap: vpidMap
      };
      deviceStore.set("definitionIndex", newIndex);
      deviceStore.set("definitions", {});
      return newIndex;
    }
  } catch (e) {
    console.warn(e);
  }
  return currentDefinitionIndex;
}
export const setCommonMenus = async () => {
  const url = `/definitions/common-menus.json`;
  const response = await fetch(url);
  const json = await response.json();
  try {
    deviceStore.set("commonMenus", json);
  } catch (err) {
    localStorage.clear();
  }
  return json;
};
export const getMissingDefinition = async (device, version) => {
  const vpid = getVendorProductId(device.vendorId, device.productId);
  const url = `/definitions/${version}/${vpid}.json`;
  const response = await fetch(url);
  const json = await response.json();
  let definitions = deviceStore.get("definitions");
  const newDefinitions = {
    ...definitions,
    [vpid]: {
      ...definitions[vpid],
      [version]: json
    }
  };
  try {
    deviceStore.set("definitions", newDefinitions);
  } catch (err) {
    localStorage.clear();
    initDeviceStore();
    definitions = deviceStore.get("definitions");
    deviceStore.set("definitions", {
      ...definitions,
      [vpid]: {
        ...definitions[vpid],
        [version]: json
      }
    });
  }
  return [json, version];
};
export const getCommonMenus = () => deviceStore.get("commonMenus");
export const getSupportedIdsFromStore = () => {
  var _a;
  return (_a = deviceStore.get("definitionIndex")) == null ? void 0 : _a.supportedVendorProductIdMap;
};
export const getDefinitionsFromStore = () => deviceStore.get("definitions");
export const getThemeFromStore = () => {
  var _a;
  return (_a = deviceStore.get("definitionIndex")) == null ? void 0 : _a.theme;
};
export const getSettings = () => deviceStore.get("settings");
export const setSettings = (settings) => deviceStore.set("settings", settings);
