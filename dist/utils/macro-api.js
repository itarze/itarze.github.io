import {byteToKey} from "./key.js";
import {isAutocompleteKeycode} from "./autocomplete-keycodes.js";
import basicKeyToByte from "./key-to-byte.json.proxy.js";
var KeyAction;
(function(KeyAction2) {
  KeyAction2[KeyAction2["Tap"] = 1] = "Tap";
  KeyAction2[KeyAction2["Down"] = 2] = "Down";
  KeyAction2[KeyAction2["Up"] = 3] = "Up";
})(KeyAction || (KeyAction = {}));
const MacroTerminator = 0;
export function validateExpression(expression) {
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
    const invalidKeycodes = csv.split(",").filter((keycode) => keycode.trim().length && !isAutocompleteKeycode(keycode));
    if (invalidKeycodes.length) {
      return {
        isValid: false,
        errorMessage: `Whoops! Invalid keycodes detected inside {}: ${invalidKeycodes.join(", ")}`
      };
    }
  }
  return {
    isValid: true,
    errorMessage: void 0
  };
}
function getByte(keycode) {
  return basicKeyToByte[keycode.toUpperCase()];
}
export class MacroAPI {
  constructor(keyboardApi) {
    this.keyboardApi = keyboardApi;
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
        case 1:
          byte = bytes[++i];
          currentExpression.push(`{${byteToKey[byte]}}`);
          break;
        case 2:
          byte = bytes[++i];
          currentChord.push(byteToKey[byte]);
          break;
        case 3:
          while (bytes[i + 2] === 3 && i < bytes.length) {
            i += 2;
          }
          currentExpression.push(`{${currentChord.join(",")}}`);
          currentChord = [];
          i++;
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
      const validationResult = validateExpression(expression);
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
          const keycodes = expression.substr(i + 1, keyActionEnd - i - 1).split(",").map((keycode) => keycode.trim()).filter((keycode) => keycode.length);
          switch (keycodes.length) {
            case 0:
              throw new Error("Syntax error: Keycodes expected within block. Use \\{} to define literal {}");
            case 1:
              bytes.push(1);
              bytes.push(getByte(keycodes[0]));
              break;
            default:
              keycodes.forEach((keycode) => {
                bytes.push(2);
                bytes.push(getByte(keycode));
              });
              keycodes.reverse().forEach((keycode) => {
                bytes.push(3);
                bytes.push(getByte(keycode));
              });
              break;
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
