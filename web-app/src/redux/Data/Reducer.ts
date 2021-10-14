import {
  partsImmsTypes,
  partsJsonTypes,
  partsMaterialTypes,
} from "../../types/jsonTypes";

// To check state of data fetching - no multiple data fetches
export type DataInfoTypes = null | "error" | "loading";

export type DataReducerState = {
  parts: partsJsonTypes | null | "error" | "loading";
  imms: partsImmsTypes | null | "error" | "loading";
  materials: partsMaterialTypes | null | "error" | "loading";
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
  | { type: "ERROR"; field: keyof DataReducerState }
  | { type: "LOADING"; field: keyof DataReducerState };

export const DataReducer = (
  state: DataReducerState = defaultState,
  action: Action
): DataReducerState => {
  switch (action.type) {
    case "SET":
      return { ...state, [action.values.field]: action.values.data };
    case "ERROR":
      return { ...state, [action.field]: "error" };
    case "LOADING":
      return { ...state, [action.field]: "loading" };
    default:
      return state;
  }
};
