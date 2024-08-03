import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-dialog',
//   standalone: true,
  // imports: [CommonModule, MatFormFieldModule, MatDialogModule, FormsModule],
//   templateUrl: './dialog.component.html',
//   styleUrl: './dialog.component.css'
// })
// export class DialogComponent {
//   data = {
//     context: '',
//     input: '',
//     outputDesired: ''
//   };

//   constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onDoneClick(): void {
//     this.dialogRef.close(this.data);
//   }
// }




@Component({
  selector: 'app-create-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDialogModule, FormsModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
})
export class CreateDialogComponent {
  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateDialogComponent>
  ) {
    this.createForm = this.fb.group({
      context: ['', Validators.required],
      input: ['', Validators.required],
      outputDesired: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.dialogRef.close(this.createForm.value);
    }
  }
}
