import { parseMaterialCookies } from "../../utilities/parseMaterialCookies";
import { action } from "../../types/globalTypes";

export const src = "source_management";

export type editValuesT = {
  name: string;
  info: string;
  material: string;
};

export type SourceManagementStateT = {
  editMode: boolean;
  selectionMode: boolean;
  editValues: editValuesT;
  sources: editValuesT[];
};

const editValues = {
  name: "",
  material: "",
  info: "",
};

const SourceManagementState: SourceManagementStateT = {
  editMode: false,
  selectionMode: false,
  editValues: editValues,
  sources: parseMaterialCookies(),
};

type Reducer = {
  (state: SourceManagementStateT, action: action): SourceManagementStateT;
};

export const SourceManagementReducer: Reducer = (
  state = SourceManagementState,
  action
) => {
  switch (action.type) {
    case `${src}/setEditMode`:
      if (!action.data) {
        return { ...state, editValues: editValues, editMode: action.data };
      }
      return { ...state, editMode: action.data };
    case `${src}/setMatSelMode`:
      return { ...state, selectionMode: action.data };
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
    case `${src}/reloadCookies`:
      return { ...state, sources: parseMaterialCookies() };
    default:
      return state;
  }
};
