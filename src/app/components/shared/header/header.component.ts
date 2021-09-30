import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartService } from 'ng-shopping-cart';
import { Observable } from 'rxjs';
import { TicketItem } from 'src/app/cart/ticket-item';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username = null;
  cartStore: Observable<{items: [], shipping: number, taxRate: number}>
  userStore: Observable<{username: string}>
  constructor(private auth: AuthService, private cartService: CartService<TicketItem>, private store: Store<AppState>) {
    // this.username = this.auth.session().username;
    // this.cartCount = this.cartService.itemCount();
    this.cartStore = store.select('cart'); //store.select("obj");
    this.userStore = store.select('user');
   }

  ngOnInit(): void {
  }

}
