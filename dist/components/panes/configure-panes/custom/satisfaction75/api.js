const GET_KEYBOARD_VALUE = 2;
const SET_KEYBOARD_VALUE = 3;
const KB_VALUES = {
  ENABLED_ENCODER_MODES: 128,
  OLED_DEFAULT_MODE: 129,
  ENCODER_CUSTOM: 130,
  OLED_MODE: 131
};
export const getEncoderModes = async (api) => {
  const bytes = [KB_VALUES.ENABLED_ENCODER_MODES];
  const [, , enabledModes] = await api.hidCommand(GET_KEYBOARD_VALUE, bytes);
  return enabledModes;
};
export const setEncoderModes = async (api, newEncoderModes) => {
  const bytes = [KB_VALUES.ENABLED_ENCODER_MODES, newEncoderModes];
  await api.hidCommand(SET_KEYBOARD_VALUE, bytes);
};
export const getDefaultOLED = async (api) => {
  const bytes = [KB_VALUES.OLED_DEFAULT_MODE];
  const [, , defaultMode] = await api.hidCommand(GET_KEYBOARD_VALUE, bytes);
  return defaultMode;
};
export const setDefaultOLED = async (api, newDefaultMode) => {
  const bytes = [KB_VALUES.OLED_DEFAULT_MODE, newDefaultMode];
  await api.hidCommand(SET_KEYBOARD_VALUE, bytes);
};
export const getOLEDMode = async (api) => {
  const bytes = [KB_VALUES.OLED_MODE];
  const [, , defaultMode] = await api.hidCommand(GET_KEYBOARD_VALUE, bytes);
  return defaultMode;
};
export const setOLEDMode = async (api, newDefaultMode) => {
  const bytes = [KB_VALUES.OLED_MODE, newDefaultMode];
  await api.hidCommand(SET_KEYBOARD_VALUE, bytes);
};
export const getCustomEncoderConfig = async (api, encoderIdx) => {
  const bytes = [KB_VALUES.ENCODER_CUSTOM, encoderIdx];
  const raw = await api.hidCommand(GET_KEYBOARD_VALUE, bytes);
  const [, , , cw1, cw2, ccw1, ccw2, press1, press2] = raw;
  return [cw1 << 8 | cw2, ccw1 << 8 | ccw2, press1 << 8 | press2];
};
export const setCustomEncoderConfig = async (api, encoderIdx, behavior, keycode) => {
  const hi = (keycode & 65280) >> 8;
  const lo = keycode & 255;
  const bytes = [KB_VALUES.ENCODER_CUSTOM, encoderIdx, behavior, hi, lo];
  await api.hidCommand(SET_KEYBOARD_VALUE, bytes);
};
