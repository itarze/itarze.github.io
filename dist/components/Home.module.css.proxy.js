export let code = "._container_kcit0_1 h2 {\n  font-size: 2rem;\n}\n\n._container_kcit0_1 a {\n  font-size: 1.4rem;\n}\n\n._container_kcit0_1 {\n  flex: 1;\n  overflow: auto;\n}\n\n._menuContainer_kcit0_14 {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: #eaeaea;\n  position: relative;\n  box-shadow: inset #a7a7a7 0 1px 1px;\n}\n\n._home_kcit0_23 {\n  background: var(--color_jet);\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  height: 100%;\n  overflow: hidden;\n}\n\n._usbError_kcit0_32 {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  justify-content: center;\n  margin: 0 auto;\n  max-width: 650px;\n  text-align: center;\n}\n\n._usbErrorIcon_kcit0_43 {\n  font-size: 2rem;\n}\n\n._usbErrorHeading_kcit0_47 {\n  margin: 1rem 0 0;\n}\n\n._usbErrorWebHIDLink_kcit0_51 {\n  text-decoration: underline;\n}\n\n*:focus {\n  outline: none;\n}\n";
let json = {container: "_container_kcit0_1", menuContainer: "_menuContainer_kcit0_14", home: "_home_kcit0_23", usbError: "_usbError_kcit0_32", usbErrorIcon: "_usbErrorIcon_kcit0_43", usbErrorHeading: "_usbErrorHeading_kcit0_47", usbErrorWebHIDLink: "_usbErrorWebHIDLink_kcit0_51"};
export default json;
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = "text/css";
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
