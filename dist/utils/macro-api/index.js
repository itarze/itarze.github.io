import {getByteToKey} from "../key.js";
import {getBasicKeyDict} from "../key-to-byte/dictionary-store.js";
import {MacroAPI, validateMacroExpression} from "./macro-api.js";
import {MacroAPIV11, validateMacroExpressionV11} from "./macro-api.v11.js";
export const getMacroAPI = (protocol, keyboardApi) => {
  const byteToKey = getByteToKey(getBasicKeyDict(protocol));
  return protocol >= 11 ? new MacroAPIV11(keyboardApi, byteToKey) : new MacroAPI(keyboardApi, byteToKey);
};
export const getMacroValidator = (protocol) => protocol >= 11 ? validateMacroExpressionV11 : validateMacroExpression;
