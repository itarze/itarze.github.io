import React, {useState, useRef, useMemo} from "../../../_snowpack/pkg/react.js";
import {Pane} from "./pane.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import {ErrorMessage} from "../styled.js";
import {getCommonMenus} from "../../utils/device-store.js";
import {AccentSelect} from "../inputs/accent-select.js";
import {AccentSlider} from "../inputs/accent-slider.js";
import {AccentUploadButton} from "../inputs/accent-upload-button.js";
import Layouts from "../Layouts.js";
import {FontAwesomeIcon} from "../../../_snowpack/pkg/@fortawesome/react-fontawesome.js";
import {faUpload} from "../../../_snowpack/pkg/@fortawesome/free-solid-svg-icons.js";
import {
  keyboardDefinitionV2ToVIADefinitionV2,
  isVIADefinitionV2,
  isKeyboardDefinitionV2,
  keyboardDefinitionV3ToVIADefinitionV3,
  isVIADefinitionV3,
  isKeyboardDefinitionV3
} from "../../../_snowpack/pkg/@the-via/reader.js";
import {BlankPositionedKeyboard} from "../positioned-keyboard.js";
import {
  ControlRow,
  Label,
  SubLabel,
  Detail,
  IndentedControlRow,
  OverflowCell,
  FlexCell
} from "./grid.js";
import {useDispatch} from "../../../_snowpack/pkg/react-redux.js";
import {selectDevice, ensureSupportedId} from "../../store/devicesSlice.js";
import {reloadConnectedDevices} from "../../store/devicesThunks.js";
import {useAppSelector} from "../../store/hooks.js";
import {getCustomDefinitions, loadDefinition} from "../../store/definitionsSlice.js";
import {getSelectedVersion, selectVersion} from "../../store/designSlice.js";
import {useSize} from "../../utils/use-size.js";
const DesignErrorMessage = styled(ErrorMessage)`
  margin: 0;
  font-style: italic;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;
const DesignPane = styled(Pane)`
  display: grid;
  max-width: 100vw;
  grid-template-columns: 100vw;
  grid-template-rows: min-content;
`;
const UploadIcon = styled.div`
  height: 200px;
  width: 50%;
  max-width: 560px;
  border-radius: 6px;
  animation-duration: 1.5s;
  animation-name: border-glow;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: transparent;
    stroke-width: 8px;
    animation-duration: 1.5s;
    animation-name: text-glow;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
    font-size: 100px;
  }
