import React, {memo} from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import {
  chooseInnerKey,
  chooseInnerKeyContainer,
  CSSVarObject,
  getDarkenedColor,
  OuterKey,
  getLabel,
  OuterSecondaryKey,
  BlankKeyboardFrame,
  calculateKeyboardFrameDimensions
} from "./positioned-keyboard.js";
import {
  getKeyContainerPosition,
  getLegends,
  getRotationContainerTransform,
  noop,
  RotationContainer
} from "./positioned-keyboard/base.js";
import {
  getEncoderLegends,
  InnerEncoderKey,
  InnerEncoderKeyContainer,
  OuterEncoderKey
} from "./positioned-keyboard/encoder-key.js";
import {useAppSelector} from "../store/hooks.js";
import {getBasicKeyToByte} from "../store/definitionsSlice.js";
export var TestKeyState;
(function(TestKeyState2) {
  TestKeyState2[TestKeyState2["Initial"] = 0] = "Initial";
  TestKeyState2[TestKeyState2["KeyDown"] = 1] = "KeyDown";
  TestKeyState2[TestKeyState2["KeyUp"] = 2] = "KeyUp";
})(TestKeyState || (TestKeyState = {}));
export const TestEncoderKeyComponent = memo(({
  x,
  y,
  w,
  h,
  c,
  t,
  id,
  keyState = 0,
  label,
  onClick = noop,
  r = 0,
  rx = 0,
  ry = 0
}) => {
  const selected = false;
  const containerOnClick = (evt) => {
    evt.stopPropagation();
    onClick(id);
  };
  const keyContainerStyle = getKeyContainerPosition({
    w,
    h,
    x,
    y
  });
  return /* @__PURE__ */ React.createElement(RotationContainer, {
    selected,
    style: {...getRotationContainerTransform({r, rx, ry})}
  }, /* @__PURE__ */ React.createElement(TestKeyContainer, {
    id: id.toString(),
    style: {
      ...getKeyContainerTransform({keyState, x, y, w, h}),
      ...{opacity: 0.1}
    }
  }, /* @__PURE__ */ React.createElement(OuterEncoderKey, {
    backgroundColor: c,
    selected,
    style: {borderWidth: `${~~(keyContainerStyle.height / 18)}px`}
  }, /* @__PURE__ */ React.createElement(InnerEncoderKey, {
    selected: false,
    backgroundColor: c
  }, /* @__PURE__ */ React.createElement(InnerEncoderKeyContainer, null, getEncoderLegends([label], t))))));
});
const TestKeyComponent = React.memo(({
  x,
  y,
  w,
  h,
  c,
  t,
  id,
  h2,
  w2,
  x2,
  y2,
  keyState = 0,
  centerLabel = void 0,
  topLabel = void 0,
  bottomLabel = void 0,
  label = void 0,
  r = 0,
  rx = 0,
  ry = 0
}) => {
  const isSmall = topLabel !== void 0 || centerLabel !== void 0;
  const ChosenInnerKeyContainer = chooseInnerKeyContainer({
    topLabel,
    centerLabel
  });
  const ChosenInnerKey = chooseInnerKey({topLabel, centerLabel});
  const legends = isSmall && !centerLabel ? [topLabel, bottomLabel] : [label];
  const hasSecondKey = [h2, w2].every((i) => i !== void 0);
  return /* @__PURE__ */ React.createElement(RotationContainer, {
    selected: false,
    style: {...getRotationContainerTransform({r, rx, ry})}
  }, /* @__PURE__ */ React.createElement(TestKeyContainer, {
    id: id.toString(),
    style: getKeyContainerTransform({keyState, x, y, w, h})
  }, hasSecondKey ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(OuterSecondaryKey, {
    backgroundColor: getDarkenedColor(c),
    style: getKeyContainerPosition({
      w: w2 || 0,
      x: x2 || 0,
      y: y2 || 0,
      h: h2 || 0
    })
  }, /* @__PURE__ */ React.createElement(ChosenInnerKey, {
    backgroundColor: c
  }, /* @__PURE__ */ React.createElement(ChosenInnerKeyContainer, null)))) : null, /* @__PURE__ */ React.createElement(OuterKey, {
    backgroundColor: getDarkenedColor(c)
  }, /* @__PURE__ */ React.createElement(ChosenInnerKey, {
    backgroundColor: c,
    style: hasSecondKey ? {transform: "rotateZ(0)"} : {}
  }, /* @__PURE__ */ React.createElement(ChosenInnerKeyContainer, null, getLegends(legends, t))))));
});
const testKeyColor = {
  c: "#ad7070",
  t: "#d9d9d9"
};
export const TestKeyboard = (props) => {
  const macros = {expressions: [], isFeatureSupported: false};
  const {pressedKeys, keys, containerDimensions, matrixKeycodes} = props;
  const {width, height} = calculateKeyboardFrameDimensions(keys);
  const {basicKeyToByte, byteToKey} = useAppSelector(getBasicKeyToByte);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(BlankKeyboardFrame, {
    containerDimensions,
    width,
    height,
    selectable: false
  }, keys.map((k, index) => {
    const KeyboardKeyComponent = k["ei"] !== void 0 ? TestEncoderKeyComponent : TestKeyComponent;
    return /* @__PURE__ */ React.createElement(KeyboardKeyComponent, {
      ...{
        ...k,
        ...getLabel(matrixKeycodes[index], k.w, macros, null, basicKeyToByte, byteToKey),
        ...testKeyColor,
        keyState: pressedKeys[index],
        id: index,
        key: index
      }
    });
  })));
};
const getKeyContainerTransform = ({
  keyState,
  x,
  y,
  w,
  h
}) => ({
  transform: `translate(${CSSVarObject.keyXPos * x}px, ${CSSVarObject.keyYPos * y + (keyState !== 1 ? 0 : 1) * 2}px)`,
  width: `${CSSVarObject.keyXPos * w - CSSVarObject.keyXSpacing}px`,
  height: `${CSSVarObject.keyYPos * h - CSSVarObject.keyYSpacing}px`,
  filter: keyState !== 0 ? "saturate(1)" : "saturate(0)",
  opacity: keyState === 2 ? 1 : 0.4
});
const TestKeyContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  transition: transform 0.2s ease-out;
  user-select: none;
  transition: all 0.2s ease-out;
`;
