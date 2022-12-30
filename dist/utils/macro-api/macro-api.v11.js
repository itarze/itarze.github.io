import {isAutocompleteKeycode} from "../autocomplete-keycodes.js";
import {
  DelayTerminator,
  KeyActionPrefix,
  MacroTerminator,
  KeyAction,
  buildKeyActionBytes
} from "./macro-api.common.js";
export function validateMacroExpressionV11(expression) {
  let unclosedBlockRegex, keycodeBlockRegex;
  try {
    unclosedBlockRegex = eval("/(?<!\\\\){(?![^{]*})/");
    keycodeBlockRegex = eval("/(?<!\\\\){(.*?)}/g");
  } catch (e) {
    console.error("Lookbehind support is not supported in this browser.");
  }
  if (expression.match(unclosedBlockRegex)) {
    return {
      isValid: false,
      errorMessage: "Looks like a keycode block - {} - is unclosed! Are you missing an '}'?"
    };
  }
  let groups = null;
  while (groups = keycodeBlockRegex.exec(expression)) {
    const csv = groups[1].replace(/\s+/g, "");
    if (!csv.length) {
      return {
        isValid: false,
        errorMessage: "Sorry, I can't handle empty {}. Fill them up with keycodes or use \\{} to tell the macro to literally type {}"
      };
    }
    if (/\d+/.test(csv)) {
      if (/\d{5,}/.test(csv)) {
        return {
          isValid: false,
          errorMessage: `Invalid delay: ${csv}. Please use a delay value of 9999 or less.`
        };
      }
    } else {
      const invalidKeycodes = csv.split(",").filter((keycode) => keycode.trim().length && !isAutocompleteKeycode(keycode));
      if (invalidKeycodes.length) {
        return {
          isValid: false,
          errorMessage: `Whoops! Invalid keycodes detected inside {}: ${invalidKeycodes.join(", ")}`
        };
      }
    }
  }
  return {
    isValid: true,
    errorMessage: void 0
  };
}
export class MacroAPIV11 {
  constructor(keyboardApi, basicKeyToByte, byteToKey) {
    this.keyboardApi = keyboardApi;
    this.basicKeyToByte = basicKeyToByte;
    this.byteToKey = byteToKey;
  }
  async readMacroExpressions() {
    const bytes = await this.keyboardApi.getMacroBytes();
    const macroCount = await this.keyboardApi.getMacroCount();
    let macroId = 0;
    let i = 0;
    const expressions = [];
    let currentExpression = [];
    let currentChord = [];
    if (macroCount === 0) {
      throw Error("Macros are disabled");
    }
    while (i < bytes.length && macroId < macroCount) {
      let byte = bytes[i];
      switch (byte) {
        case MacroTerminator:
          expressions[macroId] = currentExpression.join("");
          macroId++;
          currentExpression = [];
          break;
        case KeyActionPrefix:
          byte = bytes[++i];
          switch (byte) {
            case KeyAction.Tap:
              byte = bytes[++i];
              currentExpression.push(`{${this.byteToKey[byte]}}`);
              break;
            case KeyAction.Down:
              byte = bytes[++i];
              currentChord.push(this.byteToKey[byte]);
              break;
            case KeyAction.Up:
              while (bytes[i + 2] === KeyActionPrefix && bytes[i + 3] === KeyAction.Up && i < bytes.length) {
                i += 3;
              }
              currentExpression.push(`{${currentChord.join(",")}}`);
              currentChord = [];
              i++;
              break;
            case KeyAction.Delay:
              let delayBytes = [];
              byte = bytes[++i];
              while (byte !== DelayTerminator && i < bytes.length) {
                delayBytes.push(byte);
                byte = bytes[++i];
              }
              const delayValue = delayBytes.reduce((acc, byte2) => {
                acc += String.fromCharCode(byte2);
                return acc;
              }, "");
              currentExpression.push(`{${delayValue}}`);
              break;
            default:
              throw `Expected a KeyAction to follow the KeyActionPrefix. Received ${byte} instead.`;
          }
          break;
        default: {
          const char = String.fromCharCode(byte);
          if (char === "{") {
            currentExpression.push("\\");
          }
          currentExpression.push(char);
          break;
        }
      }
      i++;
    }
    return expressions;
  }
  async writeMacroExpressions(expressions) {
    const macroBytes = expressions.flatMap((expression) => {
      const validationResult = validateMacroExpressionV11(expression);
      if (!validationResult.isValid) {
        throw validationResult.errorMessage;
      }
      const bytes = [];
      let i = 0;
      while (i < expression.length) {
        const char = expression[i];
        if (char === "{" && expression[i - 1] !== "\\") {
          const keyActionEnd = expression.indexOf("}", i + 1);
          if (keyActionEnd < 0) {
            throw new Error("Syntax error: KeyAction block must end with '}'");
          }
          const block = expression.substr(i + 1, keyActionEnd - i - 1);
          if (/^\d+$/.test(block)) {
            bytes.push(KeyActionPrefix, KeyAction.Delay, ...block.split("").map((char2) => char2.charCodeAt(0)), DelayTerminator);
          } else {
            const keycodes = block.split(",").map((keycode) => keycode.trim()).filter((keycode) => keycode.length);
            switch (keycodes.length) {
              case 0:
                throw new Error("Syntax error: Keycodes expected within block. Use \\{} to define literal {}");
              case 1:
                bytes.push(...buildKeyActionBytes(this.basicKeyToByte, KeyAction.Tap, keycodes[0]));
                break;
              default:
                keycodes.forEach((keycode) => {
                  bytes.push(...buildKeyActionBytes(this.basicKeyToByte, KeyAction.Down, keycode));
                });
                keycodes.reverse().forEach((keycode) => {
                  bytes.push(...buildKeyActionBytes(this.basicKeyToByte, KeyAction.Up, keycode));
                });
                break;
            }
          }
          i = keyActionEnd;
        } else if (char === "\\" && expression[i + 1] === "{") {
        } else {
          bytes.push(char.charCodeAt(0));
        }
        i++;
      }
      bytes.push(MacroTerminator);
      return bytes;
    });
    await this.keyboardApi.setMacroBytes(macroBytes);
  }
}
