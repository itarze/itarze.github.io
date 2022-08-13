import styled from "../../../_snowpack/pkg/styled-components.js";
export const AccentButton = styled.button`
  height: 40px;
  padding: 0 15px;
  line-height: 40px;
  min-width: 100px;
  text-align: center;
  outline: none;
  background: none;
  font-size: 20px;
  border-radius: 5px;
  color: var(--color_accent);
  border: 1px solid var(--color_accent);
  display: inline-block;
  box-sizing: border-box;
  pointer-events: ${(props) => props.disabled ? "none" : "auto"};
  cursor: ${(props) => props.disabled ? "initial" : "pointer"};
  color: ${(props) => props.disabled ? "var(--color_dark-grey)" : "var(--color_accent)"};
  border-color: ${(props) => props.disabled ? "var(--color_dark-grey)" : "var(--color_accent)"};

  &:hover,
  &:focus {
    border: 1px solid var(--color_accent);
    color: ${(props) => props.disabled ? "var(--color_dark-grey)" : "var(--color_light-grey)"};
    border-color: ${(props) => props.disabled ? "var(--color_dark-grey)" : "var(--color_accent)"};
    background-color: ${(props) => props.disabled ? "transparent" : "var(--color_accent)"};
  }
`;
export const AccentButtonLarge = styled(AccentButton)`
  font-size: 24px;
  line-height: 60px;
  height: 60px;
`;
