import React from "react";
import partJson from "../private/parts.json";
import { partsJsonTypes } from "../types/jsonTypes";

const parts: partsJsonTypes = partJson;

export const PartView = () => {
  return <div style={{ overflow: "scroll", height: "100%" }}></div>;
};
