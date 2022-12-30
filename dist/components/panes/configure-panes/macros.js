import React, {useState, useMemo} from "../../../../_snowpack/pkg/react.js";
import styled from "../../../../_snowpack/pkg/styled-components.js";
import {OverflowCell, SubmenuOverflowCell, SubmenuRow} from "../grid.js";
import {CenterPane} from "../pane.js";
import {title, component} from "../../icons/adjust.js";
import {MacroDetailPane} from "./submenus/macros/macro-detail.js";
import {useAppSelector} from "../../../store/hooks.js";
import {getSelectedConnectedDevice} from "../../../store/devicesSlice.js";
import {saveMacros} from "../../../store/macrosSlice.js";
import {useDispatch} from "../../../../_snowpack/pkg/react-redux.js";
const MacroPane = styled(CenterPane)`
  height: 100%;
  background: var(--color_dark_grey);
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 12px;
`;
const MenuContainer = styled.div`
  padding: 15px 20px 20px 10px;
`;
export const Pane = () => {
  const dispatch = useDispatch();
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  const macroExpressions = useAppSelector((state) => state.macros.expressions);
  const [selectedMacro, setSelectedMacro] = useState(0);
  const saveMacro = async (macro) => {
    if (!selectedDevice) {
      return;
    }
    const newMacros = macroExpressions.map((oldMacro, i) => i === selectedMacro ? macro : oldMacro);
    dispatch(saveMacros(selectedDevice, newMacros));
  };
  const macroMenus = useMemo(() => Array(16).fill(0).map((_, idx) => idx).map((idx) => /* @__PURE__ */ React.createElement(SubmenuRow, {
    selected: selectedMacro === idx,
    onClick: () => setSelectedMacro(idx),
    key: idx
  }, `Macro ${idx}`)), [selectedMacro]);
  if (!selectedDevice) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SubmenuOverflowCell, null, /* @__PURE__ */ React.createElement(MenuContainer, null, macroMenus)), /* @__PURE__ */ React.createElement(OverflowCell, null, /* @__PURE__ */ React.createElement(MacroPane, null, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(MacroDetailPane, {
    macroExpressions,
    selectedMacro,
    saveMacros: saveMacro,
    protocol: selectedDevice ? selectedDevice.protocol : -1,
    key: selectedMacro
  })))));
};
export const Icon = component;
export const Title = title;
