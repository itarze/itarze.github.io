import {KeyboardAPI} from "./keyboard-api.js";
const CUSTOM_COMMAND_GET_VALUE = 20;
const CUSTOM_COMMAND_SET_VALUE = 21;
const CUSTOM_COMMAND_SAVE = 22;
export const VALID_PROTOCOL_VERSIONS = [1, 7, 8, 9, 10, 11];
export class KeyboardAPIV11 extends KeyboardAPI {
  async getCustomValue(channelId, commandId) {
    const res = await this.hidCommand(CUSTOM_COMMAND_GET_VALUE, [
      channelId,
      commandId
    ]);
    return res.slice(1, 2);
  }
  async setCustomValue(channelId, commandId, ...args) {
    await this.hidCommand(CUSTOM_COMMAND_SET_VALUE, [channelId, commandId].concat(args));
  }
  async saveCustomMenuChannel(channelId) {
    await this.hidCommand(CUSTOM_COMMAND_SAVE, [channelId]);
  }
}
