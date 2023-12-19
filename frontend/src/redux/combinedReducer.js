import { combineReducers } from "redux";
import { createUserReducer } from "./reducer";
export const reducer = combineReducers({createUser: createUserReducer})