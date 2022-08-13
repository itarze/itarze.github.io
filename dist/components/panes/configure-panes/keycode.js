import React, {useState, useEffect} from "../../../../_snowpack/pkg/react.js";
import styled from "../../../../_snowpack/pkg/styled-components.js";
import styles from "../../menus/keycode-menu.module.css.proxy.js";
import {Button} from "../../inputs/button.js";
import {KeycodeModal} from "../../inputs/custom-keycode-modal.js";
import {title, component} from "../../icons/keyboard.js";
import * as EncoderPane from "./encoder.js";
import {
  keycodeInMaster,
  getByteForCode,
  getKeycodes,
  getOtherMenu,
  categoriesForKeycodeModule
} from "../../../utils/key.js";
import {ErrorMessage} from "../../styled.js";
import {
  KeycodeType,
  getLightingDefinition,
  isVIADefinitionV3,
  isVIADefinitionV2
} from "../../../../_snowpack/pkg/via-reader.js";
import {OverflowCell, SubmenuOverflowCell, Row} from "../grid.js";
import {getNextKey} from "../../positioned-keyboard.js";
import {useDispatch} from "../../../../_snowpack/pkg/react-redux.js";
import {useAppSelector} from "../../../store/hooks.js";
import {
  getSelectedDefinition,
  getSelectedKeyDefinitions
} from "../../../store/definitionsSlice.js";
import {getSelectedConnectedDevice} from "../../../store/devicesSlice.js";
import {
  getNumberOfLayers,
  getSelectedKey,
  getSelectedKeymap,
  updateKey as updateKeyAction,
  updateSelectedKey
} from "../../../store/keymapSlice.js";
import {
  disableGlobalHotKeys,
  enableGlobalHotKeys,
  getDisableFastRemap
} from "../../../store/settingsSlice.js";
const KeycodeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 54px);
  grid-auto-rows: 54px;
  justify-content: center;
  grid-gap: 10px;
`;
const MenuContainer = styled.div`
  padding: 15px 20px 20px 10px;
`;
const SubmenuRow = styled(Row)`
  padding-left: 8px;
`;
const Keycode = styled(Button)`
  border-radius: 2px;
  width: 50px;
  height: 50px;
  line-height: 18px;
  font-size: 14px;
  box-shadow: none;
  background: var(--color_dark-grey);
  color: var(--color_light_grey);
  margin: 0;
`;
const CustomKeycode = styled(Button)`
  border-radius: 2px;
  width: 50px;
  height: 50px;
  line-height: 18px;
  font-size: 14px;
  box-shadow: none;
  background: var(--color_accent);
  border-color: var(--color_light-grey);
  color: var(--color_light_grey);
  margin: 0;
`;
const KeycodeContainer = styled.div`
  padding: 12px;
  padding-bottom: 30px;
`;
const KeycodeDesc = styled.div`
  position: fixed;
  bottom: 0;
  background: #d9d9d97a;
  box-sizing: border-box;
  transition: opacity 0.4s ease-out;
  height: 25px;
  width: 100%;
  line-height: 14px;
  padding: 5px;
  font-size: 14px;
  opacity: 1;
  &:empty {
    opacity: 0;
  }
`;
const Link = styled.a`
  font-size: 16x !important;
  color: var(--color_accent);
  text-decoration: underline;
