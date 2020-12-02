import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartGaugeBackgroundComponent } from './po-chart-gauge-background.component';

describe('PoChartGaugeBackgroundComponent', () => {
  let component: PoChartGaugeBackgroundComponent;
  let fixture: ComponentFixture<PoChartGaugeBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartGaugeBackgroundComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartGaugeBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
