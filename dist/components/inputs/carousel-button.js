import styled from "../../../_snowpack/pkg/styled-components.js";
export var Direction;
(function(Direction2) {
  Direction2[Direction2["Left"] = 0] = "Left";
  Direction2[Direction2["Right"] = 1] = "Right";
})(Direction || (Direction = {}));
export const CarouselButton = styled.button`
  display: block;
  margin: 0;
  padding: 0;
  background: none;
  border-color: transparent;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-left: 24px solid transparent;
  border-right: 24px solid transparent;
  border-bottom: 15px solid #717070;
  position: absolute;
  outline: none;

  ${(props) => props.direction === 1 ? "transform: rotate(90deg); right: -6px;" : "transform: rotate(-90deg); left: -6px;"}

  :hover {
    border-bottom-color: #505050;
  }

  :disabled {
    border-bottom-color: #d8d8d8;
    cursor: initial;
  }
`;
