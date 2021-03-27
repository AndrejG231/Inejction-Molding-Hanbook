import { onClick } from "./globalTypes";

export type editStateType = {
  material: string;
  name: string;
  info: string;
};

export type editFormProps = {
  editData: editStateType;
  setEditData: (editData: editStateType) => void;
  handleSubmit: onClick<HTMLButtonElement>;
  setMatSelect: () => void;
  endEditMode: () => void;
};
