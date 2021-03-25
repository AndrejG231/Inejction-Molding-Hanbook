export type partsJsonTypes = {
  [key in string]: {
    moldNumber: number;
    description: string;
    materials: { sap: string; portion: number; volume: number }[];
    molds: { imm: string; cycleTime: number }[];
  };
};

export type partsProjectTypes = {
  [key in string]: string[];
};

export type partsMoldTypes = {
  [key in string]: string[];
};

export type partsMaterialTypes = {
  [key in string]: {
    name: string;
    parts: string[];
  };
};
