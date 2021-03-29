import { editValuesT, src } from "./source";

export const setEditMode = (value: boolean) => {
  return {
    type: `${src}/setEditMode`,
    data: value,
  };
};

export const setMatSelMode = (value: boolean) => {
  return {
    type: `${src}/setMatSelMode`,
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

export const reloadCookies = () => {
  return {
    type: `${src}/reloadCookies`,
    data: null,
  };
};
