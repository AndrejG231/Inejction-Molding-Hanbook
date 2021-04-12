import { partsJsonTypes } from "../types/jsonTypes";

export const partsToCategories = (parts: partsJsonTypes) => {
  const materials: { [key in string]: string[] } = {};
  const imms: { [key in string]: string[] } = {};
  const projects: { [key in string]: string[] } = {};

  Object.keys(parts).forEach((part) => {
    for (const material of parts[part].materials) {
      if (materials.hasOwnProperty(material.sap)) {
        materials[material.sap].push(part);
      } else {
        materials[material.sap] = [part];
      }
    }

    for (const imm of parts[part].molds) {
      if (imms.hasOwnProperty(imm.imm)) {
        imms[imm.imm].push(part);
      } else {
        imms[imm.imm] = [part];
      }
    }

    if (projects.hasOwnProperty(parts[part].project)) {
      projects[parts[part].project].push(part);
    } else {
      projects[parts[part].project] = [part];
    }
  });
  return { materials, imms, projects };
};
