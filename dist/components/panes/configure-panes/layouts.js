import React from "../../../../_snowpack/pkg/react.js";
import styled from "../../../../_snowpack/pkg/styled-components.js";
import {title, component} from "../../icons/layouts.js";
import {ControlRow, OverflowCell, Label, Detail} from "../grid.js";
import {AccentSlider} from "../../inputs/accent-slider.js";
import {AccentSelect} from "../../inputs/accent-select.js";
import {CenterPane} from "../pane.js";
import {
  getSelectedDefinition,
  getSelectedLayoutOptions,
  updateLayoutOption
} from "../../../store/definitionsSlice.js";
import {useAppSelector} from "../../../store/hooks.js";
import {useDispatch} from "../../../../_snowpack/pkg/react-redux.js";
const LayoutControl = (props) => {
  const {onChange, meta} = props;
  const {labels, selectedOption} = meta;
  if (Array.isArray(labels)) {
    const [label, ...optionLabels] = labels;
    const options = optionLabels.map((label2, idx) => ({
      label: label2,
      value: `${idx}`
    }));
    return /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, label), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSelect, {
      defaultValue: options[selectedOption],
      options,
      onChange: (option) => {
        if (option) {
          onChange(+option.value);
        }
      }
    })));
  } else {
    return /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, labels), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
      isChecked: !!selectedOption,
      onChange: (val) => onChange(+val)
    })));
  }
};
const ContainerPane = styled(CenterPane)`
  height: 100%;
  background: var(--color_dark_grey);
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;
export const Pane = () => {
  const dispatch = useDispatch();
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const selectedLayoutOptions = useAppSelector(getSelectedLayoutOptions);
  if (!selectedDefinition || !selectedLayoutOptions) {
    return null;
  }
  const {layouts} = selectedDefinition;
  const labels = layouts.labels || [];
  return /* @__PURE__ */ React.createElement(OverflowCell, null, /* @__PURE__ */ React.createElement(ContainerPane, null, /* @__PURE__ */ React.createElement(Container, null, labels.map((label, idx) => /* @__PURE__ */ React.createElement(LayoutControl, {
    key: idx,
    onChange: (val) => dispatch(updateLayoutOption(idx, val)),
    meta: {
      labels: label,
      selectedOption: selectedLayoutOptions[idx]
    }
  })))));
};
export const Title = title;
export const Icon = component;
