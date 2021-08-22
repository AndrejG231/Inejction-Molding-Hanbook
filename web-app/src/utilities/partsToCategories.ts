import { partsJsonTypes } from "../types/jsonTypes";

export const partsToCategories = (parts: partsJsonTypes, search?: RegExp) => {
  const materials: { [key in string]: number[] } = {};
  const imms: { [key in string]: number[] } = {};
  const projects: { [key in string]: number[] } = {};

  parts.forEach((part, index) => {
    if(!search || search.test(part.description)){
      for (const material of part.materials) {
        if (materials.hasOwnProperty(material.id)) {
          materials[material.id].push(index);
        } else {
          materials[material.id] = [index];
        }
      }

      for (const imm of part.molds) {
        if (imms.hasOwnProperty(imm.imm)) {
          imms[imm.imm].push(index);
        } else {
          imms[imm.imm] = [index];
        }
      }

      if (projects.hasOwnProperty(part.project)) {
        projects[part.project].push(index);
      } else {
        projects[part.project] = [index];
      }
    }
  });
  return { materials, imms, projects };
};
