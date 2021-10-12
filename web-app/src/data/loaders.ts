import { Dispatch } from "redux";
import { SetData, SetError } from "../redux/Data/Actions";
import {
  partsMaterialTypes,
  partsImmsTypes,
  partsJsonTypes,
} from "../types/jsonTypes";
import axios from "axios";

const origin =
  window.location.origin ||
  window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "");

export const loadMaterials = async (dispatch: Dispatch) => {
  try {
    //   Fetch materials
    const { data }: { data: partsMaterialTypes } = await axios.get(
      `${origin}/materials.json`
    );

    // Check materials
    const keys = Object.keys(data);

    if (keys.length < 0) {
      return dispatch(SetError("materials"));
    }

    for (const key of keys) {
      if (typeof data[key] !== "string") {
        return dispatch(SetError("materials"));
      }
    }
    return dispatch(SetData({ field: "materials", data }));
  } catch {
    return dispatch(SetError("materials"));
  }
};

export const loadImms = async (dispatch: Dispatch) => {
  try {
    //   Fetch machines data
    const { data }: { data: partsImmsTypes } = await axios.get(
      `${origin}/machines.json`
    );

    // Check checking machines data

    const keys = Object.keys(data);

    if (keys.length < 0) {
      return dispatch(SetError("imms"));
    }

    for (const key of keys) {
      if (typeof data[key] !== "string") {
        return dispatch(SetError("imms"));
      }
    }

    return dispatch(SetData({ field: "imms", data }));
  } catch {
    return dispatch(SetError("imms"));
  }
};

export const loadParts = async (dispatch: Dispatch) => {
  try {
    //   Fetch parts
    const { data }: { data: partsJsonTypes } = await axios.get(
      `${origin}/parts.json`
    );

    // Validate parts

    if (data.length < 0) {
      return dispatch(SetError("parts"));
    }

    // Check every part and set index as part mould number
    for (let i = 0; i < data.length; i++) {
      const part = data[i];

      if (
        typeof part.description !== "string" ||
        typeof part.materials !== "object" ||
        typeof part.project !== "string" ||
        typeof part.storageId !== "string"
      ) {
        return dispatch(SetError("parts"));
      }

      //   Assign mold number to parts as index - missing in mock data
      data[i].moldNumber = i;
    }

    return dispatch(SetData({ field: "parts", data }));
  } catch {
    return dispatch(SetError("materials"));
  }
};
