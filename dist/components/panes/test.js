import React, {useState, useEffect, useRef} from "../../../_snowpack/pkg/react.js";
import fullKeyboardDefinition from "../../utils/test-keyboard-definition.json.proxy.js";
import {Pane} from "./pane.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import {PROTOCOL_GAMMA, KeyboardValue} from "../../utils/keyboard-api.js";
import {TestKeyboard, TestKeyState} from "../test-keyboard.js";
import {matrixKeycodes, getIndexByEvent} from "../inputs/musical-key-slider.js";
import {
  ControlRow,
  Label,
  Detail,
  OverflowCell,
  FlexCell,
  Grid1Col
} from "./grid.js";
import {AccentSlider} from "../inputs/accent-slider.js";
import {AccentButton} from "../inputs/accent-button.js";
import {useDispatch} from "../../../_snowpack/pkg/react-redux.js";
import {useAppSelector} from "../../store/hooks.js";
import {getSelectedConnectedDevice} from "../../store/devicesSlice.js";
import {
  getSelectedDefinition,
  getSelectedKeyDefinitions
} from "../../store/definitionsSlice.js";
import {
  getIsTestMatrixEnabled,
  setTestMatrixEnabled
} from "../../store/settingsSlice.js";
import {useSize} from "../../utils/use-size.js";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;
const TestPane = styled(Pane)`
  display: flex;
  height: 100%;
  max-width: 100vw;
  flex-direction: column;
`;
let startTest = false;
const invertTestKeyState = (s) => s === TestKeyState.KeyDown ? TestKeyState.KeyUp : TestKeyState.KeyDown;
export const Test = () => {
  const dispatch = useDispatch();
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const keyDefinitions = useAppSelector(getSelectedKeyDefinitions);
  const isTestMatrixEnabled = useAppSelector(getIsTestMatrixEnabled);
  const [selectedKeys, setSelectedKeys] = useState({});
  let flat = [];
  function downHandler(evt) {
    var _a;
    evt.preventDefault();
    if (!startTest && selectedKeys[(_a = getIndexByEvent(evt)) != null ? _a : -1] !== TestKeyState.KeyDown) {
      setSelectedKeys((selectedKeys2) => ({
        ...selectedKeys2,
        [getIndexByEvent(evt)]: TestKeyState.KeyDown
      }));
    }
  }
  const upHandler = (evt) => {
    evt.preventDefault();
    if (!startTest && selectedKeys[getIndexByEvent(evt)] !== TestKeyState.KeyUp) {
      setSelectedKeys((selectedKeys2) => ({
        ...selectedKeys2,
        [getIndexByEvent(evt)]: TestKeyState.KeyUp
      }));
    }
  };
  const useMatrixTest = async () => {
    if (startTest && api && selectedDefinition) {
      const {cols, rows} = selectedDefinition.matrix;
      const bytesPerRow = Math.ceil(cols / 8);
      try {
        const newFlat = await api.getKeyboardValue(KeyboardValue.SWITCH_MATRIX_STATE, bytesPerRow * rows);
        const keysChanges = newFlat.reduce((prev, val, byteIdx) => {
          return prev + val ^ (flat[byteIdx] || 0);
        }, 0) !== 0;
        if (!keysChanges) {
          await api.timeout(20);
          useMatrixTest();
          return;
        }
        setSelectedKeys((selectedKeys2) => {
          const newPressedKeys = newFlat.reduce((res, val, byteIdx) => {
            const xor = val ^ (flat[byteIdx] || 0);
            if (xor === 0) {
              return res;
            }
            const row = ~~(byteIdx / bytesPerRow);
            const colOffset = 8 * (bytesPerRow - 1 - byteIdx % bytesPerRow);
            return Array(Math.max(0, Math.min(8, cols - colOffset))).fill(0).reduce((resres, _, idx) => {
              const matrixIdx = cols * row + idx + colOffset;
              resres[matrixIdx] = (xor >> idx & 1) === 1 ? invertTestKeyState(resres[matrixIdx]) : resres[matrixIdx];
              return resres;
            }, res);
          }, Array.isArray(selectedKeys2) && selectedKeys2.length === rows * cols ? [...selectedKeys2] : Array(rows * cols).fill(TestKeyState.Initial));
          return newPressedKeys;
        });
        flat = newFlat;
        await api.timeout(20);
        useMatrixTest();
      } catch (e) {
        startTest = false;
        dispatch(setTestMatrixEnabled(false));
      }
    }
  };
  const onClickHandler = () => {
    flat = [];
    setSelectedKeys({});
  };
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      startTest = false;
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
      dispatch(setTestMatrixEnabled(false));
    };
  }, []);
  const flexRef = useRef(null);
  const dimensions = useSize(flexRef);
  const hasTestMatrixDevice = selectedDevice && selectedDefinition && keyDefinitions;
  const canUseMatrixState = hasTestMatrixDevice && PROTOCOL_GAMMA <= selectedDevice.protocol;
  const api = selectedDevice && selectedDevice.api;
  const pressedKeys = !isTestMatrixEnabled || !keyDefinitions ? selectedKeys : keyDefinitions.map(({row, col}) => selectedDefinition && selectedKeys[row * selectedDefinition.matrix.cols + col]);
  const testDefinition = isTestMatrixEnabled ? selectedDefinition : fullKeyboardDefinition;
  const testKeys = isTestMatrixEnabled ? keyDefinitions : fullKeyboardDefinition.layouts.keys;
  return /* @__PURE__ */ React.createElement(TestPane, null, /* @__PURE__ */ React.createElement(Grid1Col, null, /* @__PURE__ */ React.createElement(FlexCell, {
    ref: flexRef
  }, /* @__PURE__ */ React.createElement(TestKeyboard, {
    definition: testDefinition,
    keys: testKeys,
    pressedKeys,
    matrixKeycodes: isTestMatrixEnabled ? [] : matrixKeycodes,
    containerDimensions: dimensions
  })), /* @__PURE__ */ React.createElement(OverflowCell, null, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Reset Keyboard"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: onClickHandler
  }, "Reset"))), canUseMatrixState && selectedDefinition ? /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Test Matrix"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
    isChecked: isTestMatrixEnabled,
    onChange: (val) => {
      startTest = val;
      dispatch(setTestMatrixEnabled(val));
      if (val) {
        setSelectedKeys({});
        useMatrixTest();
      } else {
        setSelectedKeys({});
      }
    }
  }))) : null))));
};
