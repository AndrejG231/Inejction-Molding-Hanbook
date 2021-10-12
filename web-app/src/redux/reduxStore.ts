import { createStore, combineReducers } from "redux";
import {
  SourceManagementReducer,
  SourceManagementStateT,
} from "./SourceManagement/Reducer";

import { PlansReducer, PlansReducerState } from "./Plans/Reducer";
import { DataReducer, DataReducerState } from "./Data/Reducer";

export type ReduxStoreT = {
  sourceManagement: SourceManagementStateT;
  plans: PlansReducerState;
  data: DataReducerState;
};

const store = combineReducers({
  sourceManagement: SourceManagementReducer,
  plans: PlansReducer,
  data: DataReducer,
});

export const ReduxStore = createStore(store);
