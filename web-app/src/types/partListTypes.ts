export type PartListTypes = "mold" | "category" | "imm" | "material";

export type PartProps = {
  part: string;
};

export type CategoryProps = {
  children: string;
};

export type PartListProps = {
  variant: "mold" | "category" | "imm" | "material";
  search?: RegExp;
};
