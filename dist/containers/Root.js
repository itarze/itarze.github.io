import React from "../../_snowpack/pkg/react.js";
import {Provider} from "../../_snowpack/pkg/react-redux.js";
import {store} from "../store/index.js";
import Routes from "../Routes.js";
export default () => /* @__PURE__ */ React.createElement(Provider, {
  store
}, /* @__PURE__ */ React.createElement(Routes, null));
