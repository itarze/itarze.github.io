var stringOrChar = /("(?:[^\\"]|\\.)*")|[:,]/g;
var jsonStringifyPrettyCompact = function stringify(passedObj, options) {
  var indent, maxLength, replacer;
  options = options || {};
  indent = JSON.stringify([1], void 0, options.indent === void 0 ? 2 : options.indent).slice(2, -3);
  maxLength = indent === "" ? Infinity : options.maxLength === void 0 ? 80 : options.maxLength;
  replacer = options.replacer;
  return function _stringify(obj, currentIndent, reserved) {
    var end, index, items, key, keyPart, keys, length, nextIndent, prettified, start, string, value;
    if (obj && typeof obj.toJSON === "function") {
      obj = obj.toJSON();
    }
    string = JSON.stringify(obj, replacer);
    if (string === void 0) {
      return string;
    }
    length = maxLength - currentIndent.length - reserved;
    if (string.length <= length) {
      prettified = string.replace(stringOrChar, function(match, stringLiteral) {
        return stringLiteral || match + " ";
      });
      if (prettified.length <= length) {
        return prettified;
      }
    }
    if (replacer != null) {
      obj = JSON.parse(string);
      replacer = void 0;
    }
    if (typeof obj === "object" && obj !== null) {
      nextIndent = currentIndent + indent;
      items = [];
      index = 0;
      if (Array.isArray(obj)) {
        start = "[";
        end = "]";
        length = obj.length;
        for (; index < length; index++) {
          items.push(_stringify(obj[index], nextIndent, index === length - 1 ? 0 : 1) || "null");
        }
      } else {
        start = "{";
        end = "}";
        keys = Object.keys(obj);
        length = keys.length;
        for (; index < length; index++) {
          key = keys[index];
          keyPart = JSON.stringify(key) + ": ";
          value = _stringify(obj[key], nextIndent, keyPart.length + (index === length - 1 ? 0 : 1));
          if (value !== void 0) {
            items.push(keyPart + value);
          }
        }
      }
      if (items.length > 0) {
        return [start, indent + items.join(",\n" + nextIndent), end].join("\n" + currentIndent);
      }
    }
    return string;
  }(passedObj, "", 0);
};
export default jsonStringifyPrettyCompact;
