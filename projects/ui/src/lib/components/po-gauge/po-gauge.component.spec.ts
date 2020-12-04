import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoGaugeComponent } from './po-gauge.component';

describe('PoGaugeComponent', () => {
  let component: PoGaugeComponent;
  let fixture: ComponentFixture<PoGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoGaugeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
