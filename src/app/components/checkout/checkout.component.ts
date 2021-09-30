import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  paymentForm!: FormGroup;

  cartStore: Observable<{items: [], shipping: number, taxRate: number}>

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.paymentForm = this.fb.group({
      paymentType: [null],
      mobileNumber: [null],
      email: [null, Validators.compose([Validators.email])]
    });
    this.cartStore = store.select('cart');
  }

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onPaymentTypeChanged(event: MatRadioChange) {
    console.log('radio change', event);
  }

  
  public get paymentType() : AbstractControl | null {
    return this.paymentForm.get('paymentType');
  }

  public get mobileNumber() : AbstractControl | null {
    return this.paymentForm.get('mobileNumber');
  }

  public get email() : AbstractControl | null {
    return this.paymentForm.get('email');
  }

  onSubmit() {
    console.log('form being submitted', this.paymentForm.value);
  }
  
}
