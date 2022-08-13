export let code = "._lens_1uhit_1 {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  border: 2px solid black;\n  opacity: 0.7;\n  background: rgba(255, 255, 255, 0.2);\n  pointer-events: none;\n  box-sizing: border-box;\n  transform: translate3d(195px, 195px, 0);\n}\n\n._mouseDown_1uhit_14 {\n  cursor: pointer;\n}\n\n._label_1uhit_18 {\n  font-size: 14px;\n  color: #717070;\n}\n\n._colorCategoryContainer_1uhit_23 {\n  margin: 0 5px;\n}\n\n._colorCategory_1uhit_23 {\n  margin-top: 5px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 250px;\n  height: 250px;\n  box-shadow: rgba(0, 0, 0, 0.11) 0 1px 1px 1px;\n}\n\n._container_1uhit_37 {\n  border: 10px solid whitesmoke;\n  width: 180px;\n  height: 180px;\n  position: relative;\n}\n\n._inner_1uhit_44 {\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(to top, white, rgba(0, 0, 0, 0));\n}\n\n._outer_1uhit_50 {\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(\n    to right,\n    red,\n    yellow,\n    lime,\n    aqua,\n    blue,\n    magenta,\n    red\n  );\n}\n";
let json = {lens: "_lens_1uhit_1", mouseDown: "_mouseDown_1uhit_14", label: "_label_1uhit_18", colorCategoryContainer: "_colorCategoryContainer_1uhit_23", colorCategory: "_colorCategory_1uhit_23", container: "_container_1uhit_37", inner: "_inner_1uhit_44", outer: "_outer_1uhit_50"};
export default json;
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = "text/css";
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
