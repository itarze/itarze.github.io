import React from "../../../_snowpack/pkg/react.js";
import {getAutocompleteKeycodes} from "../../utils/autocomplete-keycodes.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
const Keycode = styled.span`
  color: var(--color_accent);
  display: flex;
  padding-left: 10px;
`;
const KeycodeLabel = styled.span`
  color: var(--color_medium-grey);
  display: flex;
`;
const Item = styled.div`
  box-sizing: border-box;
  min-width: 200px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => !props.selected ? "var(--color_light-jet)" : "var(--color_dark-grey)"};

  &:hover {
    background-color: var(--color_dark-grey);
  }
`;
export const AutocompleteItem = ({
  selected,
  entity: {label, code}
}) => /* @__PURE__ */ React.createElement(Item, {
  selected
}, /* @__PURE__ */ React.createElement(KeycodeLabel, null, label), " ", /* @__PURE__ */ React.createElement(Keycode, null, code));
export const AutocompleteLoading = () => /* @__PURE__ */ React.createElement("div", null, "Loading");
export const findKeycodes = (token) => {
  const uToken = token.toUpperCase();
  return getAutocompleteKeycodes().filter(({name, title, code}) => title ? title.toUpperCase().indexOf(uToken) > -1 : name.toUpperCase().indexOf(uToken) > -1 || code.toUpperCase().indexOf(uToken) > -1).slice(0, 10).map(({name, code, title}) => {
    const label = title ? title : name;
    return {label, code};
  });
};
