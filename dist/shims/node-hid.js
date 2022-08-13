const globalBuffer = {};
const eventWaitBuffer = {};
const filterHIDDevices = (devices) => devices.filter((device) => {
  var _a;
  return (_a = device.collections) == null ? void 0 : _a.some((collection) => collection.usage === 97 && collection.usagePage === 65376);
});
const getVIAPathIdentifier = () => self.crypto && self.crypto.randomUUID && self.crypto.randomUUID() || `via-path:${Math.random()}`;
const tagDevice = (device) => {
  var _a, _b;
  const path = device.__path || getVIAPathIdentifier();
  device.__path = path;
  const HIDDevice = {
    _device: device,
    usage: 97,
    usagePage: 65376,
    interface: 1,
    vendorId: (_a = device.vendorId) != null ? _a : -1,
    productId: (_b = device.productId) != null ? _b : -1,
    path
  };
  return ExtendedHID._cache[path] = HIDDevice;
};
const ExtendedHID = {
  _cache: {},
  requestDevice: async () => {
    const requestedDevice = await navigator.hid.requestDevice({
      filters: [
        {
          usagePage: 65376,
          usage: 97
        }
      ]
    });
    requestedDevice.forEach(tagDevice);
    return requestedDevice[0];
  },
  getFilteredDevices: async () => {
    try {
      const hidDevices = filterHIDDevices(await navigator.hid.getDevices());
      return hidDevices;
    } catch (e) {
      return [];
    }
  },
  devices: async (requestAuthorize = false) => {
    let devices = await ExtendedHID.getFilteredDevices();
    if (devices.length === 0 || requestAuthorize) {
      try {
        await ExtendedHID.requestDevice();
      } catch (e) {
        return [];
      }
      devices = await ExtendedHID.getFilteredDevices();
    }
    return devices.map(tagDevice);
  },
  HID: class HID2 {
    constructor(path) {
      var _a, _b;
      this.usage = -1;
      this.usagePage = -1;
      this.interface = -1;
      this.vendorId = -1;
      this.productId = -1;
      this.path = "";
      this.openPromise = Promise.resolve();
      this.readP = promisify((arg) => this.read(arg));
      this._hidDevice = ExtendedHID._cache[path];
      if (this._hidDevice) {
        this.vendorId = this._hidDevice.vendorId;
        this.productId = this._hidDevice.productId;
        this.path = this._hidDevice.path;
        this.usage = (_a = this._hidDevice.usage) != null ? _a : this.usage;
        this.usagePage = (_b = this._hidDevice.usagePage) != null ? _b : this.usagePage;
        this.interface = this._hidDevice.interface;
        globalBuffer[this.path] = globalBuffer[this.path] || [];
        eventWaitBuffer[this.path] = eventWaitBuffer[this.path] || [];
        if (!this._hidDevice._device.opened) {
          this.open();
        }
      } else {
        throw new Error("Missing hid device in cache");
      }
    }
    async open() {
      if (this._hidDevice && !this._hidDevice._device.opened) {
        this.openPromise = this._hidDevice._device.open();
        this.setupListeners();
        await this.openPromise;
      }
      return Promise.resolve();
    }
    setupListeners() {
      if (this._hidDevice) {
        this._hidDevice._device.addEventListener("inputreport", (e) => {
          if (eventWaitBuffer[this.path].length !== 0) {
            eventWaitBuffer[this.path].shift()(new Uint8Array(e.data.buffer));
          } else {
            globalBuffer[this.path].push(new Uint8Array(e.data.buffer));
          }
        });
      }
    }
    read(fn) {
      if (globalBuffer[this.path].length > 0) {
        fn(void 0, globalBuffer[this.path].shift());
      } else {
        eventWaitBuffer[this.path].push((data) => fn(void 0, data));
      }
    }
    async write(arr) {
      var _a;
      await this.openPromise;
      const data = new Uint8Array(arr.slice(1));
      await ((_a = this._hidDevice) == null ? void 0 : _a._device.sendReport(0, data));
    }
  }
};
const promisify = (cb) => () => {
  return new Promise((res, rej) => {
    cb((e, d) => {
      if (e)
        rej(e);
      else
        res(d);
    });
  });
};
export const HID = ExtendedHID;
