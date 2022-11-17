import basicKeyToByte from "../key-to-byte/default.json.proxy.js";
export var KeyAction;
(function(KeyAction2) {
  KeyAction2[KeyAction2["Tap"] = 1] = "Tap";
  KeyAction2[KeyAction2["Down"] = 2] = "Down";
  KeyAction2[KeyAction2["Up"] = 3] = "Up";
  KeyAction2[KeyAction2["Delay"] = 4] = "Delay";
})(KeyAction || (KeyAction = {}));
export const KeyActionPrefix = 1;
export const DelayTerminator = 124;
export const MacroTerminator = 0;
export function getByte(keycode) {
  return basicKeyToByte[keycode.toUpperCase()];
}
export function buildKeyActionBytes(keyaction, keycode) {
  return [KeyActionPrefix, keyaction, getByte(keycode)];
}
