import { editValuesT } from "../redux/Plans/Reducer";
import { partsJsonTypes } from "../types/jsonTypes";
import { plansToImms } from "./planToImms";

export const plansToMaterials = (
  plan: editValuesT[],
  max: number,
  parts: partsJsonTypes
) => {
  // Function that calculates usage of materials per switch time segments
  const immPlan = plansToImms(plan);
  const matPlan: Record<
    string,
    { start: number; end: number; volume: number }[]
  > = {};

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
        const volume = mat.volume;
        if (matPlan.hasOwnProperty(mat.id)) {
          // Case of current material already in list
          for (let j = 0; j < matPlan[mat.id].length; j++) {
            let segment = matPlan[mat.id][j];

            if (start < segment.start) {
              if (end <= segment.start) {
                // Insert in front of next
                matPlan[mat.id] = [
                  ...matPlan[mat.id].slice(0, j),
                  { start, end, volume },
                  ...matPlan[mat.id].slice(j),
                ];

                start = end;
                break;
              } else {
                if (end < segment.end) {
                  // Insert in front of next and merge into split part of next
                  const newSegments = [
                    { start: start, end: segment.start, volume },
                    {
                      start: segment.start,
                      end: end,
                      volume: volume + segment.volume,
                    },
                    { start: end, end: segment.end, volume: segment.volume },
                  ];

                  matPlan[mat.id] = [
                    ...matPlan[mat.id].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.id].slice(j + 1),
                  ];

                  start = end;
                  break;
                } else if (end === segment.end) {
                  // Insert in front, and merge whole next
                  const newSegments = [
                    { start, end: segment.start, volume: volume },
                    {
                      start: segment.start,
                      end,
                      volume: segment.volume + volume,
                    },
                  ];

                  matPlan[mat.id] = [
                    ...matPlan[mat.id].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.id].slice(j + 1),
                  ];

                  start = end;
                  break;
                } else {
                  // Insert in front of next, merge whole next, continue with remainder
                  const newSegments = [
                    { start, end: segment.start, volume: volume },
                    {
                      start: segment.start,
                      end: segment.end,
                      volume: segment.volume + volume,
                    },
                  ];

                  matPlan[mat.id] = [
                    ...matPlan[mat.id].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.id].slice(j + 1),
                  ];

                  start = segment.end;
                }
              }
            } else if (start === segment.start) {
              // Start in same place
              if (end < segment.end) {
                // End before, merge into split part of next
                const newSegments = [
                  { start, end, volume: volume + segment.volume },
                  { start: end, end: segment.end, volume: segment.volume },
                ];

                matPlan[mat.id] = [
                  ...matPlan[mat.id].slice(0, j),
                  ...newSegments,
                  ...matPlan[mat.id].slice(j + 1),
                ];

                start = end;
                break;
              } else if (end === segment.end) {
                // Same time segment => just merge
                segment.volume = segment.volume + volume;

                start = end;
                break;
              } else {
                // Continues after, merge segment, continue with remainder
                segment.volume = segment.volume + volume;

                start = segment.end;
              }
            } else {
              if (start < segment.end) {
                // Inside of next segment => split and merge into center part
                if (end < segment.end) {
                  const newSegments = [
                    {
                      start: segment.start,
                      end: start,
                      volume: segment.volume,
                    },
                    { start, end, volume: segment.volume + volume },
                    { start: end, end: segment.end, volume: segment.volume },
                  ];

                  matPlan[mat.id] = [
                    ...matPlan[mat.id].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.id].slice(j + 1),
                  ];

                  start = end;
                  break;
                } else if (end === segment.end) {
                  // Start inside and same end => merge till end of next
                  const newSegments = [
                    {
                      start: segment.start,
                      end: start,
                      volume: segment.volume,
                    },
                    { start, end, volume: volume + segment.volume },
                  ];

                  matPlan[mat.id] = [
                    ...matPlan[mat.id].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.id].slice(j + 1),
                  ];

                  start = end;
                  break;
                } else {
                  const newSegments = [
                    {
                      start: segment.start,
                      end: start,
                      volume: segment.volume,
                    },
                    {
                      start,
                      end: segment.end,
                      volume: volume + segment.volume,
                    },
                  ];

                  matPlan[mat.id] = [
                    ...matPlan[mat.id].slice(0, j),
                    ...newSegments,
                    ...matPlan[mat.id].slice(j + 1),
                  ];

                  start = segment.end;
                }
              }
            }
          }
          if (start !== end) {
            // No segments left in front, push to the end
            matPlan[mat.id].push({ start, end, volume });
          }
        } else {
          matPlan[mat.id] = [{ start, end, volume }];
        }
      }
    }
  }

  return matPlan;
};
