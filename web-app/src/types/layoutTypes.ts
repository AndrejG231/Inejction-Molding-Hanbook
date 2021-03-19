import { ReactChild } from "react";
import { IconType } from "react-icons/lib";

export type LayoutProps = {
  children: ReactChild;
};

export type NavRouteChangeHandle = {
  (nextRoute: string): void;
};

export type NavItemsObject = { [key in string]: IconType };
