import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";

export const addItem = createAction('[Items] Add Item', props<{ product: Product }>());
export const removeItem = createAction('[Items] Remove Item', props<{ id: number }>());
export const total = createAction('[Items] Total');