`;
function importDefinition(file, version, dispatch, setErrors) {
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      if (!reader.result)
        return;
      const res = JSON.parse(reader.result.toString());
      const isValid = version === "v2" ? isKeyboardDefinitionV2(res) || isVIADefinitionV2(res) : isKeyboardDefinitionV3(res) || isVIADefinitionV3(res);
      if (isValid) {
        setErrors([]);
        const definition = version === "v2" ? isVIADefinitionV2(res) ? res : keyboardDefinitionV2ToVIADefinitionV2(res) : isVIADefinitionV3(res) ? res : keyboardDefinitionV3ToVIADefinitionV3(res);
        if (isVIADefinitionV3(res) || isKeyboardDefinitionV3(res)) {
          const commonMenuKeys = Object.keys(getCommonMenus());
          const lookupFailedKeys = (res.menus || []).filter((menu) => {
            if (typeof menu === "string") {
              return !commonMenuKeys.includes(menu);
            }
            return false;
          });
          if (lookupFailedKeys.length) {
            throw Error(`Menu key lookup failed for: ${lookupFailedKeys.join(", ")}`);
          }
        }
        dispatch(loadDefinition({definition, version}));
        dispatch(ensureSupportedId({
          productId: definition.vendorProductId,
          version
        }));
        dispatch(selectDevice(null));
        dispatch(reloadConnectedDevices());
      } else {
        setErrors((version === "v2" ? isKeyboardDefinitionV2.errors || isVIADefinitionV2.errors || [] : isKeyboardDefinitionV3.errors || isVIADefinitionV3.errors || []).map((e) => `${e.dataPath ? e.dataPath + ": " : "Object: "}${e.message}`));
      }
    } catch (err) {
      if (err.name) {
        setErrors([`${err.name}: ${err.message}`]);
      } else {
        setErrors([`${err}`]);
      }
    }
  };
  reader.readAsBinaryString(file);
}
function onDrop(evt, version, dispatch, setErrors) {
  evt.preventDefault();
  const {dataTransfer} = evt;
  if (dataTransfer == null ? void 0 : dataTransfer.items) {
    for (var i = 0; i < dataTransfer.items.length; i++) {
      if (dataTransfer.items[i].kind === "file" && dataTransfer.items[i].type === "application/json") {
        var file = dataTransfer.items[i].getAsFile();
        if (file) {
          importDefinition(file, version, dispatch, setErrors);
        }
      }
    }
  }
}
export const DesignTab = () => {
  const dispatch = useDispatch();
  const localDefinitions = Object.values(useAppSelector(getCustomDefinitions));
  const definitionVersion = useAppSelector(getSelectedVersion);
  const [selectedDefinitionIndex, setSelectedDefinition] = useState(0);
  const [selectedOptionKeys, setSelectedOptionKeys] = useState([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [errors, setErrors] = useState([]);
  const versionDefinitions = useMemo(() => localDefinitions.filter((definitionMap) => definitionMap[definitionVersion]), [localDefinitions, definitionVersion]);
  const options = versionDefinitions.map((definitionMap, index) => ({
    label: definitionMap[definitionVersion].name,
    value: index.toString()
  }));
  const flexRef = useRef(null);
  const dimensions = useSize(flexRef);
  const definition = versionDefinitions[selectedDefinitionIndex] && versionDefinitions[selectedDefinitionIndex][definitionVersion];
  return /* @__PURE__ */ React.createElement(DesignPane, {
    onDragOver: (evt) => {
      evt.dataTransfer.effectAllowed = "copyMove";
      evt.dataTransfer.dropEffect = "none";
      evt.preventDefault();
      evt.stopPropagation();
    }
  }, /* @__PURE__ */ React.createElement(FlexCell, {
    ref: flexRef
  }, definition ? /* @__PURE__ */ React.createElement(BlankPositionedKeyboard, {
    containerDimensions: dimensions,
    selectedDefinition: definition,
    selectedOptionKeys,
    showMatrix
  }) : /* @__PURE__ */ React.createElement(UploadIcon, {
    onDrop: (evt) => onDrop(evt, definitionVersion, dispatch, setErrors),
    onDragOver: (evt) => {
      evt.dataTransfer.effectAllowed = "copyMove";
      evt.dataTransfer.dropEffect = "copy";
      evt.preventDefault();
      evt.stopPropagation();
    }
  }, /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
    icon: faUpload
  }))), /* @__PURE__ */ React.createElement(OverflowCell, null, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Load Draft Definition"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentUploadButton, {
    onLoad: (file) => importDefinition(file, definitionVersion, dispatch, setErrors)
  }, "Load"))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Use V2 definitions (deprecated)"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
    isChecked: definitionVersion === "v2",
    onChange: (val) => dispatch(selectVersion(val ? "v2" : "v3"))
  }))), definition && /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Shown Keyboard Definition"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSelect, {
    onChange: (option) => {
      setSelectedOptionKeys(() => []);
      if (option) {
        setSelectedDefinition(+option.value);
      }
    },
    value: options[selectedDefinitionIndex],
    options
  }))), definition && /* @__PURE__ */ React.createElement(Layouts, {
    definition,
    onLayoutChange: (newSelectedOptionKeys) => {
      setSelectedOptionKeys(newSelectedOptionKeys);
    }
  }), definition && /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Show Matrix"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentSlider, {
    isChecked: showMatrix,
    onChange: setShowMatrix
  }))), errors.map((error) => /* @__PURE__ */ React.createElement(IndentedControlRow, null, /* @__PURE__ */ React.createElement(DesignErrorMessage, null, error))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Draft Definitions"), /* @__PURE__ */ React.createElement(Detail, null, Object.values(versionDefinitions).length, " Definitions")), versionDefinitions.map((definition2) => {
    return /* @__PURE__ */ React.createElement(IndentedControlRow, null, /* @__PURE__ */ React.createElement(SubLabel, null, definition2[definitionVersion].name), /* @__PURE__ */ React.createElement(Detail, null, "0x", definition2[definitionVersion].vendorProductId.toString(16).toUpperCase()));
  }))));
};
