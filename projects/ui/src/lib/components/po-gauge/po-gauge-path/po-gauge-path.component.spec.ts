import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoGaugePathComponent } from './po-gauge-path.component';

describe('PoGaugePathComponent', () => {
  let component: PoGaugePathComponent;
  let fixture: ComponentFixture<PoGaugePathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoGaugePathComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoGaugePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
