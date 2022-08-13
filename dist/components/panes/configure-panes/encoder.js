import React, {useState, useEffect} from "../../../../_snowpack/pkg/react.js";
import {Detail, Label, OverflowCell, ControlRow} from "../grid.js";
import {CenterPane} from "../pane.js";
import styled from "../../../../_snowpack/pkg/styled-components.js";
import {useAppSelector} from "../../../store/hooks.js";
import {PelpiKeycodeInput} from "../../inputs/pelpi/keycode-input.js";
import {
  getSelectedKeyDefinitions
} from "../../../store/definitionsSlice.js";
import {
  getSelectedKey,
  getSelectedKeymap,
  getSelectedLayerIndex,
  updateKey
} from "../../../store/keymapSlice.js";
import {getSelectedConnectedDevice} from "../../../store/devicesSlice.js";
import {useDispatch} from "../../../../_snowpack/pkg/react-redux.js";
const Encoder = styled(CenterPane)`
  height: 100%;
  background: var(--color_dark_grey);
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;
export const Pane = () => {
  const [cwValue, setCWValue] = useState();
  const [ccwValue, setCCWValue] = useState();
  const selectedKey = useAppSelector(getSelectedKey);
  const dispatch = useDispatch();
  const keys = useAppSelector(getSelectedKeyDefinitions);
  const matrixKeycodes = useAppSelector((state) => getSelectedKeymap(state) || []);
  const layer = useAppSelector(getSelectedLayerIndex);
  if (selectedKey === null || keys[selectedKey] === void 0) {
    return null;
  }
  const val = matrixKeycodes[selectedKey];
  const encoderKey = keys[selectedKey];
  const canClick = encoderKey.col !== -1 && encoderKey.row !== -1;
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  const setEncoderValue = (type, val2) => {
    if (selectedDevice && selectedDevice.api && encoderKey.ei !== void 0) {
      const {api} = selectedDevice;
      const encoderId = +encoderKey.ei;
      switch (type) {
        case "ccw": {
          api.setEncoderValue(layer, encoderId, false, val2);
          setCCWValue(val2);
          break;
        }
        case "cw": {
          api.setEncoderValue(layer, encoderId, true, val2);
          setCWValue(val2);
          break;
        }
        case "click": {
          dispatch(updateKey(selectedKey, val2));
          break;
        }
      }
    }
  };
  const loadValues = async (layer2, id, api) => {
    const cw = await api.getEncoderValue(layer2, id, true);
    const ccw = await api.getEncoderValue(layer2, id, false);
    setCWValue(cw);
    setCCWValue(ccw);
  };
  useEffect(() => {
    if (encoderKey !== void 0 && encoderKey.ei !== void 0 && selectedDevice && selectedDevice.api) {
      const encoderId = +encoderKey.ei;
      loadValues(layer, encoderId, selectedDevice.api);
    }
  }, [encoderKey, selectedDevice, layer]);
  if (selectedDevice && selectedDevice.protocol < 10 || ccwValue === void 0 || cwValue === void 0) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(OverflowCell, null, /* @__PURE__ */ React.createElement(Encoder, null, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Rotate Counterclockwise"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(PelpiKeycodeInput, {
    value: ccwValue,
    meta: {},
    setValue: (val2) => setEncoderValue("ccw", val2)
  }))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Rotate Clockwise"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(PelpiKeycodeInput, {
    value: cwValue,
    meta: {},
    setValue: (val2) => setEncoderValue("cw", val2)
  }))), canClick && /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Press Encoder"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(PelpiKeycodeInput, {
    value: val,
    meta: {},
    setValue: (val2) => setEncoderValue("click", val2)
  }))))));
};
