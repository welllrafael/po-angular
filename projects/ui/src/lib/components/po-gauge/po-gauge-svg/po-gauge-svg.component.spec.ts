import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoGaugeColors } from '../po-gauge-colors.constant';

import { PoGaugeModule } from '../po-gauge.module';

import { poGaugeStartAngle, PoGaugeSvgComponent } from './po-gauge-svg.component';

describe('PoGaugeSvgComponent', () => {
  let component: PoGaugeSvgComponent;
  let fixture: ComponentFixture<PoGaugeSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoGaugeModule],
      declarations: [PoGaugeSvgComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoGaugeSvgComponent);
    component = fixture.componentInstance;
    component.ranges = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Methods:', () => {
    it('ngAfterViewInit: should call `setCoordinates`, `detectChanges` and set with true `afterViewInit`', () => {
      const spySetCoordinates = spyOn(component, <any>'setCoordinates');
      const spyDetectChanges = spyOn(component['changeDetector'], <any>'detectChanges');

      component.ngAfterViewInit();

      expect(component['afterViewInit']).toBeTruthy();
      expect(spySetCoordinates).toHaveBeenCalledWith(component.value, component.ranges);
      expect(spyDetectChanges).toHaveBeenCalledWith();
    });

    it('ngOnChanges: shouldn`t call `setCoordinates` if `afterViewInit` if false', () => {
      const changes = { ranges: new SimpleChange(null, component.ranges, true) };
      const spySetCoordinates = spyOn(component, <any>'setCoordinates');
      component['afterViewInit'] = false;

      component.ngOnChanges(changes);

      expect(spySetCoordinates).not.toHaveBeenCalled();
    });

    it('ngOnChanges: should call `setCoordinates` if  `afterViewInit` is true and `ranges` has been changed', () => {
      const changes = { ranges: new SimpleChange(null, component.ranges, true) };
      const spySetCoordinates = spyOn(component, <any>'setCoordinates');
      component.ranges = [{ from: 0, to: 100 }];
      component['afterViewInit'] = true;

      component.ngOnChanges(changes);

      expect(spySetCoordinates).toHaveBeenCalled();
    });

    it('ngOnChanges: should call `setCoordinates` if  `afterViewInit` is true and `value` has been changed', () => {
      const changes = { value: new SimpleChange(null, component.value, true) };
      const spySetCoordinates = spyOn(component, <any>'setCoordinates');
      component.value = 20;
      component['afterViewInit'] = true;

      component.ngOnChanges(changes);

      expect(spySetCoordinates).toHaveBeenCalled();
    });

    it('setCoordinates: should call `containerMeasurements`, `spySetBaseCoordinates` and `setSingleRangeCoordinates` if ranges doesn`t have length', () => {
      const spyContainerMeasurements = spyOn(component, <any>'containerMeasurements').and.callThrough();
      const spySetBaseCoordinates = spyOn(component, <any>'setBaseCoordinates');
      const spySetSingleRangeCoordinates = spyOn(component, <any>'setSingleRangeCoordinates');
      const spySetRangesCoordinates = spyOn(component, <any>'setRangesCoordinates');

      component['setCoordinates'](component.value, component.ranges);

      expect(spyContainerMeasurements).toHaveBeenCalledWith();
      expect(spySetBaseCoordinates).toHaveBeenCalledWith(component.container.height);
      expect(spySetSingleRangeCoordinates).toHaveBeenCalledWith(component.container.height, component.value);
      expect(spySetRangesCoordinates).not.toHaveBeenCalled();
    });

    it('setCoordinates: should call `containerMeasurements`, `spySetBaseCoordinates` and `setRangesCoordinates` if ranges has length', () => {
      const spyContainerMeasurements = spyOn(component, <any>'containerMeasurements').and.callThrough();
      const spySetBaseCoordinates = spyOn(component, <any>'setBaseCoordinates');
      const spySetSingleRangeCoordinates = spyOn(component, <any>'setSingleRangeCoordinates');
      const spySetRangesCoordinates = spyOn(component, <any>'setRangesCoordinates');
      component.ranges = [{ from: 0, to: 100 }];

      component['setCoordinates'](component.value, component.ranges);

      expect(spyContainerMeasurements).toHaveBeenCalledWith();
      expect(spySetBaseCoordinates).toHaveBeenCalledWith(component.container.height);
      expect(spySetRangesCoordinates).toHaveBeenCalledWith(component.container.height, component.ranges);
      expect(spySetSingleRangeCoordinates).not.toHaveBeenCalled();
    });

    it('setBaseCoordinates: should call `calculateCoordinates` and apply value to `baseCoordinates`', () => {
      const expectedResult = {
        coordinates: 'M 0 188 A 188 188 0 0,1 376 188 A 1 1 0 0,1 360 188 A 172 172 0 0,0 16 188 A 1 1 0 0,1 0 188 Z'
      };

      const spyCalculateCoordinates = spyOn(component, <any>'calculateCoordinates').and.callThrough();

      component['setBaseCoordinates'](200);

      expect(spyCalculateCoordinates).toHaveBeenCalledWith(200, poGaugeStartAngle, 0);
      expect(component.baseCoordinates).toEqual(expectedResult);
    });

    describe('setRangesCoordinates:', () => {
      it('should call `calculateAngleRadius` twice and `calculateMinAndMaxValues`', () => {
        component.ranges = [{ from: 0, to: 100 }];

        const spyCalculateMinAndMaxValues = spyOn(component, <any>'calculateMinAndMaxValues').and.callThrough();
        const spyCalculateAngleRadius = spyOn(component, <any>'calculateAngleRadius');

        component['setRangesCoordinates'](200, component.ranges);

        expect(spyCalculateMinAndMaxValues).toHaveBeenCalledWith(component.ranges);
        expect(spyCalculateAngleRadius).toHaveBeenCalledTimes(2);
      });

      it('should call `calculateAngleRadius` passing `2` and `99` as parameters', () => {
        component.ranges = [{ from: 2, to: 99 }];

        const spyCalculateAngleRadius = spyOn(component, <any>'calculateAngleRadius');

        component['setRangesCoordinates'](200, component.ranges);

        expect(spyCalculateAngleRadius).toHaveBeenCalledTimes(2);
        expect(spyCalculateAngleRadius.calls.argsFor(0)).toEqual([2, 99]);
        expect(spyCalculateAngleRadius.calls.argsFor(1)).toEqual([99, 99]);
      });

      it('should call `calculateAngleRadius` passing `0` and `100` if ranges.from and ranges.to are not defined', () => {
        component.ranges = [{ from: undefined, to: undefined }];

        const spyCalculateAngleRadius = spyOn(component, <any>'calculateAngleRadius');

        component['setRangesCoordinates'](200, component.ranges);

        expect(spyCalculateAngleRadius).toHaveBeenCalledTimes(2);
        expect(spyCalculateAngleRadius.calls.argsFor(0)).toEqual([0, 100]);
        expect(spyCalculateAngleRadius.calls.argsFor(1)).toEqual([100, 100]);
      });

      it('should call `calculateAngleRadius` passing `0` and `100` if ranges.from is negative', () => {
        component.ranges = [{ from: -10, to: 100, color: 'red' }];

        const spyCalculateAngleRadius = spyOn(component, <any>'calculateAngleRadius');

        component['setRangesCoordinates'](200, component.ranges);

        expect(spyCalculateAngleRadius).toHaveBeenCalledTimes(2);
        expect(spyCalculateAngleRadius.calls.argsFor(0)).toEqual([0, 100]);
        expect(spyCalculateAngleRadius.calls.argsFor(1)).toEqual([100, 100]);
      });

      it('should apply value to `coordinates`', () => {
        const expectedResult = [
          {
            coordinates:
              'M 0 188 A 188 188 0 0,1 376 188 A 1 1 0 0,1 360 188 A 172 172 0 0,0 16 188 A 1 1 0 0,1 0 188 Z',
            color: 'red'
          }
        ];
        component.ranges = [{ from: 0, to: 100, color: 'red' }];

        component['setRangesCoordinates'](200, component.ranges);

        expect(component.coordinates).toEqual(expectedResult);
      });
    });

    it('setSingleRangeCoordinates: should apply value to `coordinates`', () => {
      const expectedResult = [
        {
          coordinates: 'M 0 188 A 188 188 0 0,1 36 77 A 1 1 0 0,1 49 87 A 172 172 0 0,0 16 188 A 1 1 0 0,1 0 188 Z',
          color: PoGaugeColors[0][0]
        }
      ];
      const value = 20;
      const height = 200;

      component['setSingleRangeCoordinates'](height, value);

      expect(component.coordinates).toEqual(expectedResult);
    });

    it('setViewBox: should apply value to viewBox', () => {
      const expectedResult = '0 -4 376 200';
      component['setViewBox'](200);

      expect(component.viewBox).toBe(expectedResult);
    });
  });
});
