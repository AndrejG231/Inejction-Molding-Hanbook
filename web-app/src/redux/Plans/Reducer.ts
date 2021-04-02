import { getPlanFromCookie } from "../../utilities/getPlanFromCooke";
import { getEditTime } from "../../utilities/getTime";
import { action } from "../../types/globalTypes";

export const src = "plans";

export type editValuesT = {
  mold: string;
  previous: string;
  nextForm: string;
  time: number;
  checked: boolean;
};

const getEditValues: { (): editValuesT } = () => {
  return {
    mold: "",
    previous: "",
    nextForm: "",
    checked: false,
    time: getEditTime(),
  };
};

const plansState = {
  plans: getPlanFromCookie(),
  editMode: false,
  editValues: getEditValues(),
  editIndex: -1,
};

export type PlansReducerState = {
  editValues: editValuesT;
  editIndex: number;
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
    case `${src}/setEditIndex`:
      return { ...state, editIndex: action.data };
    case `${src}/saveEdits`:
      if (state.editValues.nextForm && state.editValues.mold) {
        const plans = [...state.plans, state.editValues].sort(
          (a, b) => a.time - b.time
        );

        if (state.editIndex >= 0) {
          console.log("Removing");
          plans.splice(state.editIndex, 1);
        }

        console.log("New plans", plans);
        document.cookie = `@plan=${JSON.stringify(
          plans
        )};path=/;expires=Thu, 01 Jan 2970 00:00:00 UTC`;
        return {
          ...state,
          editValues: {
            ...getEditValues(),
            time: state.editValues.time + 30 * 60 * 1000,
          },
          plans: plans,
          editIndex: -1,
        };
      }
      return state;
    case `${src}/delete`:
      if (state.editIndex >= 0) {
        const plans = [...state.plans];
        plans.splice(state.editIndex, 1);
        return { ...state, plans: plans, editIndex: -1 };
      }
      return state;
    case `${src}/setChecked`:
      const plans = [...state.plans];
      plans[action.data] = {
        ...plans[action.data],
        checked: !plans[action.data].checked,
      };

      return { ...state, plans: plans };
    case `${src}/loadEditValues`:
      return { ...state, editValues: state.plans[action.data] };
    case `${src}/clearPlans`:
      return { ...plansState, plans: [] };
    default:
      return state;
  }
};
