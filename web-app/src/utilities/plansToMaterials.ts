import { editValuesT } from "../redux/Plans/Reducer";
import { parts } from "../data/data";
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
        const use = Math.floor((mat.portion * 60) / 1000);
        if (matPlan.hasOwnProperty(mat.sap)) {
          for (let j = 0; j < matPlan[mat.sap].length; j++) {
            let segment = matPlan[mat.sap][j];

            if (start < segment.start) {
              if (end <= segment.start) {
                matPlan[mat.sap] = [
                  ...matPlan[mat.sap].slice(0, j),
                  { start, end, use },
                  ...matPlan[mat.sap].slice(j),
                ];

                start = end;
                break;
              } else {
                if (end < segment.end) {
                  const newSegments = [
                    { start: start, end: segment.start, use },
                    { start: segment.start, end: end, use: use + segment.use },
                    { start: end, end: segment.end, use: segment.use },
                  ];

                  matPlan[mat.sap] = [
                    ...matPlan[mat.sap].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.sap].slice(j + 1),
                  ];

                  start = end;
                  break;
                } else if (end === segment.end) {
                  const newSegments = [
                    { start, end: segment.start, use: use },
                    { start: segment.start, end, use: segment.use + use },
                  ];

                  matPlan[mat.sap] = [
                    ...matPlan[mat.sap].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.sap].slice(j + 1),
                  ];

                  start = end;
                  break;
                } else {
                  const newSegments = [
                    { start, end: segment.start, use: use },
                    {
                      start: segment.start,
                      end: segment.end,
                      use: segment.use + use,
                    },
                  ];

                  matPlan[mat.sap] = [
                    ...matPlan[mat.sap].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.sap].slice(j + 1),
                  ];

                  start = segment.end;
                }
              }
            } else if (start === segment.start) {
              if (end < segment.end) {
                const newSegments = [
                  { start, end, use: use + segment.use },
                  { start: end, end: segment.end, use: segment.use },
                ];

                matPlan[mat.sap] = [
                  ...matPlan[mat.sap].slice(0, j),
                  ...newSegments,
                  ...matPlan[mat.sap].slice(j + 1),
                ];

                start = end;
                break;
              } else if (end === segment.end) {
                segment.use = segment.use + use;

                start = end;
                break;
              } else {
                segment.use = segment.use + use;

                start = segment.end;
              }
            } else {
              if (start < segment.end) {
                if (end < segment.end) {
                  const newSegments = [
                    { start: segment.start, end: start, use: segment.use },
                    { start, end, use: segment.use + use },
                    { start: end, end: segment.end, use: segment.use },
                  ];

                  matPlan[mat.sap] = [
                    ...matPlan[mat.sap].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.sap].slice(j + 1),
                  ];

                  start = end;
                  break;
                } else if (end === segment.end) {
                  const newSegments = [
                    { start: segment.start, end: start, use: segment.use },
                    { start, end, use: use + segment.use },
                  ];

                  matPlan[mat.sap] = [
                    ...matPlan[mat.sap].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.sap].slice(j + 1),
                  ];

                  start = end;
                  break;
                } else {
                  const newSegments = [
                    { start: segment.start, end: start, use: segment.use },
                    { start, end: segment.end, use: use + segment.use },
                  ];

                  matPlan[mat.sap] = [
                    ...matPlan[mat.sap].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.sap].slice(j + 1),
                  ];

                  start = segment.end;
                }
              }
            }
          }
          if (start !== end) {
            matPlan[mat.sap].push({ start, end, use });
          }
        } else {
          matPlan[mat.sap] = [{ start, end, use }];
        }
      }
    }
  }

  return matPlan;
};
