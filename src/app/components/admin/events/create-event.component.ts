import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  createEventForm;
  flyerFile: File | undefined;
  flyerSrc: string | undefined;

  photoFiles: File[] | undefined;
  photoSrcs: string[] | undefined;

  constructor(private fb: FormBuilder) {
    this.createEventForm = fb.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
      ],
      date: ['', Validators.required],
      time: ['', Validators.required],
      speaker: [null, Validators.required],
      venue: [null, Validators.required],
      flyer: [null, Validators.required],
      extraDetails: [null],
      description: [
        null,
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      photos: [null],
    });
  }

  ngOnInit(): void {}

  public get title(): AbstractControl | null {
    return this.createEventForm.get('title');
  }

  public get date(): AbstractControl | null {
    return this.createEventForm.get('date');
  }

  public get time(): AbstractControl | null {
    return this.createEventForm.get('time');
  }

  public get speaker(): AbstractControl | null {
    return this.createEventForm.get('speaker');
  }

  public get venue(): AbstractControl | null {
    return this.createEventForm.get('venue');
  }

  public get flyer(): AbstractControl | null {
    return this.createEventForm.get('flyer');
  }

  public get description(): AbstractControl | null {
    return this.createEventForm.get('description');
  }

  public get photos(): AbstractControl | null {
    return this.createEventForm.get('photos');
  }

  public get extraDetails(): AbstractControl | null {
    return this.createEventForm.get('extraDetails');
  }

  onSubmit() {
    console.log('We are about submitting the form', this.createEventForm.value);
  }

  onFileSelected(event: any) {
    this.flyerFile = <File>event.target.files[0];
    this.previewImage();
    this.createEventForm.patchValue({
      photo: this.flyerFile,
    });
    this.createEventForm.get('flyer')?.updateValueAndValidity();
  }

  private previewImage() {
    const reader = new FileReader();
    if (this.flyerFile) {
      reader.readAsDataURL(this.flyerFile);
      reader.onload = () => {
        this.flyerSrc = reader.result as string;
      };
    }
  }

  onMultipleFilesSelected(event: any) {
    this.flyerFile = <File>event.target.files[0];
    this.previewMultipleImages();
    this.createEventForm.patchValue({
      photos: this.photoFiles,
    });
    this.createEventForm.get('flyer')?.updateValueAndValidity();
  }

  private previewMultipleImages() {
    const reader = new FileReader();
    if (this.flyerFile) {
      reader.readAsDataURL(this.flyerFile);
      reader.onload = () => {
        this.flyerSrc = reader.result as string;
      };
    }
  }
}
