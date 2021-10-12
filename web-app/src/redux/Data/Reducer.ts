import {
  partsImmsTypes,
  partsJsonTypes,
  partsMaterialTypes,
} from "../../types/jsonTypes";

export type DataReducerState = {
  parts: partsJsonTypes | null | "error";
  imms: partsImmsTypes | null | "error";
  materials: partsMaterialTypes | null | "error";
};

const defaultState = {
  parts: null,
  imms: null,
  materials: null,
};

export type ActionDataPairs =
  | {
      field: "parts";
      data: partsJsonTypes;
    }
  | {
      field: "imms";
      data: partsImmsTypes;
    }
  | { field: "materials"; data: partsMaterialTypes };

export type Action =
  | {
      type: "SET";
      values: ActionDataPairs;
    }
  | { type: "ERROR"; field: keyof DataReducerState };

export const DataReducer = (
  state: DataReducerState = defaultState,
  action: Action
): DataReducerState => {
  switch (action.type) {
    case "SET":
      return { ...state, [action.values.field]: action.values.data };
    default:
      return state;
  }
};

