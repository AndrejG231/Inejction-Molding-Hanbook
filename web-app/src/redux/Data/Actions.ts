import { Action, ActionDataPairs, DataReducerState } from "./Reducer";

export const SetData = (options: ActionDataPairs): Action => ({
  type: "SET",
  values: options,
});

export const SetError = (field: keyof DataReducerState): Action => ({
  type: "ERROR",
  field: field,
});
