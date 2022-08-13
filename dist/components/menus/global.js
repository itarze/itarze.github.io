import * as __SNOWPACK_ENV__ from "../../../_snowpack/env.js";
import React from "../../../_snowpack/pkg/react.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import {useLocation} from "../../../_snowpack/pkg/react-router.js";
import {Link} from "../../../_snowpack/pkg/react-router-dom.js";
import PANES from "../../utils/pane-config.js";
import {useAppSelector} from "../../store/hooks.js";
import {getShowDesignTab} from "../../store/settingsSlice.js";
const Container = styled.div`
  width: 100vw;
  height: 25px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color_dark-grey);
  background-color: var(--color_light-jet);
  text-align: center;
`;
const MenuItem = styled.button`
  background: none;
  border: none;
  font-family: inherit;
  outline: none;
  padding: 0;

  margin: 0 15px;
  font-size: 18px;
  text-transform: uppercase;
  cursor: pointer;
  color: ${(props) => props.selected ? "var(--color_light-grey)" : "var(--color_medium-grey)"};
  &:hover {
    color: ${(props) => props.selected ? "var(--color_light-grey)" : "var(--color_light-grey)"};
  }
`;
const {DEBUG_PROD, NODE_ENV} = __SNOWPACK_ENV__;
const showDebugPane = NODE_ENV === "development" || DEBUG_PROD === "true";
export const UnconnectedGlobalMenu = () => {
  const showDesignTab = useAppSelector(getShowDesignTab);
  const location = useLocation();
  const Panes = React.useMemo(() => {
    return PANES.map((pane) => {
      if (pane.key === "design" && !showDesignTab)
        return null;
      if (pane.key === "debug" && !showDebugPane)
        return null;
      return /* @__PURE__ */ React.createElement(Link, {
        key: pane.key,
        to: pane.path
      }, /* @__PURE__ */ React.createElement(MenuItem, {
        selected: pane.path === location.pathname
      }, pane.title));
    });
  }, [location, showDesignTab]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Container, null, Panes));
};
