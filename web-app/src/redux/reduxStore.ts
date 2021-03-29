import { createStore, combineReducers } from "redux";
import {
  SourceManagementReducer,
  SourceManagementStateT,
} from "./SourceManagement/Reducer";

import { PlansReducer, PlansReducerState } from "./Plans/Reducer";

export type ReduxStoreT = {
  sourceManagement: SourceManagementStateT;
  plans: PlansReducerState;
};

const store = combineReducers({
  sourceManagement: SourceManagementReducer,
  plans: PlansReducer,
});

export const ReduxStore = createStore(store);
