import { Product } from '../models/product';
import { createAction, props } from "@ngrx/store";

export const loadProducts = createAction('[Products] Load Products', props<{ products: Product[] }>());
