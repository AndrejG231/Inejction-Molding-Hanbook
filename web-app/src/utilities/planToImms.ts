import { editValuesT } from "../redux/Plans/Reducer";
import { switchPerMolds } from "../types/globalTypes";

export const plansToImms = (plan: editValuesT[]) => {
  const immObject: {
    [key in string]: switchPerMolds[];
  } = {};
  plan.forEach((item) => {
    if (!immObject.hasOwnProperty(item.mold)) {
      immObject[item.mold] = [
        { nextForm: item.nextForm, previous: item.previous, time: item.time },
      ];
    } else {
      immObject[item.mold].push({
        nextForm: item.nextForm,
        previous: item.previous,
        time: item.time,
      });
    }
  });
  return immObject;
};
