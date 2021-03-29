import { editValuesT, src } from "./Reducer";

export const setEditMode = (value: boolean) => {
  return {
    type: `${src}/setEditMode`,
    data: value,
  };
};

export const setEditValue = (field: string, value: string) => {
  return {
    type: `${src}/setEditValue`,
    data: {
      field: field,
      value: value,
    },
  };
};

export const setEditValues = (values: editValuesT) => {
  return {
    type: `${src}/setEditValues`,
    data: values,
  };
};

export const saveEdits = () => {
  return {
    type: `${src}/saveEdits`,
  };
};

export const storeEdits = () => {
  return { type: `${src}/storeEdits` };
};
