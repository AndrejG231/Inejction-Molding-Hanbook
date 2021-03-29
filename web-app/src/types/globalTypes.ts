import { MouseEvent } from "react";

export type booleanObject = { [key in string]: boolean };
export type numberObject = { [key in string]: number } | any;
export type onClick<element> = { (event: MouseEvent<element>): void };
export type action = { type: string; data: any };
