import React from "../../../../_snowpack/pkg/react.js";
import {AccentSlider} from "../accent-slider.js";
export const PelpiToggleInput = (props) => {
  const [, setInternalValue] = React.useState(0);
  React.useEffect(() => {
    setInternalValue(props.value);
  }, [props.value]);
  const onSetValue = (arg) => {
    setInternalValue(+arg);
    props.setValue(+arg);
  };
  return /* @__PURE__ */ React.createElement(AccentSlider, {
    isChecked: !!props.value,
    onChange: onSetValue
  });
};
