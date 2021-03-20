import partsJSON from "./parts.json";
import materialsJSON from "./materials.json";
import pressesJSON from "./presses.json";
import projectsJSON from "./projects.json";

import {
  partsJsonTypes,
  partsMaterialTypes,
  partsMoldTypes,
  partsProjectTypes,
} from "../types/jsonTypes";

export const parts: partsJsonTypes = partsJSON;
export const materials: partsMaterialTypes = materialsJSON;
export const imms: partsMoldTypes = pressesJSON;
export const categories: partsProjectTypes = projectsJSON;
