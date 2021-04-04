import partsJSON from "./parts.json";
import materialsJSON from "./materials.json";
import immsJSON from "./imms.json";

import { partsJsonTypes, partsMaterialTypes } from "../types/jsonTypes";

export const parts: partsJsonTypes = partsJSON;
export const materials: partsMaterialTypes = materialsJSON;
export const imms: string[] = immsJSON;
