import { ReactChild } from "react";

export type LayoutProps = {
  children: ReactChild;
};

export type NavRouteChangeHandle = {
  (nextRoute: string): void;
};
