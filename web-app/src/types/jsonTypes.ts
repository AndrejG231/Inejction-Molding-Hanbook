export type partsJsonTypes = {
  [key in string]: {
    moldNumber: number;
    description: string;
  };
};

export type partsProjectTypes = {
  [key in string]: string[];
};

export type partsMoldTypes = {
  [key in string]: {
    sap: string;
    cycleTime: number;
  }[];
};

export type partsMaterialTypes = {
  [key in string]: {
    name: string;
    parts: { sap: string; portion: number; volume: number }[];
  };
};
