import {canConnect} from "./keyboard-api.js";
import {scanDevices} from "./usb-hid.js";
const IS_OSX = false;
function isValidInterface(device) {
  return IS_OSX ? isValidUsage(device) : isValidInterfaceNonOSX(device);
}
function isValidInterfaceNonOSX(device) {
  const VALID_INTERFACE_IDS = [1];
  return VALID_INTERFACE_IDS.includes(device.interface);
}
function isValidUsage({usage = -1, usagePage = -1}) {
  const VALID_USAGE_IDS = [97];
  const VALID_USAGE_PAGE_IDS = [65376];
  return VALID_USAGE_IDS.includes(usage) && VALID_USAGE_PAGE_IDS.includes(usagePage);
}
export function getVendorProductId(vendorId, productId) {
  return vendorId * 65536 + productId;
}
function definitionExists({productId, vendorId}, definitions) {
  const definition = definitions[getVendorProductId(vendorId, productId)];
  return definition && (definition.v2 || definition.v3);
}
const idExists = ({productId, vendorId}, vpidMap) => vpidMap[getVendorProductId(vendorId, productId)];
export const getRecognisedDevices = async (vpidMap) => {
  const usbDevices = await scanDevices();
  return usbDevices.filter((device) => {
    const validVendorProduct = idExists(device, vpidMap);
    const validInterface = isValidInterface(device);
    return validVendorProduct && validInterface && canConnect(device);
  });
};
export async function getDevicesUsingDefinitions(definitions) {
  const usbDevices = await scanDevices();
  return usbDevices.filter((device) => {
    const validVendorProduct = definitionExists(device, definitions);
    const validInterface = isValidInterface(device);
    return validVendorProduct && validInterface && canConnect(device);
  });
}
