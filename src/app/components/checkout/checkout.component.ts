import { Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import { TicketItem } from 'src/app/cart/ticket-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  items = [];
  constructor(private cart: CartService<TicketItem>) { 
    
  }

  ngOnInit(): void {
  }

  generateItems() {

  }

}

