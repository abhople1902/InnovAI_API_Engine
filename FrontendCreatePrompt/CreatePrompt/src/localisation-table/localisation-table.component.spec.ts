import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalisationTableComponent } from './localisation-table.component';

describe('LocalisationTableComponent', () => {
  let component: LocalisationTableComponent;
  let fixture: ComponentFixture<LocalisationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalisationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalisationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
