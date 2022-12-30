import React from "../../../../../../_snowpack/pkg/react.js";
import styled from "../../../../../../_snowpack/pkg/styled-components.js";
import {
  getLightingDefinition,
  isVIADefinitionV2,
  LightingValue
} from "../../../../../../_snowpack/pkg/@the-via/reader.js";
import {LightingControl} from "./lighting-control.js";
import {useAppSelector} from "../../../../../store/hooks.js";
import {getSelectedLightingData} from "../../../../../store/lightingSlice.js";
import {getSelectedDefinition} from "../../../../../store/definitionsSlice.js";
export const AdvancedLightingValues = [
  LightingValue.BACKLIGHT_DISABLE_WHEN_USB_SUSPENDED,
  LightingValue.BACKLIGHT_DISABLE_AFTER_TIMEOUT,
  LightingValue.BACKLIGHT_CAPS_LOCK_INDICATOR_COLOR,
  LightingValue.BACKLIGHT_CAPS_LOCK_INDICATOR_ROW_COL,
  LightingValue.BACKLIGHT_LAYER_1_INDICATOR_COLOR,
  LightingValue.BACKLIGHT_LAYER_1_INDICATOR_ROW_COL,
  LightingValue.BACKLIGHT_LAYER_2_INDICATOR_COLOR,
  LightingValue.BACKLIGHT_LAYER_2_INDICATOR_ROW_COL,
  LightingValue.BACKLIGHT_LAYER_3_INDICATOR_COLOR,
  LightingValue.BACKLIGHT_LAYER_3_INDICATOR_ROW_COL
];
const AccentText = styled.span`
  color: var(--color_accent);
`;
const RGBControls = [
  [
    LightingValue.BACKLIGHT_DISABLE_WHEN_USB_SUSPENDED,
    "Disable LEDs when USB is suspended",
    {type: "slider"}
  ],
  [
    LightingValue.BACKLIGHT_DISABLE_AFTER_TIMEOUT,
    () => {
      const lightingData = useAppSelector(getSelectedLightingData);
      const valArr = lightingData && lightingData[LightingValue.BACKLIGHT_DISABLE_AFTER_TIMEOUT];
      if (!valArr) {
        return null;
      }
      return /* @__PURE__ */ React.createElement("span", null, "LED Sleep Timeout:", " ", /* @__PURE__ */ React.createElement(AccentText, null, !valArr[0] ? "Never" : `After ${valArr[0]} mins`));
    },
    {type: "range", min: 0, max: 255}
  ],
  [
    LightingValue.BACKLIGHT_CAPS_LOCK_INDICATOR_COLOR,
    "Caps Lock indicator color",
    {type: "color"}
  ],
  [
    LightingValue.BACKLIGHT_CAPS_LOCK_INDICATOR_ROW_COL,
    "Caps Lock indicator",
    {type: "row_col"}
  ],
  [
    LightingValue.BACKLIGHT_LAYER_1_INDICATOR_COLOR,
    "Layer 1 indicator color",
    {type: "color"}
  ],
  [
    LightingValue.BACKLIGHT_LAYER_1_INDICATOR_ROW_COL,
    "Layer 1 indicator",
    {type: "row_col"}
  ],
  [
    LightingValue.BACKLIGHT_LAYER_2_INDICATOR_COLOR,
    "Layer 2 indicator color",
    {type: "color"}
  ],
  [
    LightingValue.BACKLIGHT_LAYER_2_INDICATOR_ROW_COL,
    "Layer 2 indicator",
    {type: "row_col"}
  ],
  [
    LightingValue.BACKLIGHT_LAYER_3_INDICATOR_COLOR,
    "Layer 3 indicator color",
    {type: "color"}
  ],
  [
    LightingValue.BACKLIGHT_LAYER_3_INDICATOR_ROW_COL,
    "Layer 3 indicator",
    {type: "row_col"}
  ]
];
export const AdvancedPane = () => {
  const lightingData = useAppSelector(getSelectedLightingData);
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  if (isVIADefinitionV2(selectedDefinition) && lightingData) {
    const {supportedLightingValues} = getLightingDefinition(selectedDefinition.lighting);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, RGBControls.filter((control) => supportedLightingValues.indexOf(control[0]) !== -1).map((meta) => /* @__PURE__ */ React.createElement(LightingControl, {
      meta
    })));
  }
  return null;
};
