import { Component } from '@angular/core';
import { MainBodyComponent } from '../main-body/main-body.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CreateDialogComponent } from '../dialog/dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'atharva-header',
  standalone: true,
  imports: [MainBodyComponent, SidebarComponent,MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule],
  templateUrl: './atharva-header.component.html',
  styleUrls: ['./atharva-header.component.css']
})
export class AtharvaHeaderComponent {
  selectedPlatform = 'CWP +5';
  languageCount = 8;
  searchQuery = '';
}