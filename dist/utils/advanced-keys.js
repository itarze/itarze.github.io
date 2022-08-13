import basicKeyToByte from "./key-to-byte.json.proxy.js";
import {byteToKey} from "./key.js";
const quantumRanges = {
  QK_MODS: 256,
  QK_RMODS_MIN: 4096,
  QK_MODS_MAX: 8191,
  QK_FUNCTION: 8192,
  QK_FUNCTION_MAX: 12287,
  QK_MACRO: 12288,
  QK_MACRO_MAX: 16383,
  QK_LAYER_TAP: 16384,
  QK_LAYER_TAP_MAX: 20479,
  QK_TO: 20480,
  QK_TO_MAX: 20735,
  QK_MOMENTARY: 20736,
  QK_MOMENTARY_MAX: 20991,
  QK_DEF_LAYER: 20992,
  QK_DEF_LAYER_MAX: 21247,
  QK_TOGGLE_LAYER: 21248,
  QK_TOGGLE_LAYER_MAX: 21503,
  QK_ONE_SHOT_LAYER: 21504,
  QK_ONE_SHOT_LAYER_MAX: 21759,
  QK_ONE_SHOT_MOD: 21760,
  QK_ONE_SHOT_MOD_MAX: 22015,
  QK_TAP_DANCE: 22272,
  QK_TAP_DANCE_MAX: 22527,
  QK_LAYER_TAP_TOGGLE: 22528,
  QK_LAYER_TAP_TOGGLE_MAX: 22783,
  QK_LAYER_MOD: 22784,
  QK_LAYER_MOD_MAX: 23039,
  QK_MOD_TAP: 24576,
  QK_MOD_TAP_MAX: 32767
};
const modCodes = {
  QK_LCTL: 256,
  QK_LSFT: 512,
  QK_LALT: 1024,
  QK_LGUI: 2048,
  QK_RMODS_MIN: 4096,
  QK_RCTL: 4352,
  QK_RSFT: 4608,
  QK_RALT: 5120,
  QK_RGUI: 6144
};
const modMasks = {
  MOD_LCTL: 1,
  MOD_LSFT: 2,
  MOD_LALT: 4,
  MOD_LGUI: 8,
  MOD_RCTL: 17,
  MOD_RSFT: 18,
  MOD_RALT: 20,
  MOD_RGUI: 24,
  MOD_HYPR: 15,
  MOD_MEH: 7
};
const ON_PRESS = 1;
const topLevelMacroToValue = {
  DF: quantumRanges.QK_DEF_LAYER,
  MO: quantumRanges.QK_MOMENTARY,
  LM: quantumRanges.QK_LAYER_MOD,
  LT: quantumRanges.QK_LAYER_TAP,
  OSL: quantumRanges.QK_ONE_SHOT_LAYER,
  TG: quantumRanges.QK_TOGGLE_LAYER,
  TO: quantumRanges.QK_TO,
  TT: quantumRanges.QK_LAYER_TAP_TOGGLE,
  MT: quantumRanges.QK_MOD_TAP,
  OSM: quantumRanges.QK_ONE_SHOT_MOD
};
const modifierKeyToValue = {
  LCTL: modCodes.QK_LCTL,
  C: modCodes.QK_LCTL,
  LSFT: modCodes.QK_LSFT,
  S: modCodes.QK_LSFT,
  LALT: modCodes.QK_LALT,
  A: modCodes.QK_LALT,
  LGUI: modCodes.QK_LGUI,
  G: modCodes.QK_LGUI,
  LCMD: modCodes.QK_LGUI,
  LWIN: modCodes.QK_LGUI,
  RCTL: modCodes.QK_RCTL,
  RSFT: modCodes.QK_RSFT,
  RALT: modCodes.QK_RALT,
  ALGR: modCodes.QK_RALT,
  RGUI: modCodes.QK_RGUI,
  RCMD: modCodes.QK_RGUI,
  RWIN: modCodes.QK_RGUI,
  SGUI: modCodes.QK_LGUI | modCodes.QK_LSFT,
  SCMD: modCodes.QK_LGUI | modCodes.QK_LSFT,
  SWIN: modCodes.QK_LGUI | modCodes.QK_LSFT,
  LCA: modCodes.QK_LCTL | modCodes.QK_LALT,
  LCAG: modCodes.QK_LCTL | modCodes.QK_LALT | modCodes.QK_LGUI,
  MEH: modCodes.QK_LCTL | modCodes.QK_LALT | modCodes.QK_LSFT,
  HYPR: modCodes.QK_LCTL | modCodes.QK_LALT | modCodes.QK_LSFT | modCodes.QK_LGUI
};
const modifierValuetoKey = Object.entries(modifierKeyToValue).reduce((acc, [key, value]) => ({...acc, [value]: key}), {});
const topLevelValueToMacro = Object.entries(topLevelMacroToValue).reduce((acc, [key, value]) => ({...acc, [value]: key}), {});
const valueToRange = Object.entries(quantumRanges).map(([key, value]) => [value, key]).sort((a, b) => a[0] - b[0]);
export const advancedStringToKeycode = (inputString) => {
  const upperString = inputString.toUpperCase();
  const parts = upperString.split(/\(|\)/).map((part) => part.trim());
  if (Object.keys(topLevelMacroToValue).includes(parts[0])) {
    return parseTopLevelMacro(parts);
  } else if (Object.keys(modifierKeyToValue).includes(parts[0])) {
    return parseModifierCode(parts);
  }
  return 0;
};
export const advancedKeycodeToString = (inputKeycode) => {
  let lastRange = null;
  let lastValue = -1;
  for (let [value, rangeName] of valueToRange) {
    if (inputKeycode < value) {
      break;
    }
    lastRange = rangeName;
    lastValue = +value;
  }
  const topLevelModKeys = ["QK_MODS", "QK_RMODS_MIN"];
  if (topLevelModKeys.includes(lastRange)) {
    return topLevelModToString(inputKeycode);
  }
  let humanReadable = topLevelValueToMacro[lastValue] + "(";
  let remainder = inputKeycode & ~lastValue;
  let layer = 0;
  let keycode = "";
  let modValue = 0;
  switch (lastRange) {
    case "QK_MOMENTARY":
    case "QK_DEF_LAYER":
    case "QK_TOGGLE_LAYER":
    case "QK_ONE_SHOT_LAYER":
    case "QK_LAYER_TAP_TOGGLE":
      humanReadable += remainder + ")";
      break;
    case "QK_LAYER_TAP":
      layer = remainder >> 8;
      keycode = byteToKey[remainder & 255];
      humanReadable += layer + "," + keycode + ")";
      break;
    case "QK_TO":
      layer = ~(ON_PRESS << 4) & remainder;
      humanReadable += layer + ")";
      break;
    case "QK_ONE_SHOT_MOD":
      humanReadable += modValueToString(remainder) + ")";
      break;
    case "QK_LAYER_MOD":
      layer = remainder >> 4;
      modValue = remainder & 15;
      humanReadable += layer + "," + modValueToString(modValue) + ")";
      break;
    case "QK_MOD_TAP":
      modValue = remainder >> 8 & 31;
      keycode = byteToKey[remainder & 255];
      humanReadable += modValueToString(modValue) + "," + keycode + ")";
      break;
    default:
      humanReadable = null;
  }
  return humanReadable;
};
const modValueToString = (modMask) => {
  const excluded = ["MOD_HYPR", "MOD_MEH"];
  const qualifyingStrings = Object.entries(modMasks).filter((part) => !excluded.includes(part[0]) && (part[1] & modMask) === part[1]).map((part) => part[0]);
  return qualifyingStrings.join(" | ");
};
const topLevelModToString = (modNumber) => {
  const keycode = byteToKey[modNumber & 255];
  const enabledMods = Object.entries(modifierValuetoKey).filter((part) => {
    const current = Number.parseInt(part[0]);
    return (current & modNumber) === current;
  }).map((part) => part[1]);
  return enabledMods.join("(") + "(" + keycode + ")".repeat(enabledMods.length);
};
const parseTopLevelMacro = (inputParts) => {
  var _a;
  const topLevelKey = inputParts[0];
  const parameter = (_a = inputParts[1]) != null ? _a : "";
  let [param1, param2] = ["", ""];
  let layer = 0;
  let mods = 0;
  switch (topLevelKey) {
    case "MO":
    case "DF":
    case "TG":
    case "OSL":
    case "TT":
      layer = Number.parseInt(parameter);
      if (layer < 0) {
        return 0;
      }
      return topLevelMacroToValue[topLevelKey] | layer & 255;
    case "TO":
      layer = Number.parseInt(parameter);
      if (layer < 0) {
        return 0;
      }
      return topLevelMacroToValue[topLevelKey] | ON_PRESS << 4 | layer & 255;
    case "OSM":
      mods = parseMods(parameter);
      if (mods === 0) {
        return 0;
      }
      return topLevelMacroToValue[topLevelKey] | mods & 255;
    case "LM":
      [param1, param2] = parameter.split(",").map((s) => s.trim());
      layer = Number.parseInt(param1);
      mods = parseMods(param2);
      if (layer < 0 || mods === 0) {
        return 0;
      }
      return topLevelMacroToValue[topLevelKey] | (layer & 15) << 4 | mods & 255;
    case "LT":
      [param1, param2] = parameter.split(",").map((s) => s.trim());
      layer = Number.parseInt(param1);
      if (layer < 0 || !basicKeyToByte.hasOwnProperty(param2)) {
        return 0;
      }
      return topLevelMacroToValue[topLevelKey] | (layer & 15) << 8 | basicKeyToByte[param2];
    case "MT":
      [param1, param2] = parameter.split(",").map((s) => s.trim());
      mods = parseMods(param1);
      if (mods === 0 || !basicKeyToByte.hasOwnProperty(param2)) {
        return 0;
      }
      return topLevelMacroToValue[topLevelKey] | (mods & 31) << 8 | basicKeyToByte[param2] & 255;
    default:
      return 0;
  }
};
const parseMods = (input = "") => {
  const parts = input.split("|").map((s) => s.trim());
  if (!parts.reduce((acc, part) => acc && modMasks.hasOwnProperty(part), true)) {
    return 0;
  }
  return parts.reduce((acc, part) => acc | modMasks[part], 0);
};
const parseModifierCode = (inputParts) => {
  const realParts = inputParts.filter((nonce) => nonce.length !== 0);
  const bytes = realParts.map((part, idx) => {
    if (idx === realParts.length - 1) {
      return basicKeyToByte.hasOwnProperty(part) ? basicKeyToByte[part] : null;
    } else {
      return modifierKeyToValue.hasOwnProperty(part) ? modifierKeyToValue[part] : null;
    }
  });
  if (bytes.find((e) => e === null)) {
    return 0;
  }
  return bytes.reduce((acc, byte) => acc | byte, 0);
};
export const anyKeycodeToString = (input) => {
  let currentValue = "";
  const advancedParsed = advancedKeycodeToString(input);
  if (byteToKey[input]) {
    currentValue = byteToKey[input];
  } else if (advancedParsed !== null) {
    currentValue = advancedParsed;
  }
  return currentValue;
};
