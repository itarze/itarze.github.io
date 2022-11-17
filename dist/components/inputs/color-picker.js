import React, {Component} from "../../../_snowpack/pkg/react.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import {
  getRGBPrime,
  toDegrees,
  calcRadialHue,
  calcRadialMagnitude
} from "../../utils/color-math.js";
const ColorLens = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid black;
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.2);
  pointer-events: none;
  box-sizing: border-box;
  transform: translate3d(195px, 195px, 0);
`;
const ColorInner = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, white, rgba(0, 0, 0, 0));
`;
const ColorOuter = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    red,
    yellow,
    lime,
    aqua,
    blue,
    magenta,
    red
  );
`;
export const ColorThumbnail = styled.div`
  display: inline-block;
  height: 20px;
  width: 30px;
  border-radius: 2px;
  border: 2px solid var(--color_dark-grey);
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const Container = styled.div`
  border: 4px solid var(--color_dark-grey);
  width: 180px;
  height: 180px;
  position: relative;
`;
const PickerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.11) 0 1px 1px 1px;
  position: absolute;
  transform: translate3d(-205px, 47px, 0);

  &::after {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    border: 11px solid var(--color_dark-grey);
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;
    right: -22px;
    top: 50px;
  }
`;
const ColorPreview = styled.div`
  width: 180px;
  height: 24px;
  border: 4px solid var(--color_dark-grey);
  border-bottom: none;
`;
export class ColorPicker extends Component {
  constructor() {
    super(...arguments);
    this.ref = null;
    this.refWidth = 0;
    this.refHeight = 0;
    this.mouseDown = false;
    this.state = {
      lensTransform: "",
      showPicker: false
    };
    this.onMouseMove = (evt) => {
      if (this.mouseDown) {
        const {offsetX, offsetY} = evt.nativeEvent;
        const lensTransform = `translate3d(${offsetX - 5}px, ${offsetY - 5}px, 0)`;
        const {hue, sat} = this.getLinearHueSat(evt);
        this.props.setColor(Math.round(255 * (hue / 360)), Math.round(255 * sat));
        this.setState({
          lensTransform
        });
      }
    };
    this.onMouseDown = (evt) => {
      this.mouseDown = true;
      this.onMouseMove(evt);
      if (this.ref) {
        this.ref.style.cursor = "pointer";
      }
    };
    this.onMouseUp = (evt) => {
      this.mouseDown = false;
      if (this.ref) {
        this.ref.style.cursor = "auto";
      }
    };
    this.onThumbnailClick = () => {
      this.setState({showPicker: true});
    };
    this.pickerContainer = React.createRef();
    this.colorThumbnail = React.createRef();
    this.onDocumentClick = (evt) => {
      if (this.state.showPicker && this.pickerContainer.current && !this.pickerContainer.current.contains(evt.target) && this.colorThumbnail.current && !this.colorThumbnail.current.contains(evt.target)) {
        this.setState({showPicker: false});
      }
    };
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.onDocumentClick);
  }
  componentDidUpdate({color}, state) {
    if (this.ref && this.state.showPicker && (!state.showPicker || color !== this.props.color)) {
      const {width, height} = this.ref.getBoundingClientRect();
      this.refWidth = width;
      this.refHeight = height;
      const {hue, sat} = this.props.color;
      const offsetX = width * hue / 255;
      const offsetY = height * (1 - sat / 255);
      const lensTransform = `translate3d(${offsetX - 5}px, ${offsetY - 5}px, 0)`;
      this.setState({lensTransform});
    }
  }
  componentDidMount() {
    document.addEventListener("click", this.onDocumentClick);
  }
  getRadialHueSat(evt) {
    var _a, _b;
    const {offsetX, offsetY} = evt.nativeEvent;
    const hue = toDegrees((_a = calcRadialHue(offsetX, offsetY)) != null ? _a : 0);
    const sat = Math.min(1, (_b = calcRadialMagnitude(offsetX, offsetY)) != null ? _b : 0);
    return {hue, sat};
  }
  getLinearHueSat(evt) {
    const width = this.refWidth;
    const height = this.refHeight;
    const {offsetX, offsetY} = evt.nativeEvent;
    const [x, y] = [Math.max(0, offsetX), Math.max(0, offsetY)];
    const hue = 360 * Math.min(1, x / width);
    const sat = 1 - Math.min(1, y / height);
    return {hue, sat};
  }
  getRGB({hue, sat}) {
    sat = sat / 255;
    hue = Math.round(360 * hue) / 255;
    const c = sat;
    const x = c * (1 - Math.abs(hue / 60 % 2 - 1));
    const m = 1 - c;
    const [r, g, b] = getRGBPrime(hue, c, x).map((n) => Math.round(255 * (m + n)));
    return `rgba(${r},${g},${b},1)`;
  }
  render() {
    const color = this.getRGB(this.props.color);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ColorThumbnail, {
      ref: this.colorThumbnail,
      onClick: this.onThumbnailClick,
      style: {background: color}
    }), this.state.showPicker && /* @__PURE__ */ React.createElement(PickerContainer, {
      ref: this.pickerContainer,
      onMouseUp: this.onMouseUp
    }, /* @__PURE__ */ React.createElement(ColorPreview, {
      style: {background: this.getRGB(this.props.color)}
    }), /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(ColorOuter, {
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      ref: (ref) => this.ref = ref
    }, /* @__PURE__ */ React.createElement(ColorInner, null, /* @__PURE__ */ React.createElement(ColorLens, {
      style: {transform: this.state.lensTransform}
    }))))));
  }
}
export const ArrayColorPicker = (props) => {
  const {color, setColor} = props;
  return /* @__PURE__ */ React.createElement(ColorPicker, {
    color: {hue: color[0], sat: color[1]},
    setColor
  });
};
