import { onClick } from "./globalTypes";

export type PartProps = {
  part: string;
};

export type CategoryProps = {
  children: string;
  onClick: onClick<HTMLDivElement>;
};

export type PartListProps = {
  variant: string;
  search?: RegExp;
};
