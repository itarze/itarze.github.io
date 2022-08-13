import React, {useMemo} from "../../../../_snowpack/pkg/react.js";
import {useDispatch} from "../../../../_snowpack/pkg/react-redux.js";
import {useAppSelector} from "../../../store/hooks.js";
import {
  getNumberOfLayers,
  getSelectedLayerIndex,
  setLayer
} from "../../../store/keymapSlice.js";
import styled from "../../../../_snowpack/pkg/styled-components.js";
const Container = styled.div`
  position: absolute;
  left: 15px;
  top: 10px;
`;
const Label = styled.label`
  font-size: 20px;
  text-transform: uppercase;
  color: var(--color_light-grey);
  margin-right: 8px;
`;
const LayerButton = styled.button`
  outline: none;
  font-variant-numeric: tabular-nums;
  border: none;
  background: ${(props) => props.selected ? "var(--color_light-grey)" : "transparent"};
  color: ${(props) => props.selected ? "var(--color_jet)" : "var(--color_light-grey)"};
  cursor: pointer;
  font-size: 20px;
  &:hover {
    border: none;
    background: ${(props) => props.selected ? "var(--color_light-grey)" : "var(--color_dark-grey)"};
    color: ${(props) => props.selected ? "var(--color_jet)" : "var(--color_light-grey)"};
  }
`;
export const LayerControl = () => {
  const dispatch = useDispatch();
  const numberOfLayers = useAppSelector(getNumberOfLayers);
  const selectedLayerIndex = useAppSelector(getSelectedLayerIndex);
  const Layers = useMemo(() => new Array(numberOfLayers).fill(0).map((_, idx) => idx).map((layerLabel) => /* @__PURE__ */ React.createElement(LayerButton, {
    key: layerLabel,
    selected: layerLabel === selectedLayerIndex,
    onClick: () => dispatch(setLayer(layerLabel))
  }, layerLabel)), [numberOfLayers, selectedLayerIndex]);
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Label, null, "Layer"), Layers);
};
