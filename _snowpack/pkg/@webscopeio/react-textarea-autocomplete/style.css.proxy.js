if (typeof document !== "undefined") {
  const code = ".rta {\n  position: relative;\n  font-size: 18px;\n  width: 100%;\n  height: 100%;\n}\n.rta__loader.rta__loader--empty-suggestion-data {\n  border-radius: 3px;\n  box-shadow: 0 0 5px rgba(27, 31, 35, 0.1);\n  padding: 5px;\n}\n.rta--loading .rta__loader.rta__loader--suggestion-data {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.8);\n}\n.rta--loading .rta__loader.rta__loader--suggestion-data > * {\n  position: relative;\n  top: 50%;\n}\n.rta__textarea {\n  width: 100%;\n  height: 100%;\n  font-size: 1em;\n}\n.rta__autocomplete {\n  position: absolute;\n  display: block;\n  margin-top: 1em;\n}\n.rta__autocomplete--top {\n  margin-top: 0;\n  margin-bottom: 1em;\n}\n.rta__list {\n  margin: 0;\n  padding: 0;\n  background: #fff;\n  border: 1px solid #dfe2e5;\n  border-radius: 3px;\n  box-shadow: 0 0 5px rgba(27, 31, 35, 0.1);\n  list-style: none;\n}\n.rta__entity {\n  background: white;\n  width: 100%;\n  text-align: left;\n  outline: none;\n}\n.rta__entity:hover {\n  cursor: pointer;\n}\n.rta__item:not(:last-child) {\n  border-bottom: 1px solid #dfe2e5;\n}\n.rta__entity > * {\n  padding-left: 4px;\n  padding-right: 4px;\n}\n.rta__entity--selected {\n  color: #fff;\n  text-decoration: none;\n  background: #0366d6;\n}\n";
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = "text/css";
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
