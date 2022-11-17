import React from "../_snowpack/pkg/react.js";
import {UnconnectedGlobalMenu} from "./components/menus/global.js";
import {HashRouter as Router, Switch, Route} from "../_snowpack/pkg/react-router-dom.js";
import PANES from "./utils/pane-config.js";
import {Home} from "./components/Home.js";
import {createGlobalStyle} from "../_snowpack/pkg/styled-components.js";
const GlobalStyle = createGlobalStyle`
  *:focus {
    outline: none;
  }
`;
export default () => {
  const hasHIDSupport = "hid" in navigator;
  const RouteComponents = PANES.map((pane) => {
    return /* @__PURE__ */ React.createElement(Route, {
      component: pane.component,
      exact: pane.key === "default" ? true : false,
      key: pane.key,
      path: pane.path
    });
  });
  return /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(GlobalStyle, null), hasHIDSupport && /* @__PURE__ */ React.createElement(UnconnectedGlobalMenu, null), /* @__PURE__ */ React.createElement(Home, {
    hasHIDSupport
  }, /* @__PURE__ */ React.createElement(Switch, null, RouteComponents)));
};
