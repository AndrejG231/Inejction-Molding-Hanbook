import { createStore, combineReducers } from "redux";
import {
  SourceManagementReducer,
  SourceManagementStateT,
} from "./SourceManagement/Reducer";

export type ReduxStoreT = {
  sourceManagement: SourceManagementStateT;
};

const store = combineReducers({
  sourceManagement: SourceManagementReducer,
});

export const ReduxStore = createStore(store);
