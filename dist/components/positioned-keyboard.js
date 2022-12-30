import React, {memo} from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import partition from "../../_snowpack/pkg/lodash.partition.js";
import {
  getLabelForByte,
  isUserKeycodeByte,
  getUserKeycodeIndex,
  isAlpha,
  isNumericSymbol,
  isNumericOrShiftedSymbol,
  isMacro,
  getShortNameForKeycode
} from "../utils/key.js";
import {getBoundingBox} from "../../_snowpack/pkg/@the-via/reader.js";
import {getThemeFromStore} from "../utils/device-store.js";
import {useAppSelector} from "../store/hooks.js";
import {
  getBasicKeyToByte,
  getSelectedDefinition,
  getSelectedKeyDefinitions
} from "../store/definitionsSlice.js";
import {
  getSelectedKey,
  getSelectedKeymap,
  updateSelectedKey
} from "../store/keymapSlice.js";
import {useDispatch} from "../../_snowpack/pkg/react-redux.js";
import {
  getBGKeyContainerPosition,
  getKeyContainerPosition,
  getLegends,
  getRotationContainerTransform,
  KeyContainer,
  noop,
  RotationContainer
} from "./positioned-keyboard/base.js";
import {EncoderKeyComponent} from "./positioned-keyboard/encoder-key.js";
import {Matrix} from "./positioned-keyboard/matrix.js";
export const CSSVarObject = {
  keyWidth: 52,
  keyXSpacing: 2,
  keyHeight: 54,
  keyYSpacing: 2,
  keyXPos: 52 + 2,
  keyYPos: 54 + 2
};
const KeyboardFrame = styled.div`
  pointer-events: ${(props) => props.selectable ? "all" : "none"};
  width: ${(props) => CSSVarObject.keyXPos * props.width - CSSVarObject.keyXSpacing}px;
  height: ${(props) => CSSVarObject.keyYPos * props.height - CSSVarObject.keyYSpacing}px;
  background: var(--color_medium-grey);
  padding: 2px;
  border-radius: 3px;
  box-shadow: var(--color_dark-grey) 0 1px 0px 3px;
  padding: 5px;
  background: var(--color_light-jet);
  position: relative;
  transform: ${(props) => {
  if (props.containerDimensions) {
    const ratio = Math.min(1, props.containerDimensions.width / ((CSSVarObject.keyWidth + CSSVarObject.keyXSpacing) * props.width - CSSVarObject.keyXSpacing + 30));
    return `scale(${ratio}, ${ratio})`;
  }
  return "initial";
}};
`;
export const BlankKeyboardFrame = styled(KeyboardFrame)`
  padding: 5px;
  background: var(--color_light-jet);
  position: relative;
  transform: ${(props) => {
  if (props.containerDimensions) {
    const ratio = Math.min(1, props.containerDimensions.width / ((CSSVarObject.keyWidth + CSSVarObject.keyXSpacing) * props.width - CSSVarObject.keyXSpacing + 20));
    return `scale(${ratio}, ${ratio})`;
  }
  return "initial";
}};
`;
export const BGKeyContainer = styled(KeyContainer)`
  transform: translate3d(0, -4px, 0) scale(0.99);
`;
const SmallInnerKey = styled.div`
  height: 100%;
  position: relative;
  margin: auto;
  background-color: ${(props) => props.backgroundColor};
  line-height: 20px;
  box-sizing: border-box;
  border-radius: 3px;
  font-size: 12px;
  padding-top: 0;
`;
const InnerKey = styled.div`
  height: 100%;
  margin: auto;
  background-color: ${(props) => props.backgroundColor};
  line-height: 20px;
  box-sizing: border-box;
  border-radius: 3px;
  padding-top: 2px;
`;
const InnerKeyContainer = styled.div`
  position: absolute;
  padding-left: 5px;
  width: 100%;
`;
export const OuterEncoderKey = styled.div`
  overflow: hidden;
  border: 2px solid var(--color_accent);
  border-style: dotted;
  border-color: ${(props) => props.selected ? `var(--color_accent)` : props.backgroundColor};
  background-color: ${(props) => props.selected ? `var(--color_dark-accent)` : getDarkenedColor(props.backgroundColor)};
  animation-duration: ${(props) => props.selected ? 2 : 0}s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  height: 100%;
  border-radius: 50%;
  box-sizing: border-box;
  display: block;
  margin-right: 2px;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SmallInnerCenterKeyContainer = styled.div`
  position: absolute;
  padding-left: 2px;
  top: 10px;
  width: 100%;
