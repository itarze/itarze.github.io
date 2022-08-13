import React, {useMemo, useState} from "../../../../_snowpack/pkg/react.js";
import styled from "../../../../_snowpack/pkg/styled-components.js";
import {FontAwesomeIcon} from "../../../../_snowpack/pkg/@fortawesome/react-fontawesome.js";
import {faAngleDown, faPlus} from "../../../../_snowpack/pkg/@fortawesome/free-solid-svg-icons.js";
import {HID} from "../../../shims/node-hid.js";
import {useAppSelector} from "../../../store/hooks.js";
import {
  getDefinitions,
  getSelectedDefinition
} from "../../../store/definitionsSlice.js";
import {useDispatch} from "../../../../_snowpack/pkg/react-redux.js";
import {
  getConnectedDevices,
  getSelectedDevicePath
} from "../../../store/devicesSlice.js";
import {selectConnectedDeviceByPath} from "../../../store/devicesThunks.js";
import {isElectron} from "../../../utils/running-context.js";
const Container = styled.div`
  position: absolute;
  right: 15px;
  top: 0px;
  font-size: 18px;
  pointer-events: none;
`;
const KeyboardTitle = styled.label`
  pointer-events: all;
  display: inline-block;
  background: var(--color_accent);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  font-size: 18px;
  text-transform: uppercase;
  color: var(--color_light-grey);
  padding: 1px 10px;
  margin-right: 10px;
  border: solid 1px var(--color_dark-grey);
  border-top: none;
  cursor: pointer;
  &:hover {
    background: var(--color_dark-accent);
  }
`;
const KeyboardList = styled.ul`
  padding: 0;
  border: 1px solid var(--color_dark-grey);
  width: 160px;
  border-radius: 6px;
  background-color: var(--color_light-jet);
  margin: 0;
  margin-top: 5px;
  right: 10px;
  position: absolute;
  pointer-events: ${(props) => props.show ? "all" : "none"};
  transition: all 0.2s ease-out;
  opacity: ${(props) => props.show ? 1 : 0};
  overflow: hidden;
  transform: ${(props) => props.show ? 0 : `translateY(-5px)`};
`;
const KeyboardButton = styled.button`
  display: block;
  text-align: center;
  outline: none;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  border: none;
  background: ${(props) => props.selected ? "var(--color_light-grey)" : "transparent"};
  color: ${(props) => props.selected ? "var(--color_jet)" : "var(--color_light-grey)"};
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  text-transform: uppercase;
  padding: 5px 10px;
  &:hover {
    border: none;
    background: ${(props) => props.selected ? "var(--color_light-grey)" : "var(--color_dark-grey)"};
    color: ${(props) => props.selected ? "var(--color_jet)" : "var(--color_light-grey)"};
  }
`;
const ClickCover = styled.div`
  position: fixed;
  pointer-events: all;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.4;
  background: var(--color_jet);
`;
const KeyboardSelectors = (props) => {
  const requestAndChangeDevice = async () => {
    const device = await HID.requestDevice();
    if (device) {
      props.selectKeyboard(device.__path);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, props.show && /* @__PURE__ */ React.createElement(ClickCover, {
    onClick: props.onClickOut
  }), /* @__PURE__ */ React.createElement(KeyboardList, {
    show: props.show
  }, props.keyboards.map(([path, keyboard]) => {
    return /* @__PURE__ */ React.createElement(KeyboardButton, {
      selected: path === props.selectedPath,
      key: path,
      onClick: () => props.selectKeyboard(path)
    }, keyboard.name);
  }), !isElectron && /* @__PURE__ */ React.createElement(KeyboardButton, {
    onClick: requestAndChangeDevice
  }, "Authorize New", /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
    icon: faPlus,
    style: {marginLeft: "10px"}
  }))));
};
export const Badge = () => {
  const dispatch = useDispatch();
  const definitions = useAppSelector(getDefinitions);
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const connectedDevices = useAppSelector(getConnectedDevices);
  const selectedPath = useAppSelector(getSelectedDevicePath);
  const [showList, setShowList] = useState(false);
  const connectedKeyboardDefinitions = useMemo(() => Object.entries(connectedDevices).map(([path, device]) => [
    path,
    definitions[device.vendorProductId] && definitions[device.vendorProductId][device.requiredDefinitionVersion]
  ]).filter((i) => i[1]), [connectedDevices, definitions]);
  if (!selectedDefinition || !selectedPath) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(KeyboardTitle, {
    onClick: () => setShowList(!showList)
  }, selectedDefinition.name, /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
    icon: faAngleDown,
    style: {
      transform: showList ? "rotate(180deg)" : "",
      transition: "transform 0.2s ease-out",
      marginLeft: "5px"
    }
  })), /* @__PURE__ */ React.createElement(KeyboardSelectors, {
    show: showList,
    selectedPath,
    keyboards: connectedKeyboardDefinitions,
    onClickOut: () => setShowList(false),
    selectKeyboard: (path) => {
      dispatch(selectConnectedDeviceByPath(path));
      setShowList(false);
    }
  })));
};
