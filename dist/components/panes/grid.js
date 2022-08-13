import getIconColor from "../icons/get-icon-color.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
export const Grid1Col = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: minmax(350px, min-content) minmax(0, 1fr);
  grid-template-columns: 100vw;
`;
export const Grid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: minmax(350px, min-content) minmax(0, 1fr);
  grid-template-columns: min-content minmax(0, 1fr);
`;
export const Cell = styled.div`
  background: var(--color_light-jet);
  border-right: 1px solid var(--color_dark-grey);
`;
export const MenuCell = styled(Cell)`
  grid-area: 1 / 1 / 3 / 2;
`;
export const OverflowCell = styled(Cell)`
  border-top: 1px solid var(--color_dark-grey);
  overflow: auto;
  background: var(--color_light-jet);
`;
export const SubmenuCell = styled(Cell)`
  border-top: 1px solid var(--color_dark-grey);
  grid-area: 2 / 1 / 3 / 2;
`;
export const SubmenuOverflowCell = styled(SubmenuCell)`
  overflow: auto;
`;
export const FlexCell = styled(Cell)`
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 50px 10px;
  position: relative;
  background: var(--gradient);
`;
export const IconContainer = styled.span`
  display: inline-block;
  text-align: center;
  width: 35px;
`;
export const ControlRow = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
  border-bottom: 1px solid var(--color_light-jet);
  font-size: 20px;
  justify-content: space-between;
  display: flex;
  line-height: 50px;
  min-height: 50px;
  box-sizing: border-box;
`;
export const SubControlRow = styled(ControlRow)``;
export const IndentedControlRow = styled(ControlRow)`
  padding-left: 12px;
`;
export const Label = styled.label`
  color: var(--color_medium-grey);
`;
export const SubLabel = styled(Label)`
  font-size: 18px;
  font-style: italic;
`;
export const Detail = styled.span`
  color: var(--color_accent);
  display: flex;
  align-items: center;
`;
export const Row = styled.div`
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: 15px;
  font-size: 20px;
  height: 20px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${(props) => getIconColor(props.selected).style.color};
  border-left: 2px solid
    ${(props) => props.selected ? "var(--color_light-grey)" : "transparent"};

  svg {
    height: 20px;
    vertical-align: middle;
  }

  &:hover {
    color: ${(props) => props.selected ? getIconColor(props.selected).style.color : "var(--color_dark-grey)"};
  }
`;
export const SubmenuRow = styled(Row)`
  padding-left: 8px;
`;
