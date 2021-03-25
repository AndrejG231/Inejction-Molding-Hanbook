import { onClick } from "./globalTypes";

export type PartListTypes = "mold" | "category" | "imm" | "material";

export type PartProps = {
  part: string;
};

export type CategoryProps = {
  children: string;
  onClick: onClick<HTMLDivElement>;
};

export type PartListProps = {
  variant: "mold" | "category" | "imm" | "material";
  search?: RegExp;
};
