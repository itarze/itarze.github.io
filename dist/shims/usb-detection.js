const _usbDetect = class {
  static startMonitoring() {
    this.shouldMonitor = true;
    if (!this.hasMonitored) {
      navigator.hid.addEventListener("connect", _usbDetect.onConnect);
      navigator.hid.addEventListener("disconnect", _usbDetect.onDisconnect);
    }
  }
  static stopMonitoring() {
    this.shouldMonitor = false;
  }
  static on(eventName, cb) {
    this._listeners[eventName] = [...this._listeners[eventName], cb];
  }
  static off(eventName, cb) {
    this._listeners[eventName] = this._listeners[eventName].filter((f) => f !== cb);
  }
};
export let usbDetect = _usbDetect;
usbDetect._listeners = {
  change: [],
  remove: []
};
usbDetect.shouldMonitor = false;
usbDetect.hasMonitored = false;
usbDetect.onConnect = ({device}) => {
  console.log("Detected Connection");
  if (_usbDetect.shouldMonitor) {
    _usbDetect._listeners.change.forEach((f) => f(device));
  }
};
usbDetect.onDisconnect = ({device}) => {
  console.log("Detected Disconnection");
  if (_usbDetect.shouldMonitor) {
    _usbDetect._listeners.change.forEach((f) => f(device));
    _usbDetect._listeners.remove.forEach((f) => f(device));
  }
};
