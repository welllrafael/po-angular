import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoGaugeLegendComponent } from './po-gauge-legend.component';

describe('PoGaugeLegendComponent', () => {
  let component: PoGaugeLegendComponent;
  let fixture: ComponentFixture<PoGaugeLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoGaugeLegendComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoGaugeLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
