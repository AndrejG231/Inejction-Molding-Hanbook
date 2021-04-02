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

export const setEditIndex = (index: number) => {
  return {
    type: `${src}/setEditIndex`,
    data: index,
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

export const setChecked = (index: number) => {
  return { type: `${src}/setChecked`, data: index };
};

export const loadEditValues = (index: number) => {
  return { type: `${src}/loadEditValues`, data: index };
};

export const deleteSwitch = () => {
  return { type: `${src}/delete` };
};

export const clearPlans = () => {
  return { type: `${src}/clearPlans` };
};
