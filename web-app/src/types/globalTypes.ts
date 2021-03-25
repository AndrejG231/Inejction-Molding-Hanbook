import {MouseEvent} from "react";

export type booleanObject = { [key in string]: boolean };
export type onClick<element> = { (event: MouseEvent<element>): void };