const quantumRangesKeys = [
  "QK_MODS",
  "QK_MODS_MAX",
  "QK_MOD_TAP",
  "QK_MOD_TAP_MAX",
  "QK_LAYER_TAP",
  "QK_LAYER_TAP_MAX",
  "QK_LAYER_MOD",
  "QK_LAYER_MOD_MAX",
  "QK_TO",
  "QK_TO_MAX",
  "QK_MOMENTARY",
  "QK_MOMENTARY_MAX",
  "QK_DEF_LAYER",
  "QK_DEF_LAYER_MAX",
  "QK_TOGGLE_LAYER",
  "QK_TOGGLE_LAYER_MAX",
  "QK_ONE_SHOT_LAYER",
  "QK_ONE_SHOT_LAYER_MAX",
  "QK_ONE_SHOT_MOD",
  "QK_ONE_SHOT_MOD_MAX",
  "QK_LAYER_TAP_TOGGLE",
  "QK_LAYER_TAP_TOGGLE_MAX"
];
const quantumRanges = (basicKeyToByte) => {
  return Object.keys(basicKeyToByte).reduce((acc, key) => quantumRangesKeys.includes(key) ? {...acc, [key]: basicKeyToByte[key]} : acc, {});
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
const topLevelMacroToValue = {
  MT: "QK_MOD_TAP",
  LT: "QK_LAYER_TAP",
  LM: "QK_LAYER_MOD",
  TO: "QK_TO",
  MO: "QK_MOMENTARY",
  DF: "QK_DEF_LAYER",
  TG: "QK_TOGGLE_LAYER",
  OSL: "QK_ONE_SHOT_LAYER",
  OSM: "QK_ONE_SHOT_MOD",
  TT: "QK_LAYER_TAP_TOGGLE"
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
const topLevelValueToMacro = (basicKeyToByte) => {
  return Object.entries(topLevelMacroToValue).reduce((acc, [key, value]) => ({...acc, [basicKeyToByte[value]]: key}), {});
};
export const advancedStringToKeycode = (inputString, basicKeyToByte) => {
  const upperString = inputString.toUpperCase();
  const parts = upperString.split(/\(|\)/).map((part) => part.trim());
  if (Object.keys(topLevelMacroToValue).includes(parts[0])) {
    return parseTopLevelMacro(parts, basicKeyToByte);
  } else if (Object.keys(modifierKeyToValue).includes(parts[0])) {
    return parseModifierCode(parts, basicKeyToByte);
  }
  return 0;
};
export const advancedKeycodeToString = (inputKeycode, basicKeyToByte, byteToKey) => {
  let valueToRange = Object.entries(quantumRanges(basicKeyToByte)).map(([key, value]) => [value, key]).sort((a, b) => a[0] - b[0]);
  let lastRange = null;
  let lastValue = -1;
  const btk = byteToKey;
  for (let [value, rangeName] of valueToRange) {
    if (inputKeycode < value) {
      break;
    }
    lastRange = rangeName;
    lastValue = +value;
  }
  const topLevelModKeys = ["QK_MODS"];
  if (topLevelModKeys.includes(lastRange)) {
    return topLevelModToString(inputKeycode, basicKeyToByte, byteToKey);
  }
  let humanReadable = topLevelValueToMacro(basicKeyToByte)[lastValue] + "(";
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
    case "QK_TO":
      humanReadable += remainder + ")";
      break;
    case "QK_LAYER_TAP":
      layer = remainder >> 8;
      keycode = btk[remainder & 255];
      humanReadable += layer + "," + keycode + ")";
      break;
    case "QK_ONE_SHOT_MOD":
      humanReadable += modValueToString(remainder) + ")";
      break;
    case "QK_LAYER_MOD":
      let mask = basicKeyToByte.QK_LAYER_MOD_MASK;
      let shift = Math.log2(mask + 1);
      layer = remainder >> shift;
      modValue = remainder & mask;
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
const topLevelModToString = (modNumber, basicKeyToByte, byteToKey) => {
  const keycode = byteToKey[modNumber & 255];
  const enabledMods = Object.entries(modifierValuetoKey).filter((part) => {
    const current = Number.parseInt(part[0]);
    return (current & modNumber) === current;
  }).map((part) => part[1]);
  return enabledMods.join("(") + "(" + keycode + ")".repeat(enabledMods.length);
};
const parseTopLevelMacro = (inputParts, basicKeyToByte) => {
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
    case "TO":
      layer = Number.parseInt(parameter);
      if (layer < 0) {
        return 0;
      }
      return basicKeyToByte[topLevelMacroToValue[topLevelKey]] | layer & 255;
    case "OSM":
      mods = parseMods(parameter);
      if (mods === 0) {
        return 0;
      }
      return basicKeyToByte[topLevelMacroToValue[topLevelKey]] | mods & 255;
    case "LM":
      [param1, param2] = parameter.split(",").map((s) => s.trim());
      let mask = basicKeyToByte.QK_LAYER_MOD_MASK;
      let shift = Math.log2(mask + 1);
      layer = Number.parseInt(param1);
      mods = parseMods(param2);
      if (layer < 0 || mods === 0) {
        return 0;
      }
      return basicKeyToByte[topLevelMacroToValue[topLevelKey]] | (layer & 15) << shift | mods & mask;
    case "LT":
      [param1, param2] = parameter.split(",").map((s) => s.trim());
      layer = Number.parseInt(param1);
      if (layer < 0 || !basicKeyToByte.hasOwnProperty(param2)) {
        return 0;
      }
      return basicKeyToByte[topLevelMacroToValue[topLevelKey]] | (layer & 15) << 8 | basicKeyToByte[param2];
    case "MT":
      [param1, param2] = parameter.split(",").map((s) => s.trim());
      mods = parseMods(param1);
      if (mods === 0 || !basicKeyToByte.hasOwnProperty(param2)) {
        return 0;
      }
      return basicKeyToByte[topLevelMacroToValue[topLevelKey]] | (mods & 31) << 8 | basicKeyToByte[param2] & 255;
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
const parseModifierCode = (inputParts, basicKeyToByte) => {
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
export const anyKeycodeToString = (input, basicKeyToByte, byteToKey) => {
  let currentValue = "";
  const advancedParsed = advancedKeycodeToString(input, basicKeyToByte, byteToKey);
  if (byteToKey[input]) {
    currentValue = byteToKey[input];
  } else if (advancedParsed !== null) {
    currentValue = advancedParsed;
  }
  return currentValue;
};
