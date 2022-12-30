import React from "../../../../../../_snowpack/pkg/react.js";
import {ColorPicker} from "../../../../inputs/color-picker.js";
import {ControlRow, Label, Detail} from "../../../grid.js";
import {
  getLightingDefinition,
  isVIADefinitionV2,
  LightingValue
} from "../../../../../../_snowpack/pkg/@the-via/reader.js";
import {LightingControl} from "./lighting-control.js";
import {useDispatch} from "../../../../../../_snowpack/pkg/react-redux.js";
import {useAppSelector} from "../../../../../store/hooks.js";
import {
  getSelectedLightingData,
  updateBacklightValue,
  updateCustomColor
} from "../../../../../store/lightingSlice.js";
import {getSelectedDefinition} from "../../../../../store/definitionsSlice.js";
const BacklightControls = [
  [
    LightingValue.BACKLIGHT_BRIGHTNESS,
    "Brightness",
    {type: "range", min: 0, max: 255}
  ],
  [
    LightingValue.BACKLIGHT_EFFECT,
    "Effect",
    {
      type: "select",
      getOptions: (definition) => isVIADefinitionV2(definition) && getLightingDefinition(definition.lighting).effects.map(([label]) => label)
    }
  ],
  [
    LightingValue.BACKLIGHT_EFFECT_SPEED,
    "Effect Speed",
    {type: "range", min: 0, max: 3}
  ]
];
const UnderglowControls = [
  [
    LightingValue.QMK_RGBLIGHT_BRIGHTNESS,
    "Underglow Brightness",
    {type: "range", min: 0, max: 255}
  ],
  [
    LightingValue.QMK_RGBLIGHT_EFFECT,
    "Underglow Effect",
    {
      type: "select",
      getOptions: (definition) => isVIADefinitionV2(definition) && getLightingDefinition(definition.lighting).underglowEffects.map(([label]) => label)
    }
  ],
  [
    LightingValue.QMK_RGBLIGHT_EFFECT_SPEED,
    "Underglow Effect Speed",
    {type: "range", min: 0, max: 3}
  ]
];
export const GeneralPane = () => {
  const dispatch = useDispatch();
  const lightingData = useAppSelector(getSelectedLightingData);
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  if (!lightingData) {
    return null;
  }
  if (!isVIADefinitionV2(selectedDefinition)) {
    throw new Error("This lighting component is only compatible with v2 definitions");
  }
  const lightingDefinition = getLightingDefinition(selectedDefinition.lighting);
  const {supportedLightingValues} = lightingDefinition;
  if (lightingDefinition.supportedLightingValues.length !== 0) {
    const colorsNeededArr = lightingDefinition.effects.map(([_, num]) => num);
    const underglowColorsNeededArr = lightingDefinition.underglowEffects.map(([_, num]) => num);
    const currentEffect = lightingData[LightingValue.BACKLIGHT_EFFECT];
    const currentUnderglowEffect = lightingData[LightingValue.QMK_RGBLIGHT_EFFECT];
    const colorsNeeded = currentEffect && colorsNeededArr[currentEffect[0]] || 0;
    const underglowColorNeeded = currentUnderglowEffect && underglowColorsNeededArr[currentUnderglowEffect[0]] === 1;
    const useCustomColors = !!lightingData.customColors;
    const showCustomColors = useCustomColors && colorsNeeded > 2;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, BacklightControls.filter((control) => supportedLightingValues.indexOf(control[0]) !== -1).map((meta) => /* @__PURE__ */ React.createElement(LightingControl, {
      meta
    })), UnderglowControls.filter((control) => supportedLightingValues.indexOf(control[0]) !== -1).map((meta) => /* @__PURE__ */ React.createElement(LightingControl, {
      meta
    })), new Array(colorsNeeded).fill(1).map((val, idx) => val + idx).map((val) => {
      let color, setColor;
      const command = val === 1 ? LightingValue.BACKLIGHT_COLOR_1 : LightingValue.BACKLIGHT_COLOR_2;
      const valArr = lightingData[command];
      if (showCustomColors && lightingData.customColors) {
        [color, setColor] = [
          lightingData.customColors[val - 1],
          (hue, sat) => dispatch(updateCustomColor(val - 1, hue, sat))
        ];
      } else if (valArr) {
        [color, setColor] = [
          {
            hue: valArr[0],
            sat: valArr[1]
          },
          (hue, sat) => dispatch(updateBacklightValue(command, hue, sat))
        ];
      } else {
        return null;
      }
      return /* @__PURE__ */ React.createElement(ControlRow, {
        key: val
      }, /* @__PURE__ */ React.createElement(Label, null, "Color ", val), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(ColorPicker, {
        color,
        setColor
      })));
    }), underglowColorNeeded && /* @__PURE__ */ React.createElement(LightingControl, {
      meta: [
        LightingValue.QMK_RGBLIGHT_COLOR,
        "Underglow Color",
        {type: "color"}
      ]
    }));
  }
  return null;
};
