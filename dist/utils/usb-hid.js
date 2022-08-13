import {HID} from "../shims/node-hid.js";
import {usbDetect} from "../shims/usb-detection.js";
export {HID} from "../shims/node-hid.js";
export {usbDetect} from "../shims/usb-detection.js";
export async function scanDevices() {
  return HID.devices();
}
export function initAndConnectDevice({path}) {
  const device = new HID.HID(path);
  return device;
}
export function startMonitoring() {
  usbDetect.startMonitoring();
}
