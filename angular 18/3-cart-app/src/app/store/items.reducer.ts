import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cart";
import { addItem, removeItem, total } from "./items.actions";


export interface ItemsState {
    items: CartItem[];
    total: number;
}

export const initialState: ItemsState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
    total: 0
}

export const itemsReducer = createReducer(
    initialState,
    on(addItem, (state, { product }) => {
        const hasItem = state.items.find((item) => item.product.id === product.id);
        if (hasItem) {
            return {
                items: state.items.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item),
                total: calculateTotal(state.items)
            }
        } else {
            return {
                items: [...state.items, { product: { ...product }, quantity: 1 }],
                total: calculateTotal(state.items)
            }
        }
    }),
    on(removeItem, (state, { id }) => {
        const updatedItems = state.items.filter((item) => item.product.id !== id);
        return {
            items: updatedItems,
            total: calculateTotal(updatedItems)
        }
    }),
    on(total, state => {
        return {
            items: state.items,
            total: calculateTotal(state.items)
        }
    })
);

function calculateTotal(items: CartItem[]): number {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
}



