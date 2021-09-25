import { createAction, props } from '@ngrx/store';

const addCartItem = createAction(
  'Add [Cart Items]',
  props<{
    cart: {
      id: string;
      eventId: string;
      price: number;
      name: string;
      quantity: number;
    };
  }>()
);

const increaseQuantity = createAction(
  'Increment [Cart Quantity]',
  props<{
    itemid: string;
    quantity: number;
  }>()
);

export { addCartItem, increaseQuantity };
