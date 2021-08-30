import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.signupForm = this.fb.group({
      account: this.fb.group({
        surname: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        otherNames: [''],
        gender: ['', [Validators.required]],
        primaryMobileNumber: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10),
          ],
        ],
      }),
      user: this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        username: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      }),
    });
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

  get email() {
    return this.signupForm.get(['account', 'email']);
  }
  get surname() {
    return this.signupForm.get(['account', 'surname']);
  }

  get firstName() {
    return this.signupForm.get(['account', 'firstName']);
  }

  get primaryMobileNumber() {
    return this.signupForm.get(['account', 'primaryMobileNumber']);
  }

  get gender() {
    return this.signupForm.get(['account', 'gender']);
  }

  ngOnInit(): void {}

  onSubmit() {
    const userdata = this.signupForm.get('user')?.value;
    const { confirmPassword, ...user } = userdata;
    const account = this.signupForm.get('account')?.value;

    this.auth.signup(user, account).subscribe(
      async (resp: any) => {
        console.log('signup', resp);
        Swal.fire({ text: resp.message, icon: 'success', timer: 5000 });
      },
      (err) => {
        Swal.fire({
          title: `${err.error.status} - ${err.error.code}`,
          text: `${err.error.message}`,
        });
      }
    );
  }
}
