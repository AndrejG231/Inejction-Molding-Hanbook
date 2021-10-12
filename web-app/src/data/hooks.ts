import { useDispatch, useSelector } from "react-redux";
import { ReduxStoreT } from "../redux/reduxStore";
import { loadImms, loadMaterials, loadParts } from "./loaders";

// Returns materials selector or fetches materials if not in data
export const useMaterials = () => {
  const materials = useSelector((state: ReduxStoreT) => state.data.materials);
  const dispatch = useDispatch();

  if (!materials) {
    loadMaterials(dispatch);
  }

  return materials;
};

export const useImms = () => {
  const imms = useSelector((state: ReduxStoreT) => state.data.imms);
  const dispatch = useDispatch();

  if (!imms) {
    loadImms(dispatch);
  }

  return imms;
};

export const useParts = () => {
  const parts = useSelector((state: ReduxStoreT) => state.data.parts);
  const dispatch = useDispatch();

  if (!parts) {
    loadParts(dispatch);
  }

  return parts;
};
