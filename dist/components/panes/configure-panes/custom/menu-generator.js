import {FontAwesomeIcon} from "../../../../../_snowpack/pkg/@fortawesome/react-fontawesome.js";
import {
  faDisplay,
  faHeadphones,
  faLightbulb,
  faMicrochip
} from "../../../../../_snowpack/pkg/@fortawesome/free-solid-svg-icons.js";
import React, {useState} from "../../../../../_snowpack/pkg/react.js";
import styled from "../../../../../_snowpack/pkg/styled-components.js";
import {OverflowCell, SubmenuCell, SubmenuRow} from "../../grid.js";
import {CenterPane} from "../../pane.js";
import {title, component} from "../../../icons/lightbulb.js";
import {VIACustomItem} from "./custom-control.js";
import {evalExpr} from "../../../../../_snowpack/pkg/@the-via/pelpi.js";
import {useAppSelector} from "../../../../store/hooks.js";
import {getSelectedDefinition} from "../../../../store/definitionsSlice.js";
import {
  getSelectedCustomMenuData,
  updateCustomMenuValue
} from "../../../../store/menusSlice.js";
import {useDispatch} from "../../../../../_snowpack/pkg/react-redux.js";
const CustomPane = styled(CenterPane)`
  height: 100%;
  background: var(--color_dark_grey);
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;
function isItem(elem) {
  return "type" in elem;
}
function isSlice(elem) {
  return !("label" in elem);
}
export function categoryGenerator(props) {
  return props.viaMenu.content.flatMap((menu) => submenuGenerator(menu, props));
}
function itemGenerator(elem, props) {
  if ("showIf" in elem && !evalExpr(elem.showIf, props.selectedCustomMenuData)) {
    return [];
  }
  if ("label" in elem) {
    return {...elem, key: elem._id};
  } else {
    return elem.content.flatMap((e) => itemGenerator(e, props));
  }
}
const MenuComponent = React.memo((props) => /* @__PURE__ */ React.createElement(React.Fragment, null, props.elem.content.flatMap((elem) => itemGenerator(elem, props)).map((itemProps) => /* @__PURE__ */ React.createElement(VIACustomItem, {
  ...itemProps,
  updateValue: props.updateCustomMenuValue,
  value: props.selectedCustomMenuData[itemProps.content[0]]
}))));
const MenuBuilder = (elem) => (props) => /* @__PURE__ */ React.createElement(MenuComponent, {
  ...props,
  key: elem._id,
  elem
});
function submenuGenerator(elem, props) {
  if ("showIf" in elem && !evalExpr(elem.showIf, props.selectedCustomMenuData)) {
    return [];
  }
  if ("label" in elem) {
    return {
      label: elem.label,
      Menu: MenuBuilder(elem)
    };
  } else {
    return elem.content.flatMap((e) => submenuGenerator(e, props));
  }
}
export const Pane = (props) => {
  const dispatch = useDispatch();
  const menus = categoryGenerator(props);
  const [selectedCategory, setSelectedCategory] = useState(menus[0] || {label: "", Menu: () => /* @__PURE__ */ React.createElement("div", null)});
  const SelectedMenu = selectedCategory.Menu;
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const selectedCustomMenuData = useAppSelector(getSelectedCustomMenuData);
  const childProps = {
    ...props,
    selectedDefinition,
    selectedCustomMenuData,
    updateCustomMenuValue: (command, ...rest) => dispatch(updateCustomMenuValue(command, ...rest))
  };
  if (!selectedDefinition || !selectedCustomMenuData) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SubmenuCell, null, /* @__PURE__ */ React.createElement(MenuContainer, null, menus.map((menu) => /* @__PURE__ */ React.createElement(SubmenuRow, {
    selected: selectedCategory.label === menu.label,
    onClick: () => setSelectedCategory(menu),
    key: menu.label
  }, menu.label)))), /* @__PURE__ */ React.createElement(OverflowCell, null, /* @__PURE__ */ React.createElement(CustomPane, null, /* @__PURE__ */ React.createElement(Container, null, SelectedMenu(childProps)))));
};
export const Icon = component;
export const Title = title;
export const MenuContainer = styled.div`
  padding: 15px 20px 20px 10px;
`;
export function sliceLabeler(elem) {
  return elem;
}
export function elemLabeler(elem, prefix = "") {
  if (isItem(elem)) {
    return {
      ...elem,
      ...elem.showIf ? {_renderIf: (props) => evalExpr(elem.showIf, props)} : {},
      _id: prefix,
      _type: "item"
    };
  } else if (isSlice(elem)) {
    return {
      ...elem,
      ...elem.showIf ? {_renderIf: (props) => evalExpr(elem.showIf, props)} : {},
      _id: prefix,
      _type: "slice",
      content: menuLabeler(elem.content, prefix)
    };
  } else {
    return {
      ...elem,
      ...elem.showIf ? {_renderIf: (props) => evalExpr(elem.showIf, props)} : {},
      _id: prefix,
      _type: "menu",
      content: menuLabeler(elem.content, prefix)
    };
  }
}
export function menuLabeler(menus, prefix = "") {
  return menus.map((menu, idx) => elemLabeler(menu, `${prefix}-${idx}`));
}
const iconKeywords = [
  {
    icon: faLightbulb,
    keywords: ["light", "rgb"]
  },
  {
    icon: faHeadphones,
    keywords: ["audio", "sound"]
  },
  {
    icon: faDisplay,
    keywords: ["display", "oled", "lcd"]
  }
];
const getIconFromLabel = (menu) => {
  const label = menu.label.toLowerCase();
  const defaultIcon = {icon: faMicrochip};
  return (iconKeywords.find((icon) => icon.keywords.some((keyword) => label.includes(keyword))) || defaultIcon).icon;
};
export const makeCustomMenu = (menu, idx) => {
  return {
    Title: menu.label,
    Icon: () => /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      icon: getIconFromLabel(menu)
    }),
    Pane: (props) => /* @__PURE__ */ React.createElement(Pane, {
      ...props,
      key: `${menu.label}-${idx}`,
      viaMenu: menu
    })
  };
};
export const makeCustomMenus = (menus) => menus.map(makeCustomMenu);
