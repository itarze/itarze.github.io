import React, {useState} from "../../../../_snowpack/pkg/react.js";
import styled from "../../../../_snowpack/pkg/styled-components.js";
import {OverflowCell, SubmenuCell, SubmenuRow} from "../grid.js";
import {CenterPane} from "../pane.js";
import {title, component} from "../../icons/lightbulb.js";
import {GeneralPane} from "./submenus/lighting/general.js";
import {
  LayoutConfigValues,
  Pane as LayoutPane
} from "./submenus/lighting/layout.js";
import {
  AdvancedLightingValues,
  AdvancedPane
} from "./submenus/lighting/advanced.js";
import {getLightingDefinition, isVIADefinitionV2} from "../../../../_snowpack/pkg/@the-via/reader.js";
import {useAppSelector} from "../../../store/hooks.js";
import {getSelectedDefinition} from "../../../store/definitionsSlice.js";
export const Category = {
  General: {label: "General", Menu: GeneralPane},
  Layout: {label: "Layout", Menu: LayoutPane},
  Advanced: {label: "Advanced", Menu: AdvancedPane}
};
const LightingPane = styled(CenterPane)`
  height: 100%;
  background: var(--color_dark_grey);
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;
const MenuContainer = styled.div`
  padding: 15px 20px 20px 10px;
`;
export const Pane = () => {
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const [selectedCategory, setSelectedCategory] = useState(Category.General);
  const getMenus = () => {
    if (!isVIADefinitionV2(selectedDefinition)) {
      throw new Error("This lighting component is only compatible with v2 definitions");
    }
    const hasLayouts = LayoutConfigValues.some((value) => getLightingDefinition(selectedDefinition.lighting).supportedLightingValues.indexOf(value) !== -1);
    const hasAdvanced = AdvancedLightingValues.some((value) => getLightingDefinition(selectedDefinition.lighting).supportedLightingValues.indexOf(value) !== -1);
    return [
      Category.General,
      ...hasLayouts ? [Category.Layout] : [],
      ...hasAdvanced ? [Category.Advanced] : []
    ].filter(({Menu}) => !!Menu);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SubmenuCell, null, /* @__PURE__ */ React.createElement(MenuContainer, null, getMenus().map((menu) => /* @__PURE__ */ React.createElement(SubmenuRow, {
    selected: selectedCategory === menu,
    onClick: () => setSelectedCategory(menu),
    key: menu.label
  }, menu.label)))), /* @__PURE__ */ React.createElement(OverflowCell, null, /* @__PURE__ */ React.createElement(LightingPane, null, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(selectedCategory.Menu, null)))));
};
export const Icon = component;
export const Title = title;
