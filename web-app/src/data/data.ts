import {
  partsJsonTypes,
  partsMaterialTypes,
  partsImmsTypes,
} from "../types/jsonTypes";

export const parts: partsJsonTypes = partsJSON.map((part, index) => ({
  ...part,
  moldNumber: index,
}));
export const materials: partsMaterialTypes = materialsJSON;
export const imms: partsImmsTypes = immsJSON;
