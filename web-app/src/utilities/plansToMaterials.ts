import { editValuesT } from "../redux/Plans/Reducer";
import { parts } from "../private/data";
import { plansToImms } from "./planToImms";

export const plansToMaterials = (plan: editValuesT[], max: number) => {
  const immPlan = plansToImms(plan);
  const matPlan: {
    [key in string]: { start: number; end: number; use: number }[];
  } = {};

  for (const imm of Object.keys(immPlan)) {
    for (let i = 0; i < immPlan[imm].length; i++) {
      let start = immPlan[imm][i].time;
      const end = immPlan[imm][i + 1]?.time ?? max;

      const materials = parts[immPlan[imm][i].nextForm]?.materials ?? [
        {
          sap: "0000",
          portion: 100,
          volume: 100,
        },
      ];

      for (const mat of materials) {
        if (matPlan.hasOwnProperty(mat.sap)) {
          const last = matPlan[mat.sap][matPlan[mat.sap].length - 1];
          if (start < last.end) {
            matPlan[mat.sap].push({
              start: start,
              end: last.end,
              use: mat.volume + last.use,
            });
            [last.end, start] = [start, last.end];
            matPlan[mat.sap].push({ start: start, end: end, use: mat.volume });
          } else {
            matPlan[mat.sap].push({ start: start, end: end, use: mat.volume });
          }
        } else {
          matPlan[mat.sap] = [{ start: start, end: end, use: mat.volume }];
        }
      }
    }
  }

  return matPlan;
};
