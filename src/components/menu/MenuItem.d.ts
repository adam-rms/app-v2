/*
 The interface for a menu Item
 */
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { RMSDrawerParamList } from "../../navigation/RMSDrawer";

interface MenuListItem {
  icon?: IconProp | null;
  title?: string;
  permission?: string;
  isLoading?: boolean;
}

/*
 The interface with just the props in MenuListItem (no link)
 */
interface BlankMenuItem extends MenuListItem {
  type: "item";
  onClick?: () => void;
}

/*
A Menu Item that takes you somewhere (hopefully Central Hall)
 */
interface MenuItemRoute extends MenuListItem {
  type: "route";
  url: keyof RMSDrawerParamList;
}

/*
A separator Menu Item
 */
interface MenuItemSeparator extends MenuListItem {
  type: "separator";
}

/**
 * A menu item that creates a heading for a section
 */
interface MenuItemSection extends MenuListItem {
  type: "section";
  title: string;
}

interface MenuInstanceSwitcher extends MenuListItem {
  type: "instanceSwitcher";
}

interface MenuFunction extends MenuListItem {
  type: "function";
  function: () => void;
}

export type MenuItem =
  | BlankMenuItem
  | MenuItemRoute
  | MenuItemSeparator
  | MenuItemSection
  | MenuFunction;
