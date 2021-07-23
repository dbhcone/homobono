import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      account: this.fb.group({
        lastName: ["", [Validators.required]],
        firstName: ["", [Validators.required]],
        otherNames: [""],
        gender: ["", [Validators.required]],
        mobileNumber: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
      }),
      user: this.fb.group({
        email: ["", [Validators.email, Validators.required]],
        username: ["", [Validators.required, Validators.minLength(8)]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
      })
    })
   }

   get email() {
     return this.signupForm.get(['user', 'email']);
   }
   get username() {
    return this.signupForm.get(['user', 'username']);
  }
  get password() {
    return this.signupForm.get(['user', 'password']);
  }

  get confirmPassword() {
    return this.signupForm.get(['user', 'confirmPassword']);
  }

  get lastName() {
    return this.signupForm.get(['account', 'lastName']);
  }

  get firstName() {
    return this.signupForm.get(['account', 'firstName']);
  }

  get mobileNumber() {
    return this.signupForm.get(['account', 'mobileNumber']);
  }

  get gender() {
    return this.signupForm.get(['account', 'gender']);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("You are submitting this form with the following values", this.signupForm.value)
  }

}
