import { Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import { TicketItem } from 'src/app/cart/ticket-item';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount = 0;
  username = null;
  constructor(private auth: AuthService, private cartService: CartService<TicketItem>) {
    // this.username = this.auth.session().username;
    this.cartCount = this.cartService.itemCount();
   }

  ngOnInit(): void {
  }

}
