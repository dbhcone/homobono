import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import { Subscription } from 'rxjs';
import { TicketItem } from 'src/app/cart/ticket-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems: TicketItem[] = [];
  subscription!: Subscription;
  constructor(private cart: CartService<TicketItem>) {
    this.subscription = this.cart.onItemsChanged.subscribe((item) => {
      // if (item.change == 'items') {
        console.log('cart items changed', item)
        this.displayCartItems();
      // }
    })
  }

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  ngOnInit(): void {
    this.displayCartItems();
  }

  displayCartItems() {
    this.cartItems = this.cart.getItems();
  }

  displayCartTotal() {
    return this.cart.totalCost();
  }

  increment(ticketItem: TicketItem) {
    const items = this.cart.getItems();
    const index = items.findIndex((itm) => {itm.id === ticketItem.id});
    ticketItem.quantity += 1;
    this.cartItems.splice(index, 1, ticketItem);
    console.log('to increase');
  }

  decrement(ticketItem: TicketItem) {
    const items = this.cart.getItems();
    const index = items.findIndex((itm) => {itm.id === ticketItem.id});
    ticketItem.quantity -= 1;
    this.cartItems.splice(index, 1, ticketItem);
    console.log('to decrease');
  }

  remove(ticketItem: TicketItem) {
    this.cart.removeItem(ticketItem.id);
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