`;
export const OuterSecondaryKey = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding-top: 2px;
  padding-bottom: 9px;
  padding-left: 6px;
  padding-right: 6px;
  height: 100%;
  border-radius: 3px;
  box-sizing: border-box;
  display: block;
  margin-right: 2px;
  width: 100%;
  cursor: pointer;
  position: absolute;
`;
export const OuterKey = styled.div`
  background-color: ${(props) => props.backgroundColor};
  animation-duration: ${(props) => props.selected ? 2 : 0}s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  padding-top: 2px;
  padding-bottom: 9px;
  padding-left: 6px;
  padding-right: 6px;
  height: 100%;
  border-radius: 3px;
  box-sizing: border-box;
  display: block;
  margin-right: 2px;
  width: 100%;
  cursor: pointer;
`;
export const getDarkenedColor = (color) => {
  const cleanedColor = color.replace("#", "");
  const r = parseInt(cleanedColor[0], 16) * 16 + parseInt(cleanedColor[1], 16);
  const g = parseInt(cleanedColor[2], 16) * 16 + parseInt(cleanedColor[3], 16);
  const b = parseInt(cleanedColor[4], 16) * 16 + parseInt(cleanedColor[5], 16);
  const hr = Math.round(r * 0.8).toString(16);
  const hg = Math.round(g * 0.8).toString(16);
  const hb = Math.round(b * 0.8).toString(16);
  const res = `#${hr.padStart(2, "0")}${hg.padStart(2, "0")}${hb.padStart(2, "0")}`;
  return res;
};
export const chooseInnerKey = (props) => {
  const {topLabel, centerLabel} = props;
  const isSmall = topLabel !== void 0 || centerLabel !== void 0;
  return isSmall ? SmallInnerKey : InnerKey;
};
export const chooseInnerKeyContainer = (props) => {
  const {topLabel, centerLabel} = props;
  const isSmall = topLabel !== void 0 || centerLabel !== void 0;
  return isSmall && centerLabel ? SmallInnerCenterKeyContainer : InnerKeyContainer;
};
export const KeyBG = memo(({x, x2, y, y2, w, w2, h, h2, r = 0, rx = 0, ry = 0, ei}) => {
  const hasSecondKey = [h2, w2].every((i) => i !== void 0);
  const backColor = "var(--color_accent)";
  const radiusStyle = ei !== void 0 ? {borderRadius: "50%", overflow: "hidden"} : {};
  return /* @__PURE__ */ React.createElement(RotationContainer, {
    selected: true,
    style: {...getRotationContainerTransform({r, rx, ry})}
  }, /* @__PURE__ */ React.createElement(BGKeyContainer, {
    selected: true,
    style: {
      ...getBGKeyContainerPosition({w, h, x, y}),
      ...radiusStyle
    }
  }, hasSecondKey ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(OuterSecondaryKey, {
    backgroundColor: backColor,
    style: getBGKeyContainerPosition({
      w: w2,
      x: x2 || 0,
      y: y2 || 0,
      h: h2
    })
  })) : null, /* @__PURE__ */ React.createElement(OuterKey, {
    backgroundColor: backColor
  })));
});
const KeyComponent = memo(({
  x,
  x2,
  y,
  y2,
  w,
  w2,
  h,
  h2,
  c,
  t,
  r = 0,
  rx = 0,
  ry = 0,
  selected,
  macroExpression,
  centerLabel = void 0,
  topLabel = void 0,
  bottomLabel = void 0,
  label = void 0,
  id,
  onClick = noop
}) => {
  const isSmall = topLabel !== void 0 || centerLabel !== void 0;
  const ChosenInnerKeyContainer = chooseInnerKeyContainer({
    topLabel,
    centerLabel
  });
  const ChosenInnerKey = chooseInnerKey({topLabel, centerLabel});
  const legends = isSmall && !centerLabel ? [topLabel, bottomLabel] : [label];
  const tooltipData = label && getTooltipData({macroExpression, label});
  const containerOnClick = (evt) => {
    evt.stopPropagation();
    onClick(id);
  };
  const hasSecondKey = [h2, w2].every((i) => i !== void 0);
  return /* @__PURE__ */ React.createElement(RotationContainer, {
    selected,
    style: {...getRotationContainerTransform({r, rx, ry})}
  }, /* @__PURE__ */ React.createElement(KeyContainer, {
    id: id.toString(),
    ...tooltipData,
    selected,
    style: getKeyContainerPosition({w, h, x, y}),
    onClick: containerOnClick
  }, hasSecondKey ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(OuterSecondaryKey, {
    backgroundColor: getDarkenedColor(c),
    style: getKeyContainerPosition({
      w: w2 || 0,
      x: x2 || 0,
      y: y2 || 0,
      h: h2 || 0
    })
  }, /* @__PURE__ */ React.createElement(ChosenInnerKey, {
    style: hasSecondKey ? {transform: "rotateZ(0)"} : {},
    backgroundColor: c
  }, /* @__PURE__ */ React.createElement(ChosenInnerKeyContainer, null)))) : null, /* @__PURE__ */ React.createElement(OuterKey, {
    selected,
    backgroundColor: getDarkenedColor(c)
  }, /* @__PURE__ */ React.createElement(ChosenInnerKey, {
    style: hasSecondKey ? {transform: "rotateZ(0)"} : {},
    backgroundColor: c
  }, /* @__PURE__ */ React.createElement(ChosenInnerKeyContainer, null, getLegends(legends, t))))));
});
const getTooltipData = ({
  macroExpression,
  label
}) => label && label.length > 15 ? {"data-tip": label} : macroExpression && macroExpression.length ? {"data-tip": macroExpression} : {};
export const getLabel = (keycodeByte, width, macros, selectedDefinition, basicKeyToByte, byteToKey) => {
  var _a;
  let label = "";
  if (isUserKeycodeByte(keycodeByte, basicKeyToByte) && (selectedDefinition == null ? void 0 : selectedDefinition.customKeycodes)) {
    const userKeycodeIdx = getUserKeycodeIndex(keycodeByte, basicKeyToByte);
    label = getShortNameForKeycode(selectedDefinition.customKeycodes[userKeycodeIdx]);
  } else if (keycodeByte) {
    label = (_a = getLabelForByte(keycodeByte, width * 100, basicKeyToByte, byteToKey)) != null ? _a : "";
  }
  let macroExpression;
  if (isMacro(label)) {
    macroExpression = macros.expressions[label.substring(1)];
  }
  if (isAlpha(label) || isNumericOrShiftedSymbol(label)) {
    return label && {
      label: label.toUpperCase(),
      macroExpression
    };
  } else if (isNumericSymbol(label)) {
    const topLabel = label[0];
    const bottomLabel = label[label.length - 1];
    return bottomLabel && {
      topLabel,
      bottomLabel,
      macroExpression
    };
  } else {
    return label && {
      label,
      centerLabel: label,
      macroExpression
    };
  }
};
export const getColors = (color) => getThemeFromStore()[color];
const AnchorContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
export const calculateKeyboardFrameDimensions = (keys) => {
  const boundingBoxes = keys.map(getBoundingBox);
  const minX = Math.min(...boundingBoxes.map((b) => b.xStart));
  const minY = Math.min(...boundingBoxes.map((b) => b.yStart));
  const width = Math.max(...boundingBoxes.map((b) => b.xEnd)) - minX;
  const height = Math.max(...boundingBoxes.map((b) => b.yEnd)) - minY;
  return {
    width,
    height
  };
};
export const PositionedKeyboard = (props) => {
  const {selectable, containerDimensions} = props;
  const dispatch = useDispatch();
  const selectedKey = useAppSelector(getSelectedKey);
  const {basicKeyToByte, byteToKey} = useAppSelector(getBasicKeyToByte);
  const matrixKeycodes = useAppSelector((state) => getSelectedKeymap(state) || []);
  const macros = useAppSelector((state) => state.macros);
  const keys = useAppSelector(getSelectedKeyDefinitions);
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  if (!selectedDefinition || !keys) {
    return null;
  }
  const {width, height} = calculateKeyboardFrameDimensions(keys);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(KeyboardFrame, {
    key: selectedDefinition.vendorProductId,
    width,
    height,
    selectable,
    containerDimensions
  }, /* @__PURE__ */ React.createElement(AnchorContainer, null, selectedKey !== null ? /* @__PURE__ */ React.createElement(KeyBG, {
    ...keys[selectedKey]
  }) : null, keys.map((k, index) => {
    const KeyboardKeyComponent = k["ei"] !== void 0 ? EncoderKeyComponent : KeyComponent;
    return /* @__PURE__ */ React.createElement(KeyboardKeyComponent, {
      ...{
        ...k,
        ...getLabel(matrixKeycodes[index], k.w, macros, selectedDefinition, basicKeyToByte, byteToKey),
        ...getColors(k.color),
        selected: selectedKey === index,
        onClick: selectable ? (id) => {
          dispatch(updateSelectedKey(id));
        } : noop
      },
      key: index,
      id: index
    });
  }))));
};
export const BlankPositionedKeyboard = (props) => /* @__PURE__ */ React.createElement(BlankPositionedKeyboardComponent, {
  ...props,
  selectable: false,
  selectedKey: props.selectedKey === void 0 ? null : props.selectedKey,
  macros: {expressions: [], isFeatureSupported: false}
});
export function calculatePointPosition({
  x = 0,
  y = 0,
  r = 0,
  rx = 0,
  ry = 0,
  w = 0,
  h = 0
}) {
  const rRadian = r * (2 * Math.PI) / 360;
  const cosR = Math.cos(rRadian);
  const sinR = Math.sin(rRadian);
  const originX = CSSVarObject.keyXPos * rx;
  const originY = CSSVarObject.keyYPos * ry;
  const xPos = CSSVarObject.keyXPos * x + w * CSSVarObject.keyWidth / 2;
  const yPos = CSSVarObject.keyYPos * y + h * CSSVarObject.keyHeight / 2;
  const transformedXPos = xPos * cosR - yPos * sinR - originX * cosR + originY * sinR + originX;
  const transformedYPos = xPos * sinR + yPos * cosR - originX * sinR - originY * cosR + originY;
  return [transformedXPos, transformedYPos];
}
const generateRowColArray = (keys, rows, cols) => {
  const matrixKeys = keys.filter((key) => key["ei"] === void 0);
  const rowKeys = matrixKeys.reduce((sumKeys, key) => {
    sumKeys[key.row][key.col] = calculatePointPosition(key);
    return sumKeys;
  }, Array(rows).fill(0).map(() => Array(cols).fill(0))).map((arr) => arr.sort((a, b) => a[0] - b[0]));
  const colKeys = matrixKeys.reduce((sumKeys, key) => {
    sumKeys[key.col][key.row] = calculatePointPosition(key);
    return sumKeys;
  }, Array(cols).fill(0).map(() => Array(rows).fill(0))).map((arr) => arr.sort((a, b) => a[1] - b[1]));
  return {rowKeys, colKeys};
};
const sortByX = (a, b) => {
  const aPoint = calculatePointPosition(a);
  const bPoint = calculatePointPosition(b);
  return aPoint[0] - bPoint[0];
};
const sortByYX = (a, b) => {
  const aPoint = calculatePointPosition(a);
  const bPoint = calculatePointPosition(b);
  return aPoint[1] - bPoint[1] === 0 ? aPoint[0] - bPoint[0] : aPoint[1] - bPoint[1];
};
const withinChain = (a, b) => {
  const aPoint = calculatePointPosition(a);
  const bPoint = calculatePointPosition(b);
  const yDiff = Math.abs(aPoint[1] - bPoint[1]);
  return yDiff < CSSVarObject.keyYPos * 0.9;
};
const getTraversalOrder = (arr) => {
  const [car, ...cdr] = [...arr].sort(sortByYX);
  if (car === void 0) {
    return cdr;
  } else {
    const [chain, rest] = partition([...arr], (a) => withinChain(car, a));
    return [...chain.sort(sortByX), ...getTraversalOrder(rest)];
  }
};
export const getNextKey = (currIndex, keys) => {
  const currKey = keys[currIndex];
  const sortedKeys = getTraversalOrder([...keys]);
  const sortedIndex = sortedKeys.indexOf(currKey);
  return sortedIndex === sortedKeys.length - 1 ? null : keys.indexOf(sortedKeys[(sortedIndex + 1) % sortedKeys.length]);
};
const BlankPositionedKeyboardComponent = (props) => {
  const {
    containerDimensions,
    selectable,
    selectedKey,
    selectedOptionKeys = [],
    showMatrix = false,
    selectedDefinition,
    matrixKeycodes = [],
    macros
  } = props;
  const {basicKeyToByte, byteToKey} = useAppSelector(getBasicKeyToByte);
  if (!selectedDefinition)
    return null;
  const pressedKeys = {};
  const {keys, optionKeys} = selectedDefinition.layouts;
  const displayedOptionKeys = optionKeys ? Object.entries(optionKeys).flatMap(([key, options]) => {
    const optionKey = parseInt(key);
    return selectedOptionKeys[optionKey] ? options[selectedOptionKeys[optionKey]] : options[0];
  }) : [];
  const displayedKeys = [...keys, ...displayedOptionKeys];
  const {width, height} = calculateKeyboardFrameDimensions(displayedKeys);
  const {rows, cols} = selectedDefinition.matrix;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(BlankKeyboardFrame, {
    key: selectedDefinition.vendorProductId,
    containerDimensions,
    width,
    height,
    selectable
  }, /* @__PURE__ */ React.createElement(AnchorContainer, null, selectedKey !== null ? /* @__PURE__ */ React.createElement(KeyBG, {
    ...displayedKeys[selectedKey]
  }) : null, displayedKeys.map((k, index) => {
    const KeyboardKeyComponent = k["ei"] !== void 0 ? EncoderKeyComponent : KeyComponent;
    return /* @__PURE__ */ React.createElement(KeyboardKeyComponent, {
      ...{
        ...k,
        ...getLabel(matrixKeycodes[index], k.w, macros, selectedDefinition, basicKeyToByte, byteToKey),
        ...getColors(k.color),
        selected: pressedKeys[index]
      },
      key: index,
      id: index
    });
  }), showMatrix && /* @__PURE__ */ React.createElement(Matrix, {
    ...generateRowColArray(displayedKeys, rows, cols)
  }))));
};
