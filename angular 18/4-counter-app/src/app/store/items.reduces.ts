import { createReducer, on } from "@ngrx/store";
import { increment, decrement, reset } from "./items.action";


export const initialState = 0; // always in a reducer initialize the state

export const counterReducer = createReducer(
    initialState,
    on(increment, (state, { value }) => state + value),
    on(decrement, (state) => state - 1),
    on(reset, (state) => 0)
);