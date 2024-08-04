import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../dialog/dialog.component';

export interface LocalisationData {
  languages: string;
  products: string;
  productType: string;
  stringsTranslated: string;
  lastModifiedOn: string;
  lastModifiedBy: string;
  actions: string;
}

const ELEMENT_DATA: LocalisationData[] = [
  {languages: 'English', products: 'mWorkOrder', productType: 'Mobile', stringsTranslated: '344/344', lastModifiedOn: '17 days ago', lastModifiedBy: '--', actions: ''},
  {languages: 'English', products: 'mAssetTag', productType: 'Mobile', stringsTranslated: '0/416', lastModifiedOn: 'A month ago', lastModifiedBy: '--', actions: ''},
  {languages: 'English', products: 'mInventory', productType: 'Mobile', stringsTranslated: '380/380', lastModifiedOn: '16 days ago', lastModifiedBy: '--', actions: ''},
  {languages: 'English', products: 'CWP', productType: 'Web', stringsTranslated: '412/412', lastModifiedOn: '17 days ago', lastModifiedBy: '--', actions: ''},
  {languages: 'Chinese Mandarin (Beijing)', products: 'mInventory', productType: 'Mobile', stringsTranslated: '1/380', lastModifiedOn: 'Just now', lastModifiedBy: '--', actions: ''},
  {languages: 'Arabic (Egyptian)', products: 'mInspections', productType: 'Mobile', stringsTranslated: '422/422', lastModifiedOn: '17 days ago', lastModifiedBy: '--', actions: ''},
  {languages: 'German (Austria)', products: 'mWorkOrder', productType: 'Mobile', stringsTranslated: '344/344', lastModifiedOn: '17 days ago', lastModifiedBy: '--', actions: ''},
  {languages: 'Korean (Gyeongsang)', products: 'mWorkOrder', productType: 'Mobile', stringsTranslated: '3/344', lastModifiedOn: '17 days ago', lastModifiedBy: '--', actions: ''},
  {languages: 'Hindi', products: 'mAssetTag', productType: 'Mobile', stringsTranslated: '31/416', lastModifiedOn: '16 days ago', lastModifiedBy: '--', actions: ''},
  {languages: 'Afrikaans', products: 'mAssetTag', productType: 'Mobile', stringsTranslated: '0/416', lastModifiedOn: 'Yesterday', lastModifiedBy: '--', actions: ''},
  {languages: 'Afrikaans', products: 'mRounds', productType: 'Mobile', stringsTranslated: '0/422', lastModifiedOn: '17 days ago', lastModifiedBy: '--', actions: ''}
];

@Component({
  selector: 'app-localisation-table',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatTableModule, MatMenuModule, CreateDialogComponent],
  templateUrl: './localisation-table.component.html',
  styleUrl: './localisation-table.component.css'
})

export class LocalisationTableComponent {
  displayedColumns: string[] = ['languages', 'products', 'productType', 'stringsTranslated', 'lastModifiedOn', 'lastModifiedBy', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  constructor(public dialog: MatDialog) {}

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Dialog result:', result);
        // Handle the result as needed
      }
    });
  }
}

