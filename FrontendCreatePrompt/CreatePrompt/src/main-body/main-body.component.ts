import { Component } from '@angular/core';
import { LocalisationTableComponent } from '../localisation-table/localisation-table.component';

@Component({
  selector: 'app-main-body',
  standalone: true,
  imports: [LocalisationTableComponent],
  templateUrl: './main-body.component.html',
  styleUrl: './main-body.component.css'
})
export class MainBodyComponent {

}
