import React from "../../../../../../_snowpack/pkg/react.js";
import {AccentSlider} from "../../../../inputs/accent-slider.js";
import {AccentSelect} from "../../../../inputs/accent-select.js";
import {AccentRange} from "../../../../inputs/accent-range.js";
import {ControlRow, Label, Detail} from "../../../grid.js";
import {ArrayColorPicker} from "../../../../inputs/color-picker.js";
import {useDispatch} from "../../../../../../_snowpack/pkg/react-redux.js";
import {
  getSelectedLightingData,
  updateBacklightValue
} from "../../../../../store/lightingSlice.js";
import {useAppSelector} from "../../../../../store/hooks.js";
import {getSelectedDefinition} from "../../../../../store/definitionsSlice.js";
export const LightingControl = (props) => {
  const dispatch = useDispatch();
  const lightingData = useAppSelector(getSelectedLightingData);
  const definition = useAppSelector(getSelectedDefinition);
  const [command, label, meta] = props.meta;
  const valArr = lightingData && lightingData[command];
  if (!valArr || !definition) {
    return null;
  }
  const labelContent = typeof label === "string" ? label : label(props);
  switch (meta.type) {
    case "slider":
      return /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, labelContent), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
        isChecked: !!valArr[0],
        onChange: (val) => dispatch(updateBacklightValue(command, +val))
      })));
    case "range":
      return /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, labelContent), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentRange, {
        max: meta.max,
        min: meta.min,
        defaultValue: valArr[0],
        onChange: (val) => dispatch(updateBacklightValue(command, val))
      })));
    case "color":
      return /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, labelContent), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(ArrayColorPicker, {
        color: valArr,
        setColor: (hue, sat) => dispatch(updateBacklightValue(command, hue, sat))
      })));
    case "select": {
      const options = meta.getOptions(definition).map((label2, value) => ({
        value,
        label: label2
      }));
      return /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, labelContent), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSelect, {
        onChange: (option) => {
          if (option) {
            dispatch(updateBacklightValue(command, +option.value));
          }
        },
        options,
        defaultValue: options.find((p) => valArr[0] === p.value)
      })));
    }
    case "row_col":
      return /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, labelContent), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
        isChecked: valArr[0] !== 255,
        onChange: (val) => {
          const args = val ? [254, 254] : [255, 255];
          dispatch(updateBacklightValue(command, ...args));
        }
      })));
  }
  return null;
};
