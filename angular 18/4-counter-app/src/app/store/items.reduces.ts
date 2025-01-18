import { createReducer, on } from "@ngrx/store";
import { increment, decrement, reset } from "./items.action";


export const initialState = 0; // always in a reducer initialize the state

export const counterReducer = createReducer(
    initialState,
    on(increment, (state) => state + 1),
    on(decrement, (state) => state - 1),
    on(reset, (state) => 0)
);