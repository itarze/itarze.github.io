export default function getIconColor(isSelected) {
  return {
    style: {
      color: isSelected ? "var(--color_light-grey)" : "var(--color_medium-grey)"
    }
  };
}
