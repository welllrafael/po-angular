import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoGaugeContainerComponent } from './po-gauge-container.component';

describe('PoGaugeContainerComponent', () => {
  let component: PoGaugeContainerComponent;
  let fixture: ComponentFixture<PoGaugeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoGaugeContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoGaugeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
