import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  contactusForm: FormGroup;
  constructor(private fb: FormBuilder, private general: GeneralService) {
    this.contactusForm = fb.group({
      message: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(256),
        ]),
      ],
      fullName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ]),
      ],
      subject: [
        null,
        Validators.compose([Validators.minLength(5), Validators.maxLength(15)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit(): void {}

  public get email(): AbstractControl | null {
    return this.contactusForm.get('email');
  }

  public get fullName(): AbstractControl | null {
    return this.contactusForm.get('fullName');
  }

  public get message(): AbstractControl | null {
    return this.contactusForm.get('message');
  }

  public get subject(): AbstractControl | null {
    return this.contactusForm.get('subject');
  }

  onSubmit() {
    this.general.contactUs({ ...this.contactusForm.value }).subscribe(
      async (resp: any) => {
        Swal.fire({
          icon: 'success',
          titleText: resp.message,
          timer: 4000
        }).then((res: SweetAlertResult<any>) => {
          this.contactusForm.reset();
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          titleText: err.error.message,
        });
      }
    );
  }
}
