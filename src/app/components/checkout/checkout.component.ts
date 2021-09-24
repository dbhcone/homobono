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
    this.subscription = this.cart.onChange.subscribe((item) => {
      if (item.change == 'items') {
        console.log('cart items changed')
        this.displayCartItems();
      }
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
    let quantity = ticketItem.getQuantity() + 1;
    ticketItem.quantity = quantity;
    console.log('to increase');
  }

  decrement(ticketItem: TicketItem) {
    let quantity = ticketItem.getQuantity() - 1;
    ticketItem.quantity = quantity;
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
