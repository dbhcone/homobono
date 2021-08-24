import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  contactusForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.contactusForm = fb.group({
      message: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(255),
        ]),
      ],
      fullname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ]),
      ],
      subject: [
        '',
        Validators.compose([Validators.minLength(5), Validators.maxLength(15)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit(): void {}

  
  public get email() : AbstractControl | null {
    return this.contactusForm.get('email');
  }

  public get fullname() : AbstractControl | null {
    return this.contactusForm.get('fullname');
  }

  public get message() : AbstractControl | null {
    return this.contactusForm.get('message');
  }

  public get subject() : AbstractControl | null {
    return this.contactusForm.get('subject');
  }

  onSubmit() {
    console.log('Submitting the form to contact us.');
  }
  
}
