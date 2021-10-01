import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartStore: Observable<{items: [], shipping: number, taxRate: number}>
  userStore: Observable<{user: {username: string, email: string, role: string }}>
  constructor( private store: Store<AppState>) {
    this.cartStore = store.select('cart');
    this.userStore = store.select('userObj');
   }

  ngOnInit(): void {
  }

}
