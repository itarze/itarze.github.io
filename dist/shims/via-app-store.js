export class Store {
  constructor(defaults) {
    const store = localStorage.getItem("via-app-store");
    this.store = store ? JSON.parse(store) : defaults;
  }
  get(key) {
    return this.store[key];
  }
  set(key, value) {
    this.store = {
      ...this.store,
      [key]: value
    };
    localStorage.setItem("via-app-store", JSON.stringify(this.store));
  }
}
