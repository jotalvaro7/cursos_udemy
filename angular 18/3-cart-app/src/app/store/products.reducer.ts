import { createReducer, on } from "@ngrx/store"
import { loadProducts } from "./products.actions"
import { Product } from "../models/product"

export interface ProductsState {
    products: Product[]
}

const initialState: ProductsState = {
    products: []
}

export const productsReducer = createReducer(
    initialState,
    on(loadProducts, (state, { products }) => ({ ...state, products })),
)