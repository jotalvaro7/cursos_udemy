import { createReducer, on } from "@ngrx/store"
import { findAll, loadProducts } from "./products.actions"
import { Product } from "../models/product"

export interface ProductsState {
    products: Product[]
}

const initialState: ProductsState = {
    products: []
}

export const productsReducer = createReducer(
    initialState,
    on(loadProducts, (state) => ({ products: [...state.products] })),
    on(findAll, (state, { products }) => ({ ...state, products })),
)