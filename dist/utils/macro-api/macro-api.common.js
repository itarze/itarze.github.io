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
export function getByte(basicKeyToByte, keycode) {
  return basicKeyToByte[keycode.toUpperCase()];
}
export function buildKeyActionBytes(basicKeyToByte, keyaction, keycode) {
  return [KeyActionPrefix, keyaction, getByte(basicKeyToByte, keycode)];
}
