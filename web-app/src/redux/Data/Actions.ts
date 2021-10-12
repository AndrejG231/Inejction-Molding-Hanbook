import { action, actionDataPairs, state } from "./Reducer";

export const SetData = (options: actionDataPairs): action => ({
  type: "SET",
  values: options,
});

export const SetError = (field: keyof state): action => ({
  type: "ERROR",
  field: field,
});
