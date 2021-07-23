import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.loginForm = fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      isAdmin: [false]
    })
  }

  get username () {
    return this.loginForm.get("username");
  }

  get password () {
    return this.loginForm.get("password");
  }

  onSubmit() {
    console.log("You are about to submit the form", this.loginForm.value);
  }

  ngOnInit(): void {
  }

}
