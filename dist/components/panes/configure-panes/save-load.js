import React, {useState} from "../../../../_snowpack/pkg/react.js";
import styled from "../../../../_snowpack/pkg/styled-components.js";
import stringify from "../../../../_snowpack/pkg/json-stringify-pretty-compact.js";
import {ErrorMessage, SuccessMessage} from "../../styled.js";
import {AccentUploadButton} from "../../inputs/accent-upload-button.js";
import {AccentButton} from "../../inputs/accent-button.js";
import {getByteForCode, getCodeForByte} from "../../../utils/key.js";
import {title, component} from "../../icons/save.js";
import {CenterPane} from "../pane.js";
import {Detail, Label, OverflowCell, ControlRow} from "../grid.js";
import {
  getBasicKeyToByte,
  getSelectedDefinition
} from "../../../store/definitionsSlice.js";
import {
  getSelectedRawLayers,
  saveRawKeymapToDevice
} from "../../../store/keymapSlice.js";
import {useAppSelector} from "../../../store/hooks.js";
import {useDispatch} from "../../../../_snowpack/pkg/react-redux.js";
import {getSelectedConnectedDevice} from "../../../store/devicesSlice.js";
import {saveMacros} from "../../../store/macrosSlice.js";
const isViaSaveFile = (obj) => obj && obj.name && obj.layers && obj.vendorProductId;
const SaveLoadPane = styled(CenterPane)`
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
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  const rawLayers = useAppSelector(getSelectedRawLayers);
  const macros = useAppSelector((state) => state.macros);
  const {basicKeyToByte, byteToKey} = useAppSelector(getBasicKeyToByte);
  if (!selectedDefinition || !selectedDevice) {
    return null;
  }
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const getEncoderValues = async () => {
    const {name, vendorProductId, layouts} = selectedDefinition;
    const {keys, optionKeys} = layouts;
    const encoders = [
      ...keys,
      ...Object.values(optionKeys).flatMap((a) => Object.values(a)).flat()
    ].filter((a) => "ei" in a).map((a) => a.ei);
    if (encoders.length > 0) {
      const maxEncoder = Math.max(...encoders) + 1;
      const numberOfLayers = rawLayers.length;
      const encoderValues = await Promise.all(Array(maxEncoder).fill(0).map((_, i) => Promise.all(Array(numberOfLayers).fill(0).map((_2, j) => Promise.all([
        selectedDevice.api.getEncoderValue(j, i, false),
        selectedDevice.api.getEncoderValue(j, i, true)
      ]).then((a) => a.map((keyByte) => getCodeForByte(keyByte, basicKeyToByte, byteToKey) || ""))))));
      return encoderValues;
    } else {
      return [];
    }
  };
  const saveLayout = async () => {
    const {name, vendorProductId, layouts} = selectedDefinition;
    const encoderValues = await getEncoderValues();
    const saveFile = {
      name,
      vendorProductId,
      macros: [...macros.expressions],
      layers: rawLayers.map((layer) => layer.keymap.map((keyByte) => getCodeForByte(keyByte, basicKeyToByte, byteToKey) || "")),
      encoders: encoderValues
    };
    const content = stringify(saveFile);
    const defaultFilename = name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    const blob = new Blob([content], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = defaultFilename;
    link.click();
    URL.revokeObjectURL(url);
  };
  const loadLayout = (file) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const reader = new FileReader();
    reader.onabort = () => setErrorMessage("File reading was cancelled.");
    reader.onerror = () => setErrorMessage("Failed to read file.");
    reader.onload = async () => {
      const saveFile = JSON.parse(reader.result.toString());
      if (!isViaSaveFile(saveFile)) {
        setErrorMessage("Could not load file: invalid data.");
        return;
      }
      if (saveFile.vendorProductId !== selectedDefinition.vendorProductId) {
        setErrorMessage(`Could not import layout. This file was created for a different keyboard: ${saveFile.name}`);
        return;
      }
      if (saveFile.layers.findIndex((layer, idx) => layer.length !== rawLayers[idx].keymap.length) > -1) {
        setErrorMessage("Could not import layout: incorrect number of keys in one or more layers.");
        return;
      }
      if (macros.isFeatureSupported && saveFile.macros) {
        if (saveFile.macros.length !== macros.expressions.length) {
          setErrorMessage("Could not import layout: incorrect number of macros.");
          return;
        }
        dispatch(saveMacros(selectedDevice, saveFile.macros));
      }
      const keymap = saveFile.layers.map((layer) => layer.map((key) => getByteForCode(`${key}`, basicKeyToByte)));
      await dispatch(saveRawKeymapToDevice(keymap, selectedDevice));
      if (saveFile.encoders) {
        await Promise.all(saveFile.encoders.map((encoder, id) => Promise.all(encoder.map((layer, layerId) => Promise.all([
          selectedDevice.api.setEncoderValue(layerId, id, false, getByteForCode(`${layer[0]}`, basicKeyToByte)),
          selectedDevice.api.setEncoderValue(layerId, id, true, getByteForCode(`${layer[1]}`, basicKeyToByte))
        ])))));
      }
      setSuccessMessage("Successfully updated layout!");
    };
    reader.readAsBinaryString(file);
  };
  return /* @__PURE__ */ React.createElement(OverflowCell, null, /* @__PURE__ */ React.createElement(SaveLoadPane, null, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Save Current Layout"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: saveLayout
  }, "Save"))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Load Saved Layout"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentUploadButton, {
    onLoad: loadLayout
  }, "Load"))), errorMessage ? /* @__PURE__ */ React.createElement(ErrorMessage, null, errorMessage) : null, successMessage ? /* @__PURE__ */ React.createElement(SuccessMessage, null, successMessage) : null)));
};
export const Icon = component;
export const Title = title;
