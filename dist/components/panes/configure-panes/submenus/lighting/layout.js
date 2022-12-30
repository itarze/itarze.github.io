import React from "../../../../../../_snowpack/pkg/react.js";
import {ControlRow, Label, Detail} from "../../../grid.js";
import {AccentSlider} from "../../../../inputs/accent-slider.js";
import {
  getLightingDefinition,
  isVIADefinitionV2,
  LightingValue
} from "../../../../../../_snowpack/pkg/@the-via/reader.js";
import {useDispatch} from "../../../../../../_snowpack/pkg/react-redux.js";
import {
  getSelectedLightingData,
  updateBacklightValue
} from "../../../../../store/lightingSlice.js";
import {useAppSelector} from "../../../../../store/hooks.js";
import {getSelectedDefinition} from "../../../../../store/definitionsSlice.js";
export const LayoutConfigValues = [
  LightingValue.BACKLIGHT_USE_7U_SPACEBAR,
  LightingValue.BACKLIGHT_USE_ISO_ENTER,
  LightingValue.BACKLIGHT_USE_SPLIT_BACKSPACE,
  LightingValue.BACKLIGHT_USE_SPLIT_LEFT_SHIFT,
  LightingValue.BACKLIGHT_USE_SPLIT_RIGHT_SHIFT,
  LightingValue.BACKLIGHT_DISABLE_HHKB_BLOCKER_LEDS
];
const BooleanControls = [
  [LightingValue.BACKLIGHT_USE_7U_SPACEBAR, "Use 7U Spacebar LEDs"],
  [LightingValue.BACKLIGHT_USE_ISO_ENTER, "Use ISO Enter LEDs"],
  [LightingValue.BACKLIGHT_USE_SPLIT_BACKSPACE, "Use Split Backspace LEDs"],
  [LightingValue.BACKLIGHT_USE_SPLIT_LEFT_SHIFT, "Use Split Left Shift LEDs"],
  [LightingValue.BACKLIGHT_USE_SPLIT_RIGHT_SHIFT, "Use Split Right Shift LEDs"],
  [
    LightingValue.BACKLIGHT_DISABLE_HHKB_BLOCKER_LEDS,
    "Disable HHKB Blocker LEDs"
  ]
];
export const Pane = () => {
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
  if (lightingDefinition.supportedLightingValues.length !== 0) {
    const controls = BooleanControls.filter((control) => lightingDefinition.supportedLightingValues.indexOf(control[0]) !== -1);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, controls.map(([command, label]) => {
      const valArr = lightingData && lightingData[command];
      const isChecked = valArr && valArr[0];
      return /* @__PURE__ */ React.createElement(ControlRow, {
        key: command
      }, /* @__PURE__ */ React.createElement(Label, null, label), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
        isChecked: !!isChecked,
        onChange: (val) => dispatch(updateBacklightValue(command, +val))
      })));
    }));
  }
  return null;
};
