import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      isAdmin: [false],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    console.log('You are about to submit the form', username, password);
    this.auth.login({ username, password }).subscribe(
      async (resp: any) => {
        console.log('login', resp);
        Swal.fire({ text: resp.message, icon: 'success', timer: 5000 }).then(
          (res) => {
            this.router.navigate(['events']);
          }
        );
      },
      (err) => {
        Swal.fire({
          title: `${err.error.status.toUpperCase()}`,
          text: `${err.error.message}`,
          icon: 'error',
        });
      }
    );
  }

  ngOnInit(): void {}
}
