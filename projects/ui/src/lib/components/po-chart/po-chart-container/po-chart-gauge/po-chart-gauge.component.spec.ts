import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartGaugeComponent } from './po-chart-gauge.component';

describe('PoChartGaugeComponent', () => {
  let component: PoChartGaugeComponent;
  let fixture: ComponentFixture<PoChartGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartGaugeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
