import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTable,
    MatTableModule
  ],
})
export class CreateDialogComponent {
  createForm: FormGroup;
  file: File | null = null;
  result: any[] = [];
  displayedColumns: string[] = [];
  dataSource: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateDialogComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm = this.fb.group({
      input: ['', Validators.required],
      prompt: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.file = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.file) {
      const prompt = this.createForm.get('prompt')?.value;
      this.processExcel(this.file, prompt).subscribe(
        (response) => {
          this.result = response.result;
          if (this.result.length > 0) {
            this.displayedColumns = Object.keys(this.result[0]);
          }
          console.log('Result:', this.result);
          // Update the data inside the dialog
          this.dialogRef.updateSize('80%', '80%');
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  private baseUrl = 'http://127.0.0.1:5000';
  processExcel(file: File, prompt: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', prompt);
    return this.http.post<any>(`${this.baseUrl}/process_excel`, formData);
    //return this.http.post<any>('http://localhost:5000/process_excel', formData);
  }
}
