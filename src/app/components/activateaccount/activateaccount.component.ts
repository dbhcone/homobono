import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-activateaccount',
  templateUrl: './activateaccount.component.html',
  styleUrls: ['./activateaccount.component.scss'],
})
export class ActivateaccountComponent implements OnInit {
  activateAccountForm;
  constructor(private fb: FormBuilder) {
    this.activateAccountForm = fb.group({
      pin: ['', Validators.compose([Validators.required, Validators.min(0)])],
    });
  }

  ngOnInit(): void {}

  get pin(): AbstractControl | null {
    return this.activateAccountForm.get('pin');
  }

  onSubmit() {
    console.log('We are submitting form');
  }
}
