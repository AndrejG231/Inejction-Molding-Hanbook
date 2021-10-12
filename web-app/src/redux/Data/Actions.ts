import { Action, ActionDataPairs, DataReducerState } from "./Reducer";

export const SetData = (options: ActionDataPairs): Action => ({
  type: "SET",
  values: options,
});

export const SetError = (field: keyof DataReducerState): Action => ({
  type: "ERROR",
  field: field,
});

export const SetLoading = (field: keyof DataReducerState): Action => ({
  type: "LOADING",
  field: field,
});
