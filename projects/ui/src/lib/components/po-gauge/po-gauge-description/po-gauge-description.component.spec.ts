import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoGaugeDescriptionComponent } from './po-gauge-description.component';

describe('PoGaugeDescriptionComponent', () => {
  let component: PoGaugeDescriptionComponent;
  let fixture: ComponentFixture<PoGaugeDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoGaugeDescriptionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoGaugeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
