export type switchT = { time: number; mold: string; nextForm: number };

type editValues = {
  mold: string;
  nextForm: number;
  time: number;
};

export type planSetterProps = {
  plan: switchT[];
  enterEditMode: () => void;
  setEditValues: (editValues: editValues) => void;
};

export type plansEditProps = {
  values: editValues;
  setEditValues: (editValues: editValues) => void;
  saveEdits: () => void;
};
