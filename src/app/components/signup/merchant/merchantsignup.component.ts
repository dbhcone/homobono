import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-merchantsignup',
  templateUrl: './merchantsignup.component.html',
  styleUrls: ['./merchantsignup.component.scss'],
})
export class MerchantSignupComponent implements OnInit {
  submitting = false;
  merchantsignupForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.merchantsignupForm = this.fb.group({
      
    
        email: [null, [Validators.email, Validators.required]],
        username: [null, [Validators.required, Validators.minLength(8)]],
        mobileNumber: [null, [Validators.required, Validators.minLength(10)]],
        password: [null, [Validators.required, Validators.minLength(8)]],
      
    });
  }

  get username() {
    return this.merchantsignupForm.get(['user', 'username']);
  }
  get password() {
    return this.merchantsignupForm.get(['user', 'password']);
  }

  get confirmPassword() {
    return this.merchantsignupForm.get(['user', 'confirmPassword']);
  }

  get email() {
    return this.merchantsignupForm.get(['account', 'email']);
  }
  get surname() {
    return this.merchantsignupForm.get(['account', 'surname']);
  }

  get firstName() {
    return this.merchantsignupForm.get(['account', 'firstName']);
  }

  get primaryMobileNumber() {
    return this.merchantsignupForm.get(['account', 'primaryMobileNumber']);
  }

  get gender() {
    return this.merchantsignupForm.get(['account', 'gender']);
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitting = true;
    const merchantData = this.merchantsignupForm?.value;

    this.auth.merchantSignup(merchantData)?.subscribe(
      async (resp: any) => {
        console.log('merchantsignup', resp);
        Swal.fire({ text: resp.message, icon: 'success', timer: 5000 }).then(
          (result: SweetAlertResult<any>) => {
            //
            this.router.navigate(['login']);
          }
        );
      },
      (err) => {
        this.submitting = false;
        Swal.fire({
          title: `${err.error.status} - ${err.error.code}`,
          text: `${err.error.message}`,
        });
      }
    );
  }
}
