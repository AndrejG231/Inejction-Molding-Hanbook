import { getPlanFromCookie } from "../../utilities/getPlanFromCooke";
import { getTime } from "../../utilities/getTime";
import { action } from "../../types/globalTypes";

export const src = "plans";

export type editValuesT = {
  mold: string;
  previous: string;
  nextForm: string;
  time: number;
};

const getEditValues: { (): editValuesT } = () => {
  return {
    mold: "",
    previous: "",
    nextForm: "",
    time: getTime(),
  };
};

const plansState = {
  plans: getPlanFromCookie(),
  editMode: false,
  editValues: getEditValues(),
};

export type PlansReducerState = {
  editValues: editValuesT;
  plans: editValuesT[];
  editMode: boolean;
};

type Reducer = {
  (state: PlansReducerState, action: action): PlansReducerState;
};

export const PlansReducer: Reducer = (state = plansState, action: action) => {
  switch (action.type) {
    case `${src}/setEditMode`:
      if (!action.data) {
        return { ...state, editValues: getEditValues(), editMode: action.data };
      }
      return { ...state, editMode: action.data };
    case `${src}/setEditValue`:
      return {
        ...state,
        editValues: {
          ...state.editValues,
          [action.data.field]: action.data.value,
        },
      };
    case `${src}/setEditValues`:
      return {
        ...state,
        editValues: action.data,
      };
    case `${src}/saveEdits`:
      return {
        ...state,
        editValues: { ...getEditValues(), time: state.editValues.time + 30 },
        plans: [...state.plans, state.editValues],
      };
    case `${src}/storeEdits`:
      document.cookie = `@plan=${JSON.stringify(
        state.plans
      )};expires=Thu, 01 Jan 2970 00:00:00 UTC;`;
      return state;
    default:
      return state;
  }
};
