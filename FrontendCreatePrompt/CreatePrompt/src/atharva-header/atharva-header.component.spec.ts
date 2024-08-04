import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtharvaHeaderComponent } from './atharva-header.component';

describe('AtharvaHeaderComponent', () => {
  let component: AtharvaHeaderComponent;
  let fixture: ComponentFixture<AtharvaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtharvaHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtharvaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
