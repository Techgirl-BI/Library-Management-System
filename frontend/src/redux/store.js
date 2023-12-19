import {createStore, applyMiddleware} from "redux"
import { composeWithDevTools } from "@redux-devtools/extension"
import {thunk} from "redux-thunk"
import { reducer } from "./combinedReducer"
const middleware = [thunk]

const setMiddleware = process.env.NODE_ENV==="development"?composeWithDevTools(applyMiddleware(...middleware)):applyMiddleware(...middleware)
export const store = createStore(reducer,setMiddleware)