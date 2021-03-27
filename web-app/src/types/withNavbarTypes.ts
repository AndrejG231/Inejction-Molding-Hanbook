import { ReactChild } from "react";

export type WithNavbarProps = {
  children: ReactChild | ReactChild[];
  navItems: string[];
  menuSelector?: (item: string) => void;
  selectedItem?: string;
};
