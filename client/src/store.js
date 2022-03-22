import { createStore } from "redux";
import { userReducer } from "./features/reducer";

export const store=createStore(userReducer)