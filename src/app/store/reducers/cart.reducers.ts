import { Action, createReducer, on } from "@ngrx/store";
import { addCartItem, increaseQuantity } from "../actions/cart.actions";

let shoppingCart = localStorage.getItem('HomoBonoShoppingCart');
let init = {items: [{}], taxRate: 0, shipping: 0};
if (shoppingCart) {
    const obj = JSON.parse(shoppingCart);
    init = {items: <[]>obj.items, taxRate: obj.taxRate, shipping: obj.shipping}
}

const initialState = init;

const reducer = createReducer(
    initialState,
    on(addCartItem, (state, action) => {
        console.log('state', state);
        console.log('action', action);
        return {...state, items: [...state.items, action.cart]}
    }),
    on(increaseQuantity, (state, action) => {
        console.log('state', state);
        console.log('action', action);

        let items = [...state.items];
        const itemToUpdate: any = items.find((it: any) => it.id == action.itemid);
        if (itemToUpdate) {
            itemToUpdate.quantity = action.quantity;
        }
        return {...state, items}
    })
 );

export function cartReducer (state: {items: any[], taxRate: number, shipping: number} | undefined, action: Action) {
    return reducer(state, action);
}