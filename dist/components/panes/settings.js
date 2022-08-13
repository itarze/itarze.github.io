import React from "../../../_snowpack/pkg/react.js";
import {Pane} from "./pane.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import {ControlRow, Label, Detail, OverflowCell} from "./grid.js";
import {AccentSlider} from "../inputs/accent-slider.js";
import {ErrorMessage} from "../styled.js";
import {useDispatch} from "../../../_snowpack/pkg/react-redux.js";
import {useAppSelector} from "../../store/hooks.js";
import {
  getShowDesignTab,
  getDisableFastRemap,
  toggleCreatorMode,
  toggleFastRemap
} from "../../store/settingsSlice.js";
const RestartMessage = styled(ErrorMessage)`
  margin: 0;
  font-size: 20px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;
const DebugPane = styled(Pane)`
  display: grid;
  max-width: 100vw;
  grid-template-columns: 100vw;
`;
export const Settings = () => {
  const dispatch = useDispatch();
  const showDesignTab = useAppSelector(getShowDesignTab);
  const disableFastRemap = useAppSelector(getDisableFastRemap);
  return /* @__PURE__ */ React.createElement(DebugPane, null, /* @__PURE__ */ React.createElement(OverflowCell, null, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Show Design tab"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
    onChange: () => dispatch(toggleCreatorMode()),
    isChecked: showDesignTab
  }))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Fast Key Mapping"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
    onChange: () => dispatch(toggleFastRemap()),
    isChecked: !disableFastRemap
  }))))));
};
