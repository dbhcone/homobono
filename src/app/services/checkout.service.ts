import { Injectable } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import Swal from 'sweetalert2';
import { Events } from '../api/endpoints';
import { TicketItem } from '../cart/ticket-item';
import { Ticket } from '../models/ticket.interface';
import { Client } from '../utils/client';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private cart: CartService<TicketItem>, private client: Client) {}

  alreadyInCart(ticketId: string) {
    const item = this.cart.getItems().find((item) => {
      item.id == ticketId;
    });
    return item ? true : false;
  }

  getTicket(ticketId: string) {
    return this.client.GET(`${Events.getPrice}/${ticketId}`);
  }

  addToCart(ticketId: string) {
    if (this.alreadyInCart(ticketId)) {
      Swal.fire({
        title: 'Item already in cart',
        icon: 'error',
        toast: true,
        timer: 3000,
      });
      return;
    }
    this.getTicket(ticketId).subscribe(
      async (res: any) => {
        console.log('res to add', res)
        const data = res.data;
        const {_id, event, pricing} = data;
        let ticketItem = new TicketItem({
          id: _id,
          name: `${pricing.name} - ${event.title}`,
          // image: '',
          quantity: 1,
          price: pricing.amount
        });
        this.cart.addItem(ticketItem);
        Swal.fire({
          title: 'Item added to cart',
          toast: true,
          timer: 4000,
        });
      },
      (err: any) => {
        Swal.fire({
          title: err.error.message,
          toast: true,
          timer: 4000,
        });
      }
    );
  }

  increaseQuantity(ticketItem: TicketItem) {
    ticketItem.quantity += 1;
  }

  decreaseQuantity(ticketItem: TicketItem) {
    ticketItem.quantity -= 1;
  }
}
