export type partsJsonTypes = {
  [key in string]: {
    moldNumber: number;
    description: string;
    materials: { sap: string; portion: number; volume: number }[];
    molds: { imm: string; cycleTime: number }[];
    project: string;
  };
};

export type partsMaterialTypes = {
  [key in string]: string;
};
