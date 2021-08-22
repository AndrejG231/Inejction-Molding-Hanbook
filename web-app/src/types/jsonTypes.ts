export type partsJsonTypes = {
    storageId: string;
    description: string;
    materials: { id: string; portion: number; volume: number }[];
    molds: { imm: string; cycleTime: number }[];
    project: string;
    moldNumber: number;
}[];

export type partsMaterialTypes = {
  [key in string]: string;
}

export type partsImmsTypes = {
  [key in string]: string
}

