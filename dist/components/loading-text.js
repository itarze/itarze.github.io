import React from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
const LoadingText = styled.div`
  font-size: 30px;
  color: var(--color_light-grey);
`;
var LoadingLabel;
(function(LoadingLabel2) {
  LoadingLabel2["Searching"] = "Searching for devices...";
  LoadingLabel2["Loading"] = "Loading...";
})(LoadingLabel || (LoadingLabel = {}));
export default function(props) {
  return /* @__PURE__ */ React.createElement(LoadingText, {
    "data-tid": "loading-message"
  }, props.isSearching ? LoadingLabel.Searching : LoadingLabel.Loading);
}
