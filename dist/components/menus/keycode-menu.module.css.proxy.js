export let code = "._menu_1p0dm_1 {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  position: relative;\n}\n\n._keycodesContainer_1p0dm_8 {\n  overflow: auto;\n}\n\n._keycodes_1p0dm_8 {\n  padding: 0 5px 5px 5px;\n  display: flex;\n  flex-flow: wrap;\n  margin: 0 auto;\n  max-width: 1000px;\n}\n\n._disabled_1p0dm_20 {\n  cursor: not-allowed;\n  filter: opacity(50%);\n}\n\n._categories_1p0dm_25 {\n  padding: 2px 3px;\n  white-space: nowrap;\n  height: 31px;\n  min-height: 31px;\n  text-align: center;\n}\n\n._category_1p0dm_33 {\n  font-family: GothamRounded, sans-serif;\n  display: inline-block;\n  color: #a7a7a7;\n  font-size: 20px;\n  transition: 0.4s color ease-out;\n  padding: 4px;\n  text-transform: uppercase;\n  cursor: pointer;\n  user-select: none;\n}\n\n._selected_1p0dm_45 {\n  color: #717070;\n}\n\n._keycodeDesc_1p0dm_49 {\n  position: fixed;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  width: 100%;\n  font-size: 14px;\n  padding: 5px;\n  height: 25px;\n  box-sizing: border-box;\n  opacity: 1;\n  transition: opacity 0.4s ease-out;\n}\n\n._keycodeDesc_1p0dm_49:empty {\n  opacity: 0;\n}\n";
let json = {menu: "_menu_1p0dm_1", keycodesContainer: "_keycodesContainer_1p0dm_8", keycodes: "_keycodes_1p0dm_8", disabled: "_disabled_1p0dm_20", categories: "_categories_1p0dm_25", category: "_category_1p0dm_33", selected: "_selected_1p0dm_45", keycodeDesc: "_keycodeDesc_1p0dm_49"};
export default json;
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = "text/css";
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
