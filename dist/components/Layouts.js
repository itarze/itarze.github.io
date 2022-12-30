import React from "../../_snowpack/pkg/react.js";
import {AccentSelect} from "./inputs/accent-select.js";
import {AccentSlider} from "./inputs/accent-slider.js";
import {Detail, IndentedControlRow, Label} from "./panes/grid.js";
function Layouts({
  definition,
  onLayoutChange,
  RowComponent = IndentedControlRow
}) {
  const [selectedOptionKeys, setSelectedOptionKeys] = React.useState([]);
  React.useEffect(() => {
    setSelectedOptionKeys(() => []);
  }, [definition]);
  React.useEffect(() => {
    onLayoutChange(selectedOptionKeys);
  }, [selectedOptionKeys]);
  if (!definition.layouts.labels) {
    return null;
  }
  const LayoutControls = definition.layouts.labels.map((label, layoutKey) => {
    const optionKeys = definition.layouts.optionKeys[layoutKey];
    if (Array.isArray(label)) {
      const name = label[0];
      const options = label.slice(1);
      const selectElementOptions = options.map((option, optionIndex) => ({
        label: option,
        value: optionKeys[optionIndex]
      }));
      return /* @__PURE__ */ React.createElement(RowComponent, {
        key: name
      }, /* @__PURE__ */ React.createElement(Label, null, name), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSelect, {
        onChange: (option) => {
          if (option && option.label) {
            const optionIndex = options.indexOf(option.label);
            setSelectedOptionKeys((selectedOptions) => {
              selectedOptions[layoutKey] = optionIndex;
              return [...selectedOptions];
            });
          }
        },
        value: selectedOptionKeys[layoutKey] ? selectElementOptions[selectedOptionKeys[layoutKey]] : selectElementOptions[0],
        options: selectElementOptions
      })));
    }
    if (typeof label === "string") {
      return /* @__PURE__ */ React.createElement(RowComponent, {
        key: label
      }, /* @__PURE__ */ React.createElement(Label, null, label), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
        isChecked: Boolean(selectedOptionKeys[layoutKey]),
        onChange: (isChecked) => {
          setSelectedOptionKeys((selectedOptions) => {
            selectedOptions[layoutKey] = Number(isChecked);
            return [...selectedOptions];
          });
        }
      })));
    }
    return null;
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, LayoutControls);
}
export default Layouts;