`;
const KeycodeCategories = getKeycodes().concat(getOtherMenu()).filter((menu) => !["Other", "Mod+_"].includes(menu.label));
const maybeFilter = (maybe, filter) => maybe ? () => true : filter;
export const Pane = () => {
  const selectedKey = useAppSelector(getSelectedKey);
  const dispatch = useDispatch();
  const keys = useAppSelector(getSelectedKeyDefinitions);
  useEffect(() => () => {
    dispatch(updateSelectedKey(null));
  }, []);
  if (selectedKey !== null && keys[selectedKey].ei !== void 0) {
    return /* @__PURE__ */ React.createElement(EncoderPane.Pane, null);
  }
  return /* @__PURE__ */ React.createElement(KeycodePane, null);
};
export const KeycodePane = () => {
  var _a;
  const dispatch = useDispatch();
  const macros = useAppSelector((state) => state.macros);
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  const matrixKeycodes = useAppSelector(getSelectedKeymap);
  const selectedKey = useAppSelector(getSelectedKey);
  const disableFastRemap = useAppSelector(getDisableFastRemap);
  const selectedKeyDefinitions = useAppSelector(getSelectedKeyDefinitions);
  const layerCount = useAppSelector(getNumberOfLayers);
  if (!selectedDefinition || !selectedDevice || !matrixKeycodes) {
    return null;
  }
  const [selectedCategory, setSelectedCategory] = useState(KeycodeCategories[0].label);
  const [mouseOverDesc, setMouseOverDesc] = useState(null);
  const [showKeyTextInputModal, setShowKeyTextInputModal] = useState(false);
  const getEnabledMenus = (layerCount2) => {
    if (isVIADefinitionV3(selectedDefinition)) {
      return getEnabledMenusV3(selectedDefinition, layerCount2);
    }
    const {lighting, customKeycodes} = selectedDefinition;
    const {keycodes} = getLightingDefinition(lighting);
    return KeycodeCategories.filter(maybeFilter(keycodes === KeycodeType.QMK, ({label}) => label !== "QMK Lighting")).filter(maybeFilter(keycodes === KeycodeType.WT, ({label}) => label !== "Lighting")).filter(maybeFilter(typeof customKeycodes !== "undefined", ({label}) => label !== "Custom"));
  };
  const getEnabledMenusV3 = (definition, layerCount2) => {
    const defaultKeycodes = layerCount2 ? KeycodeCategories.map((category) => category.label) : [];
    const keycodes = ["default", ...definition.keycodes || []];
    const allowedKeycodes = keycodes.flatMap((keycodeName) => categoriesForKeycodeModule(keycodeName));
    if ((selectedDefinition.customKeycodes || []).length !== 0) {
      allowedKeycodes.push("Custom");
    }
    return KeycodeCategories.filter((category) => allowedKeycodes.includes(category.label));
  };
  const renderMacroError = () => {
    return /* @__PURE__ */ React.createElement(ErrorMessage, null, "It looks like your current firmware doesn't support macros.", " ", /* @__PURE__ */ React.createElement(Link, {
      href: "https://beta.docs.qmk.fm/newbs",
      target: "_blank"
    }, "How do I update my firmware?"));
  };
  const renderCategories = (layerCount2) => {
    return /* @__PURE__ */ React.createElement(MenuContainer, null, getEnabledMenus(layerCount2).map(({label}) => /* @__PURE__ */ React.createElement(SubmenuRow, {
      selected: label === selectedCategory,
      onClick: (_) => setSelectedCategory(label),
      key: label
    }, label)));
  };
  const renderKeyInputModal = () => {
    dispatch(disableGlobalHotKeys());
    return /* @__PURE__ */ React.createElement(KeycodeModal, {
      defaultValue: selectedKey ? matrixKeycodes[selectedKey] : void 0,
      onExit: () => {
        dispatch(enableGlobalHotKeys());
        setShowKeyTextInputModal(false);
      },
      onConfirm: (keycode) => {
        dispatch(enableGlobalHotKeys());
        updateKey(keycode);
        setShowKeyTextInputModal(false);
      }
    });
  };
  const updateKey = (value) => {
    if (selectedKey !== null) {
      dispatch(updateKeyAction(selectedKey, value));
      dispatch(updateSelectedKey(disableFastRemap || !selectedKeyDefinitions ? null : getNextKey(selectedKey, selectedKeyDefinitions)));
    }
  };
  const handleClick = (code, i) => {
    if (code == "text") {
      setShowKeyTextInputModal(true);
    } else {
      return keycodeInMaster(code) && updateKey(getByteForCode(code));
    }
  };
  const renderKeycode = (keycode, index) => {
    const {code, title: title2, name} = keycode;
    return /* @__PURE__ */ React.createElement(Keycode, {
      className: [
        !keycodeInMaster(code) && code != "text" && styles.disabled,
        styles.keycode
      ].join(" "),
      key: code,
      onClick: () => handleClick(code, index),
      onMouseOver: (_) => setMouseOverDesc(title2 ? `${code}: ${title2}` : code),
      onMouseOut: (_) => setMouseOverDesc(null)
    }, /* @__PURE__ */ React.createElement("div", {
      className: styles.innerKeycode
    }, name));
  };
  const renderCustomKeycode = () => {
    return /* @__PURE__ */ React.createElement(CustomKeycode, {
      onClick: () => selectedKey !== null && handleClick("text", 0),
      onMouseOver: (_) => setMouseOverDesc("Enter any QMK Keycode"),
      onMouseOut: (_) => setMouseOverDesc(null)
    }, "Any");
  };
  const renderSelectedCategory = (keycodes, selectedCategory2) => {
    const keycodeListItems = keycodes.map((keycode, i) => renderKeycode(keycode, i));
    switch (selectedCategory2) {
      case "Macro": {
        return !macros.isFeatureSupported ? renderMacroError() : /* @__PURE__ */ React.createElement(KeycodeList, null, keycodeListItems);
      }
      case "Special": {
        return /* @__PURE__ */ React.createElement(KeycodeList, null, keycodeListItems.concat(renderCustomKeycode()));
      }
      case "Custom": {
        if (!isVIADefinitionV2(selectedDefinition) && !isVIADefinitionV3(selectedDefinition) || !selectedDefinition.customKeycodes) {
          return null;
        }
        return /* @__PURE__ */ React.createElement(KeycodeList, null, selectedDefinition.customKeycodes.map((keycode, idx) => {
          return renderKeycode({
            ...keycode,
            code: `USER${idx.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}`
          }, idx);
        }));
      }
      default: {
        return /* @__PURE__ */ React.createElement(KeycodeList, null, keycodeListItems);
      }
    }
  };
  const selectedCategoryKeycodes = (_a = KeycodeCategories.find(({label}) => label === selectedCategory)) == null ? void 0 : _a.keycodes;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SubmenuOverflowCell, null, renderCategories(layerCount)), /* @__PURE__ */ React.createElement(OverflowCell, null, /* @__PURE__ */ React.createElement(KeycodeContainer, null, renderSelectedCategory(selectedCategoryKeycodes, selectedCategory)), /* @__PURE__ */ React.createElement(KeycodeDesc, null, mouseOverDesc), showKeyTextInputModal && renderKeyInputModal()));
};
export const Icon = component;
export const Title = title;
