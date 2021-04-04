import { editValuesT } from "../redux/SourceManagement/Reducer";

export const toMaterialSources = (materials: editValuesT[]) => {
  const materialsObject: {
    [key in string]: { name: string; info: string };
  } = {};
  materials.forEach((mat) => {
    materialsObject[mat.material.slice(3)] = { name: mat.name, info: mat.info };
  });

  return materialsObject;
};
