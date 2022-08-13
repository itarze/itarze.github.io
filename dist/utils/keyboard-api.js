import {logCommand} from "./command-logger.js";
import {initAndConnectDevice} from "./usb-hid.js";
const VALID_PROTOCOL_VERSIONS = [1, 7, 8, 9, 10, 11];
export const isValidProtocolVersion = (version) => VALID_PROTOCOL_VERSIONS.includes(version);
const COMMAND_START = 0;
const GET_PROTOCOL_VERSION = 1;
const GET_KEYBOARD_VALUE = 2;
const SET_KEYBOARD_VALUE = 3;
const DYNAMIC_KEYMAP_GET_KEYCODE = 4;
const DYNAMIC_KEYMAP_SET_KEYCODE = 5;
const CUSTOM_MENU_SET_VALUE = 7;
const CUSTOM_MENU_GET_VALUE = 8;
const CUSTOM_MENU_SAVE = 9;
const EEPROM_RESET = 10;
const BOOTLOADER_JUMP = 11;
const DYNAMIC_KEYMAP_MACRO_GET_COUNT = 12;
const DYNAMIC_KEYMAP_MACRO_GET_BUFFER_SIZE = 13;
const DYNAMIC_KEYMAP_MACRO_GET_BUFFER = 14;
const DYNAMIC_KEYMAP_MACRO_SET_BUFFER = 15;
const DYNAMIC_KEYMAP_MACRO_RESET = 16;
const DYNAMIC_KEYMAP_GET_LAYER_COUNT = 17;
const DYNAMIC_KEYMAP_GET_BUFFER = 18;
const DYNAMIC_KEYMAP_SET_BUFFER = 19;
const DYNAMIC_KEYMAP_GET_ENCODER = 20;
const DYNAMIC_KEYMAP_SET_ENCODER = 21;
const BACKLIGHT_CONFIG_SET_VALUE = 7;
const BACKLIGHT_CONFIG_GET_VALUE = 8;
const BACKLIGHT_CONFIG_SAVE = 9;
export var KeyboardValue;
(function(KeyboardValue2) {
  KeyboardValue2[KeyboardValue2["UPTIME"] = 1] = "UPTIME";
  KeyboardValue2[KeyboardValue2["LAYOUT_OPTIONS"] = 2] = "LAYOUT_OPTIONS";
  KeyboardValue2[KeyboardValue2["SWITCH_MATRIX_STATE"] = 3] = "SWITCH_MATRIX_STATE";
})(KeyboardValue || (KeyboardValue = {}));
const BACKLIGHT_BRIGHTNESS = 9;
const BACKLIGHT_EFFECT = 10;
const BACKLIGHT_COLOR_1 = 12;
const BACKLIGHT_COLOR_2 = 13;
const BACKLIGHT_CUSTOM_COLOR = 23;
export const PROTOCOL_ALPHA = 7;
export const PROTOCOL_BETA = 8;
export const PROTOCOL_GAMMA = 9;
export const BACKLIGHT_PROTOCOL_NONE = 0;
export const BACKLIGHT_PROTOCOL_WILBA = 1;
const cache = {};
const eqArr = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((val, idx) => arr2[idx] === val);
};
const shiftTo16Bit = ([hi, lo]) => hi << 8 | lo;
const shiftFrom16Bit = (value) => [
  value >> 8,
  value & 255
];
const shiftBufferTo16Bit = (buffer) => {
  const shiftedBuffer = [];
  for (let i = 0; i < buffer.length; i += 2) {
    shiftedBuffer.push(shiftTo16Bit([buffer[i], buffer[i + 1]]));
  }
  return shiftedBuffer;
};
const shiftBufferFrom16Bit = (buffer) => buffer.map(shiftFrom16Bit).flatMap((value) => value);
const globalCommandQueue = {};
export const canConnect = (device) => {
  try {
    initKeyboardAPI(device);
    return true;
  } catch (e) {
    console.error("Skipped ", device, e);
    return false;
  }
};
const initKeyboardAPI = (device) => {
  return new KeyboardAPI(device);
};
export class KeyboardAPI {
  constructor(device) {
    const {path} = device;
    this.kbAddr = path;
    if (!cache[path]) {
      cache[path] = {device, hid: initAndConnectDevice(device)};
    } else {
      cache[path] = {...cache[path], device};
    }
  }
  getDevice() {
    return cache[this.kbAddr].device;
  }
  refresh(kbAddr) {
    this.kbAddr = kbAddr;
    cache[kbAddr] = {
      ...cache[kbAddr],
      hid: initAndConnectDevice({path: kbAddr})
    };
  }
  async getByteBuffer() {
    return this.getHID().readP();
  }
  async getProtocolVersion() {
    try {
      const [, hi, lo] = await this.hidCommand(GET_PROTOCOL_VERSION);
      return shiftTo16Bit([hi, lo]);
    } catch (e) {
      return -1;
    }
  }
  async getKey(layer, row, col) {
    const buffer = await this.hidCommand(DYNAMIC_KEYMAP_GET_KEYCODE, [
      layer,
      row,
      col
    ]);
    return shiftTo16Bit([buffer[4], buffer[5]]);
  }
  async isCorrectProtocol() {
    const res = await this.getProtocolVersion();
    if (VALID_PROTOCOL_VERSIONS.includes(res)) {
      return true;
    }
    return false;
  }
  async getLayerCount() {
    const version = await this.getProtocolVersion();
    if (version >= PROTOCOL_BETA) {
      const [, count] = await this.hidCommand(DYNAMIC_KEYMAP_GET_LAYER_COUNT);
      return count;
    }
    if (version === PROTOCOL_ALPHA) {
      return 4;
    }
  }
  async readRawMatrix(matrix, layer) {
    const version = await this.getProtocolVersion();
    if (version >= PROTOCOL_BETA) {
      return this.fastReadRawMatrix(matrix, layer);
    }
    if (version === PROTOCOL_ALPHA) {
      return this.slowReadRawMatrix(matrix, layer);
    }
    throw new Error("Unsupported protocol version");
  }
  async getKeymapBuffer(offset, size) {
    if (size > 28) {
      throw new Error("Max data length is 28");
    }
    const res = await this.hidCommand(DYNAMIC_KEYMAP_GET_BUFFER, [
      ...shiftFrom16Bit(offset),
      size
    ]);
    return [...res].slice(4, size + 4);
  }
  async fastReadRawMatrix({rows, cols}, layer) {
    const length = rows * cols;
    const MAX_KEYCODES_PARTIAL = 14;
    const bufferList = new Array(Math.ceil(length / MAX_KEYCODES_PARTIAL)).fill(0);
    const {res: promiseRes} = bufferList.reduce(({res, remaining}) => remaining < MAX_KEYCODES_PARTIAL ? {
      res: [
        ...res,
        this.getKeymapBuffer(layer * length * 2 + 2 * (length - remaining), remaining * 2)
      ],
      remaining: 0
    } : {
      res: [
        ...res,
        this.getKeymapBuffer(layer * length * 2 + 2 * (length - remaining), MAX_KEYCODES_PARTIAL * 2)
      ],
      remaining: remaining - MAX_KEYCODES_PARTIAL
    }, {res: [], remaining: length});
    const yieldedRes = await Promise.all(promiseRes);
    return yieldedRes.flatMap(shiftBufferTo16Bit);
  }
  async slowReadRawMatrix({rows, cols}, layer) {
    const length = rows * cols;
    const res = new Array(length).fill(0).map((_, i) => this.getKey(layer, ~~(i / cols), i % cols));
    return Promise.all(res);
  }
  async writeRawMatrix(matrixInfo, keymap) {
    const version = await this.getProtocolVersion();
    if (version >= PROTOCOL_BETA) {
      return this.fastWriteRawMatrix(keymap);
    }
    if (version === PROTOCOL_ALPHA) {
      return this.slowWriteRawMatrix(matrixInfo, keymap);
    }
  }
  async slowWriteRawMatrix({cols}, keymap) {
    keymap.forEach(async (layer, layerIdx) => layer.forEach(async (keycode, keyIdx) => {
      await this.setKey(layerIdx, ~~(keyIdx / cols), keyIdx % cols, keycode);
    }));
  }
  async fastWriteRawMatrix(keymap) {
    const data = keymap.flatMap((layer) => layer.map((key) => key));
    const shiftedData = shiftBufferFrom16Bit(data);
    const bufferSize = 28;
    for (let offset = 0; offset < shiftedData.length; offset += bufferSize) {
      const buffer = shiftedData.slice(offset, offset + bufferSize);
      await this.hidCommand(DYNAMIC_KEYMAP_SET_BUFFER, [
        ...shiftFrom16Bit(offset),
        buffer.length,
        ...buffer
      ]);
    }
  }
  async getKeyboardValue(command, resultLength = 1) {
    const bytes = [command];
    const res = await this.hidCommand(GET_KEYBOARD_VALUE, bytes);
    return res.slice(2, 2 + resultLength);
  }
  async setKeyboardValue(command, ...rest) {
    const bytes = [command, ...rest];
    await this.hidCommand(SET_KEYBOARD_VALUE, bytes);
  }
  async getEncoderValue(layer, id, isClockwise) {
    const bytes = [layer, id, +isClockwise];
    const res = await this.hidCommand(DYNAMIC_KEYMAP_GET_ENCODER, bytes);
    return shiftTo16Bit([res[4], res[5]]);
  }
  async setEncoderValue(layer, id, isClockwise, keycode) {
    const bytes = [layer, id, +isClockwise, ...shiftFrom16Bit(keycode)];
    await this.hidCommand(DYNAMIC_KEYMAP_SET_ENCODER, bytes);
  }
  async getCustomMenuValue(commandBytes) {
    const res = await this.hidCommand(CUSTOM_MENU_GET_VALUE, commandBytes);
    return res.slice(0 + commandBytes.length);
  }
  async setCustomMenuValue(...args) {
    await this.hidCommand(CUSTOM_MENU_SET_VALUE, args);
  }
  async getBacklightValue(command, resultLength = 1) {
    const bytes = [command];
    const res = await this.hidCommand(BACKLIGHT_CONFIG_GET_VALUE, bytes);
    return res.slice(2, 2 + resultLength);
  }
  async setBacklightValue(command, ...rest) {
    const bytes = [command, ...rest];
    await this.hidCommand(BACKLIGHT_CONFIG_SET_VALUE, bytes);
  }
  async getRGBMode() {
    const bytes = [BACKLIGHT_EFFECT];
    const [, , val] = await this.hidCommand(BACKLIGHT_CONFIG_GET_VALUE, bytes);
    return val;
  }
  async getBrightness() {
    const bytes = [BACKLIGHT_BRIGHTNESS];
    const [, , brightness] = await this.hidCommand(BACKLIGHT_CONFIG_GET_VALUE, bytes);
    return brightness;
  }
  async getColor(colorNumber) {
    const bytes = [colorNumber === 1 ? BACKLIGHT_COLOR_1 : BACKLIGHT_COLOR_2];
    const [, , hue, sat] = await this.hidCommand(BACKLIGHT_CONFIG_GET_VALUE, bytes);
    return {hue, sat};
  }
  async setColor(colorNumber, hue, sat) {
    const bytes = [
      colorNumber === 1 ? BACKLIGHT_COLOR_1 : BACKLIGHT_COLOR_2,
      hue,
      sat
    ];
    await this.hidCommand(BACKLIGHT_CONFIG_SET_VALUE, bytes);
  }
  async getCustomColor(colorNumber) {
    const bytes = [BACKLIGHT_CUSTOM_COLOR, colorNumber];
    const [, , , hue, sat] = await this.hidCommand(BACKLIGHT_CONFIG_GET_VALUE, bytes);
    return {hue, sat};
  }
  async setCustomColor(colorNumber, hue, sat) {
    const bytes = [BACKLIGHT_CUSTOM_COLOR, colorNumber, hue, sat];
    await this.hidCommand(BACKLIGHT_CONFIG_SET_VALUE, bytes);
  }
  async setRGBMode(effect) {
    const bytes = [BACKLIGHT_EFFECT, effect];
    await this.hidCommand(BACKLIGHT_CONFIG_SET_VALUE, bytes);
  }
  async commitCustomMenu(channel) {
    await this.hidCommand(CUSTOM_MENU_SAVE, [channel]);
  }
  async saveLighting() {
    await this.hidCommand(BACKLIGHT_CONFIG_SAVE);
  }
  async resetEEPROM() {
    await this.hidCommand(EEPROM_RESET);
  }
  async jumpToBootloader() {
    await this.hidCommand(BOOTLOADER_JUMP);
  }
  async setKey(layer, row, column, val) {
    const res = await this.hidCommand(DYNAMIC_KEYMAP_SET_KEYCODE, [
      layer,
      row,
      column,
      ...shiftFrom16Bit(val)
    ]);
    return shiftTo16Bit([res[4], res[5]]);
  }
  async getMacroCount() {
    const [, count] = await this.hidCommand(DYNAMIC_KEYMAP_MACRO_GET_COUNT);
    return count;
  }
  async getMacroBufferSize() {
    const [, hi, lo] = await this.hidCommand(DYNAMIC_KEYMAP_MACRO_GET_BUFFER_SIZE);
    return shiftTo16Bit([hi, lo]);
  }
  async getMacroBytes() {
    const macroBufferSize = await this.getMacroBufferSize();
    const size = 28;
    const bytesP = [];
    const bytes = [];
    for (let offset = 0; offset < macroBufferSize; offset += 28) {
      bytesP.push(this.hidCommand(DYNAMIC_KEYMAP_MACRO_GET_BUFFER, [
        ...shiftFrom16Bit(offset),
        size
      ]));
    }
    const allBytes = await Promise.all(bytesP);
    return allBytes.flatMap((bytes2) => Array.from(bytes2.slice(4)));
  }
  async setMacroBytes(data) {
    const macroBufferSize = await this.getMacroBufferSize();
    const size = data.length;
    if (size > macroBufferSize) {
      throw new Error(`Macro size (${size}) exceeds buffer size (${macroBufferSize})`);
    }
    const lastOffset = macroBufferSize - 1;
    const lastOffsetBytes = shiftFrom16Bit(lastOffset);
    await this.resetMacros();
    try {
      await this.hidCommand(DYNAMIC_KEYMAP_MACRO_SET_BUFFER, [
        ...shiftFrom16Bit(lastOffset),
        1,
        255
      ]);
      const bufferSize = 28;
      for (let offset = 0; offset < data.length; offset += bufferSize) {
        const buffer = data.slice(offset, offset + bufferSize);
        await this.hidCommand(DYNAMIC_KEYMAP_MACRO_SET_BUFFER, [
          ...shiftFrom16Bit(offset),
          buffer.length,
          ...buffer
        ]);
      }
    } finally {
      await this.hidCommand(DYNAMIC_KEYMAP_MACRO_SET_BUFFER, [
        ...lastOffsetBytes,
        1,
        0
      ]);
    }
  }
  async resetMacros() {
    await this.hidCommand(DYNAMIC_KEYMAP_MACRO_RESET);
  }
  get commandQueueWrapper() {
    if (!globalCommandQueue[this.kbAddr]) {
      globalCommandQueue[this.kbAddr] = {isFlushing: false, commandQueue: []};
      return globalCommandQueue[this.kbAddr];
    }
    return globalCommandQueue[this.kbAddr];
  }
  async timeout(time) {
    return new Promise((res, rej) => {
      this.commandQueueWrapper.commandQueue.push({
        res,
        rej,
        args: () => new Promise((r) => setTimeout(() => {
          r();
          res(void 0);
        }, time))
      });
      if (!this.commandQueueWrapper.isFlushing) {
        this.flushQueue();
      }
    });
  }
  async hidCommand(command, bytes = []) {
    return new Promise((res, rej) => {
      this.commandQueueWrapper.commandQueue.push({
        res,
        rej,
        args: [this.kbAddr, command, bytes]
      });
      if (!this.commandQueueWrapper.isFlushing) {
        this.flushQueue();
      }
    });
  }
  async flushQueue() {
    if (this.commandQueueWrapper.isFlushing === true) {
      return;
    }
    this.commandQueueWrapper.isFlushing = true;
    while (this.commandQueueWrapper.commandQueue.length !== 0) {
      const {res, rej, args} = this.commandQueueWrapper.commandQueue.shift();
      if (typeof args === "function") {
        await args();
        res();
      } else {
        try {
          const ans = await this._hidCommand(...args);
          res(ans);
        } catch (e) {
          rej(e);
        }
      }
    }
    this.commandQueueWrapper.isFlushing = false;
  }
  getHID() {
    return cache[this.kbAddr].hid;
  }
  async _hidCommand(kbAddr, command, bytes = []) {
    const commandBytes = [...[COMMAND_START, command], ...bytes];
    const paddedArray = new Array(33).fill(0);
    commandBytes.forEach((val, idx) => {
      paddedArray[idx] = val;
    });
    try {
      await this.getHID().write(paddedArray);
    } catch (ex) {
      console.log("Retrying...");
      this.refresh(kbAddr);
      this.getHID().write(paddedArray);
    }
    const buffer = await this.getByteBuffer();
    const bufferCommandBytes = buffer.slice(0, commandBytes.length - 1);
    logCommand(this.kbAddr, commandBytes, buffer);
    if (!eqArr(commandBytes.slice(1), bufferCommandBytes)) {
      console.error(`Command for ${this.kbAddr}:`, commandBytes, "Bad Resp:", buffer);
      throw new Error("Receiving incorrect response for command");
    }
    console.info(`Command for ${this.kbAddr}`, commandBytes, "Correct Resp:", buffer);
    return buffer;
  }
}
