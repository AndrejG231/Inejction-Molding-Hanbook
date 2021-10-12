import {
  partsImmsTypes,
  partsJsonTypes,
  partsMaterialTypes,
} from "../../types/jsonTypes";

export type state = {
  parts: partsJsonTypes | null | "error";
  imms: partsImmsTypes | null | "error";
  materials: partsMaterialTypes | null | "error";
};

const defaultState = {
  parts: null,
  imms: null,
  materials: null,
};

export type actionDataPairs =
  | {
      field: "parts";
      data: partsJsonTypes;
    }
  | {
      field: "imms";
      data: partsImmsTypes;
    }
  | { field: "materials"; data: partsMaterialTypes };

export type action =
  | {
      type: "SET";
      values: actionDataPairs;
    }
  | { type: "ERROR"; field: keyof state };

const Data = (state: state = defaultState, action: action) => {
  switch (action.type) {
    case "SET":
      return { ...state, [action.values.field]: action.values.data };
    default:
      return state;
  }
};

export default Data;
