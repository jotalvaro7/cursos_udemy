import { Product } from '../models/product';
import { createAction, props } from "@ngrx/store";


export const loadProducts = createAction('[Products] Load Products');
export const findAll = createAction('[Products] Find All', props<{ products: Product[] }>());