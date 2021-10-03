import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { logoutUser, setUserData } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/app.state';
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
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      isAdmin: [false],
    });
    this.store.dispatch(logoutUser());
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const { username, password, isAdmin } = this.loginForm.value;
    console.log(
      'You are about to submit the form',
      username,
      password,
      isAdmin
    );
    this.auth?.login({ username, password, isAdmin })?.subscribe(
      async (resp: any) => {
        console.log('login', resp);
        Swal.fire({ text: resp.message, icon: 'success', timer: 5000 }).then(
          async (res) => {
            let set = await this.auth.setToken(resp.token);
            console.log('after set', set);
            const usersession = this.auth.session();
            const {username, email, role, id} = usersession;
            this.store.dispatch(setUserData({user: {username, email,role, id}}))
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
