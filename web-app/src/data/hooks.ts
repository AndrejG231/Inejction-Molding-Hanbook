import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../redux/Data/Actions";
import { ReduxStoreT } from "../redux/reduxStore";
import { loadImms, loadMaterials, loadParts } from "./loaders";

// Returns materials selector or fetches materials if not in data
export const useMaterials = () => {
  const materials = useSelector((state: ReduxStoreT) => state.data.materials);
  const dispatch = useDispatch();

  if (!materials && materials !== "loading") {
    dispatch(SetLoading("materials"));
    loadMaterials(dispatch);
  }

  return materials;
};

export const useImms = () => {
  const imms = useSelector((state: ReduxStoreT) => state.data.imms);
  const dispatch = useDispatch();

  if (!imms && imms !== "loading") {
    dispatch(SetLoading("imms"));
    loadImms(dispatch);
  }

  return imms;
};

export const useParts = () => {
  const parts = useSelector((state: ReduxStoreT) => state.data.parts);
  const dispatch = useDispatch();

  if (!parts && parts !== "loading") {
    dispatch(SetLoading("parts"));
    loadParts(dispatch);
  }

  return parts;
};
