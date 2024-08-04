import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateDialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { MainBodyComponent } from '../main-body/main-body.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LocalisationTableComponent } from '../localisation-table/localisation-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainBodyComponent, SidebarComponent, CreateDialogComponent, LocalisationTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CreatePrompt';
  jsonOutput: string = '';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.jsonOutput = JSON.stringify(result, null, 2);
      }
    });
  }
}
