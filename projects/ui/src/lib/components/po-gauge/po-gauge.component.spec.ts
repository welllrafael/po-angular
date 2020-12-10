import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoGaugeModule } from './po-gauge.module';
import { PoGaugeBaseComponent } from './po-gauge-base.component';
import { PoGaugeComponent } from './po-gauge.component';

describe('PoGaugeComponent', () => {
  let component: PoGaugeComponent;
  let fixture: ComponentFixture<PoGaugeComponent>;
  let nativeElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoGaugeModule],
      declarations: [PoGaugeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoGaugeComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component instanceof PoGaugeComponent).toBeTruthy();
    expect(component instanceof PoGaugeBaseComponent).toBeTruthy();
  });

  describe('properties:', () => {
    it('hasRanges: should return true if ranges has length', () => {
      component.ranges = [{ from: 0, to: 100, label: 'Aprovado', color: 'green' }];

      expect(component.hasRanges).toBeTruthy();
    });

    it('hasRanges: should return false if ranges does not have length', () => {
      component.ranges = [];

      expect(component.hasRanges).toBeFalsy();
    });
  });

  describe('Template:', () => {
    it('should contain `po-gauge-title` class', () => {
      component.title = 'Title';
      component.value = 50;

      fixture.detectChanges();

      const title = nativeElement.querySelectorAll('.po-gauge-title');

      expect(title).toBeTruthy();
      expect(title.length).toBe(1);
    });

    it('shouldn`t contain `po-gauge-title` class', () => {
      component.value = 50;

      fixture.detectChanges();

      const title = nativeElement.querySelectorAll('.po-gauge-title');

      expect(title).toBeTruthy();
      expect(title.length).toBe(0);
    });
  });
});
