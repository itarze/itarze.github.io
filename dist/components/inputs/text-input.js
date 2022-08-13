import styled from "../../../_snowpack/pkg/styled-components.js";
const TextInput = styled.input`
  background: var(--color_light-jet);
  border: none;
  border-bottom: 1px solid var(--color_light-jet);
  color: var(--color_accent);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  transition: all 0.4s ease-out;

  &:focus {
    border-color: var(--color_accent);
    color: var(--color_accent);
    outline: none;
  }

  &::placeholder {
    color: var(--color_dark-grey);
  }
`;
export default TextInput;
export const ErrorInput = styled(TextInput)`
  // FIXME: Use standard colors
  border-color: #d15e5e;
  color: #d15e5e;
`;
