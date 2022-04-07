import {combineReducers} from "redux";
import {graphReducer} from "./graph/graphReducer";
import {authReducer} from "./auth/authReducer";

export const rootReducer = combineReducers({
    authReducer, graphReducer
});