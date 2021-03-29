import { onClick } from "./globalTypes";

export type materialSelectProps = {
  selectHandler: (item: string) => void;
};

export type editStateType = {
  material: string;
  name: string;
  info: string;
};
