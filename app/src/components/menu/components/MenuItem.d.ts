/*
 The interface for a menu Item
 */
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface MenuListItem {
  icon?: IconProp | null;
  title?: string;
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
  url: string;
}

/*
A separator Menu Item
 */
interface MenuItemSeparator {
  type: "separator";
}

/**
 * A menu item that creates a heading for a section
 */
interface MenuItemSection {
  type: "section";
  title: string;
}

export type MenuItem =
  | BlankMenuItem
  | MenuItemRoute
  | MenuItemSeparator
  | MenuItemSection;
