import { IconLookup } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

/**
 * Takes a string (which is outputted from Font Awesome Icon Picker in the dash) and converts it for use in React.
 * Only returns solid variants of icons, to limit import requirements.
 * Usage:
 * <FontAwesomeIcon icon={ GenerateIconFromString(iconString) } />
 *
 * @param iconString The string to convert
 */
function GenerateIconFromString(iconString: string): IconProp {
  const splitIcon = iconString.split(" ");
  const iconName = splitIcon[1].split(/-(.+)/)[1];
  return { prefix: "fas", iconName: iconName } as IconLookup;
}

export default GenerateIconFromString;
