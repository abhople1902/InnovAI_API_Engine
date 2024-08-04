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
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-create-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDialogModule, FormsModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
})
export class CreateDialogComponent {
  createForm: FormGroup;
  file: File | null = null;
  prompt: string = '';
  result: any[] = [];
  displayedColumns: string[] = [];
  dataSource: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateDialogComponent>,
    private http: HttpClient
  ) {
    this.createForm = this.fb.group({
      input: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // onSubmit(): void {
  //   if (this.createForm.valid) {
  //     const formData = {
  //       ...this.createForm.value,
  //       file: this.file
  //     };
  //     this.dialogRef.close(formData);
  //   }
  // }

  onSubmit(): void {
    if (this.file && this.prompt) {
      this.processExcel(this.file, this.prompt).subscribe(
        (response) => {
          this.result = response.result;
          if (this.result.length > 0) {
            this.displayedColumns = Object.keys(this.result[0]);
            this.dataSource = this.result;
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  private baseUrl = 'http://localhost:5000';
  processExcel(file: File, prompt: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', prompt);
    return this.http.post<any>(`${this.baseUrl}/process_excel`, formData);
  }
}
