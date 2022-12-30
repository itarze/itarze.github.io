import basicKeyToByte from "./default.json.proxy.js";
import v10BasicKeyToByte from "./v10.json.proxy.js";
import v11BasicKeyToByte from "./v11.json.proxy.js";
export function getBasicKeyDict(version) {
  switch (version) {
    case 12: {
      return v11BasicKeyToByte;
    }
    case 11: {
      return v11BasicKeyToByte;
    }
    case 10: {
      return v10BasicKeyToByte;
    }
    default: {
      return basicKeyToByte;
    }
  }
}
