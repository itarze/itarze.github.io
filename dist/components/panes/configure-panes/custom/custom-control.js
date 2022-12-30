import React from "../../../../../_snowpack/pkg/react.js";
import {PelpiKeycodeInput} from "../../../inputs/pelpi/keycode-input.js";
import {AccentSlider} from "../../../inputs/accent-slider.js";
import {AccentSelect} from "../../../inputs/accent-select.js";
import {AccentRange} from "../../../inputs/accent-range.js";
import {ControlRow, Label, Detail} from "../../grid.js";
import {ArrayColorPicker} from "../../../inputs/color-picker.js";
export const VIACustomItem = React.memo((props) => /* @__PURE__ */ React.createElement(ControlRow, {
  id: props._id
}, /* @__PURE__ */ React.createElement(Label, null, props.label), /* @__PURE__ */ React.createElement(Detail, null, "type" in props ? /* @__PURE__ */ React.createElement(VIACustomControl, {
  ...props,
  value: Array.from(props.value)
}) : props.content)));
const boxOrArr = (elem) => Array.isArray(elem) ? elem : [elem];
const valueIsChecked = (option, value) => boxOrArr(option).every((o, i) => o == value[i]);
export const VIACustomControl = (props) => {
  const {content, type, options, value} = props;
  const [name, ...command] = content;
  switch (type) {
    case "range": {
      return /* @__PURE__ */ React.createElement(AccentRange, {
        min: options[0],
        max: options[1],
        defaultValue: props.value[0],
        onChange: (val) => props.updateValue(name, ...command, val)
      });
    }
    case "keycode": {
      return /* @__PURE__ */ React.createElement(PelpiKeycodeInput, {
        value: props.value[0],
        meta: {},
        setValue: (val) => props.updateValue(name, ...command, val)
      });
    }
    case "toggle": {
      const toggleOptions = options || [0, 1];
      return /* @__PURE__ */ React.createElement(AccentSlider, {
        isChecked: valueIsChecked(toggleOptions[1], props.value),
        onChange: (val) => props.updateValue(name, ...command, ...boxOrArr(toggleOptions[+val]))
      });
    }
    case "dropdown": {
      const selectOptions = options.map((option, idx) => {
        const [label, value2] = typeof option === "string" ? [option, idx] : option;
        return {
          value: value2 || idx,
          label
        };
      });
      return /* @__PURE__ */ React.createElement(AccentSelect, {
        onChange: (option) => option && props.updateValue(name, ...command, +option.value),
        options: selectOptions,
        defaultValue: selectOptions.find((p) => value[0] === p.value)
      });
    }
    case "color": {
      return /* @__PURE__ */ React.createElement(ArrayColorPicker, {
        color: props.value,
        setColor: (hue, sat) => props.updateValue(name, ...command, hue, sat)
      });
    }
  }
  return null;
};
