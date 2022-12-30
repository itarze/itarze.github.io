import React, {useState, useRef, useEffect} from "../../../_snowpack/pkg/react.js";
import {FontAwesomeIcon} from "../../../_snowpack/pkg/@fortawesome/react-fontawesome.js";
import {faPlus} from "../../../_snowpack/pkg/@fortawesome/free-solid-svg-icons.js";
import {useSize} from "../../utils/use-size.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import ChippyLoader from "../chippy-loader.js";
import LoadingText from "../loading-text.js";
import {ConfigureBasePane} from "./pane.js";
import ReactTooltip from "../../../_snowpack/pkg/react-tooltip.js";
import {
  CustomFeaturesV2,
  getLightingDefinition,
  isVIADefinitionV2,
  isVIADefinitionV3
} from "../../../_snowpack/pkg/@the-via/reader.js";
import {PositionedKeyboard} from "../positioned-keyboard.js";
import {Grid, Row, FlexCell, IconContainer, MenuCell} from "./grid.js";
import * as Keycode from "./configure-panes/keycode.js";
import * as Lighting from "./configure-panes/lighting.js";
import * as Macros from "./configure-panes/macros.js";
import * as SaveLoad from "./configure-panes/save-load.js";
import * as Layouts from "./configure-panes/layouts.js";
import * as RotaryEncoder from "./configure-panes/custom/satisfaction75/index.js";
import {makeCustomMenus} from "./configure-panes/custom/menu-generator.js";
import {LayerControl} from "./configure-panes/layer-control.js";
import {Badge} from "./configure-panes/badge.js";
import {AccentButtonLarge} from "../inputs/accent-button.js";
import {useAppSelector} from "../../store/hooks.js";
import {getSelectedDefinition} from "../../store/definitionsSlice.js";
import {
  clearSelectedKey,
  getLoadProgress,
  getNumberOfLayers
} from "../../store/keymapSlice.js";
import {useDispatch} from "../../../_snowpack/pkg/react-redux.js";
import {reloadConnectedDevices} from "../../store/devicesThunks.js";
import {getV3MenuComponents} from "../../store/menusSlice.js";
import {getIsMacroFeatureSupported} from "../../store/macrosSlice.js";
import {getConnectedDevices, getSupportedIds} from "../../store/devicesSlice.js";
import {isElectron} from "../../utils/running-context.js";
const MenuContainer = styled.div`
  padding: 15px 30px 20px 10px;
`;
const Rows = [
  Keycode,
  Macros,
  Layouts,
  Lighting,
  SaveLoad,
  RotaryEncoder,
  ...makeCustomMenus([])
];
function getCustomPanes(customFeatures) {
  if (customFeatures.find((feature) => feature === CustomFeaturesV2.RotaryEncoder)) {
    return [RotaryEncoder];
  }
  return [];
}
const getRowsForKeyboard = () => {
  const showMacros = useAppSelector(getIsMacroFeatureSupported);
  const v3Menus = useAppSelector(getV3MenuComponents);
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const numberOfLayers = useAppSelector(getNumberOfLayers);
  if (!selectedDefinition) {
    return [];
  } else if (isVIADefinitionV2(selectedDefinition)) {
    return getRowsForKeyboardV2(selectedDefinition, showMacros, numberOfLayers);
  } else if (isVIADefinitionV3(selectedDefinition)) {
    return [
      ...filterInferredRows(selectedDefinition, showMacros, numberOfLayers, [
        Keycode,
        Layouts,
        Macros,
        SaveLoad
      ]),
      ...v3Menus
    ];
  } else {
    return [];
  }
};
const filterInferredRows = (selectedDefinition, showMacros, numberOfLayers, rows) => {
  const {layouts} = selectedDefinition;
  let removeList = [];
  if (!(layouts.optionKeys && Object.entries(layouts.optionKeys).length !== 0)) {
    removeList = [...removeList, Layouts];
  }
  if (numberOfLayers === 0) {
    removeList = [...removeList, Keycode, SaveLoad];
  }
  if (!showMacros) {
    removeList = [...removeList, Macros];
  }
  let filteredRows = rows.filter((row) => !removeList.includes(row));
  return filteredRows;
};
const getRowsForKeyboardV2 = (selectedDefinition, showMacros, numberOfLayers) => {
  let rows = [Keycode, Layouts, Macros, SaveLoad];
  if (isVIADefinitionV2(selectedDefinition)) {
    const {lighting, customFeatures} = selectedDefinition;
    const {supportedLightingValues} = getLightingDefinition(lighting);
    if (supportedLightingValues.length !== 0) {
      rows = [...rows, Lighting];
    }
    if (customFeatures) {
      rows = [...rows, ...getCustomPanes(customFeatures)];
    }
  }
  return filterInferredRows(selectedDefinition, showMacros, numberOfLayers, rows);
};
function Loader(props) {
  const {loadProgress, selectedDefinition} = props;
  const dispatch = useDispatch();
  const connectedDevices = useAppSelector(getConnectedDevices);
  const supportedIds = useAppSelector(getSupportedIds);
  const noSupportedIds = !Object.values(supportedIds).length;
  const noConnectedDevices = !Object.values(connectedDevices).length;
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!selectedDefinition) {
        setShowButton(true);
      }
    }, 3e3);
    return () => clearTimeout(timeout);
  }, [selectedDefinition]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ChippyLoader, {
    progress: loadProgress || null
  }), (showButton || noConnectedDevices) && !noSupportedIds && !isElectron ? /* @__PURE__ */ React.createElement(AccentButtonLarge, {
    onClick: () => dispatch(reloadConnectedDevices())
  }, "Authorize device", /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
    style: {marginLeft: "10px"},
    icon: faPlus
  })) : /* @__PURE__ */ React.createElement(LoadingText, {
    isSearching: !selectedDefinition
  }));
}
export const ConfigurePane = () => {
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const loadProgress = useAppSelector(getLoadProgress);
  const showLoader = !selectedDefinition || loadProgress !== 1;
  return /* @__PURE__ */ React.createElement(ConfigureBasePane, null, showLoader ? /* @__PURE__ */ React.createElement(Loader, {
    ...{
      loadProgress,
      selectedDefinition: selectedDefinition ? selectedDefinition : null
    }
  }) : /* @__PURE__ */ React.createElement(ConfigureGrid, null));
};
const ConfigureGrid = () => {
  var _a, _b;
  const dispatch = useDispatch();
  const [selectedRow, setRow] = useState(0);
  const flexRef = useRef(null);
  const dimensions = useSize(flexRef);
  const KeyboardRows = getRowsForKeyboard();
  const SelectedPane = (_a = KeyboardRows[selectedRow]) == null ? void 0 : _a.Pane;
  const selectedTitle = (_b = KeyboardRows[selectedRow]) == null ? void 0 : _b.Title;
  return /* @__PURE__ */ React.createElement(Grid, null, /* @__PURE__ */ React.createElement(MenuCell, null, /* @__PURE__ */ React.createElement(MenuContainer, null, (KeyboardRows || []).map(({Icon, Title}, idx) => /* @__PURE__ */ React.createElement(Row, {
    key: idx,
    onClick: (_) => setRow(idx),
    selected: selectedRow === idx
  }, /* @__PURE__ */ React.createElement(IconContainer, null, /* @__PURE__ */ React.createElement(Icon, null)), Title)))), /* @__PURE__ */ React.createElement(FlexCell, {
    ref: flexRef,
    onClick: () => dispatch(clearSelectedKey())
  }, /* @__PURE__ */ React.createElement(PositionedKeyboard, {
    containerDimensions: dimensions,
    selectable: selectedTitle === "Keymap"
  }), /* @__PURE__ */ React.createElement(ReactTooltip, null), /* @__PURE__ */ React.createElement(LayerControl, null), /* @__PURE__ */ React.createElement(Badge, null)), SelectedPane && /* @__PURE__ */ React.createElement(SelectedPane, null));
};
