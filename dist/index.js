import "../_snowpack/pkg/@webscopeio/react-textarea-autocomplete/style.css.proxy.js";
import React from "../_snowpack/pkg/react.js";
import {render} from "../_snowpack/pkg/react-dom.js";
import Root from "./containers/Root.js";
import {ApplicationInsights} from "../_snowpack/pkg/@microsoft/applicationinsights-web.js";
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: "b3c046b8-137c-47f3-b28d-9049abfa9fe8"
  }
});
appInsights.loadAppInsights();
appInsights.trackPageView();
render(/* @__PURE__ */ React.createElement(Root, null), document.getElementById("root"));
