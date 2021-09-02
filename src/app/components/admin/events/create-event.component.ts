import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';

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

  HEADING = 'CREATE A NEW EVENT';

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
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
     if (this.data) {
       this.HEADING = 'EDIT EVENT DETAILS';
     }
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
    const formData = new FormData();
    const formValue = this.createEventForm.value;
    console.log('We are about submitting the form', formValue);
    const { flyer, ...eventdata } = formValue;
    formData.append('flyer', flyer);
    formData.append('eventData', JSON.stringify({ ...eventdata }));

    console.log('flyer', flyer);
    console.log('eventdata', eventdata);

    console.log('Form data being sent is ', formData.getAll('eventData'));
    this.eventService.createEvent(formData).subscribe(
      async (resp: any) => {
        Swal.fire({
          icon: 'success',
          titleText: resp.message,
        }).then(() => {
          this.closeDialog();
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

  onFileSelected(event: any) {
    this.flyerFile = <File>event.target.files[0];
    this.previewImage();
    this.createEventForm.patchValue({
      flyer: this.flyerFile,
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
