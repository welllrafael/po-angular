import { Directive } from '@angular/core';

import { expectPropertiesValues } from './../../util-test/util-expect.spec';
import { poGaugeMinHeight } from './po-gauge-default-values.constant';

import { PoGaugeBaseComponent } from './po-gauge-base.component';
import { PoGaugeColorService } from './services/po-gauge-color.service';

@Directive()
class PoGaugeComponent extends PoGaugeBaseComponent {}

describe('PoGaugeBaseComponent:', () => {
  let colorService: PoGaugeColorService;

  let component: PoGaugeComponent;

  beforeEach(() => {
    colorService = new PoGaugeColorService();

    component = new PoGaugeComponent(colorService);
  });

  it('should be create', () => {
    expect(component instanceof PoGaugeBaseComponent).toBeTruthy();
  });

  describe('Methods:', () => {
    it('setGaugeHeight: should return `poGaugeMinHeight` if height is null', () => {
      const height = null;

      expect(component['setGaugeHeight'](height)).toBe(poGaugeMinHeight);
    });

    it('setGaugeHeight: should return `poGaugeMinHeight` if height is lower than 200', () => {
      const height = 100;

      expect(component['setGaugeHeight'](height)).toBe(poGaugeMinHeight);
    });

    it('setGaugeHeight: should return the value of height', () => {
      const height = 300;

      expect(component['setGaugeHeight'](height)).toBe(height);
    });
  });

  describe('Properties:', () => {
    it('p-height: should call `setGaugeHeight`', () => {
      const height = 200;
      const spySetGaugeHeight = spyOn(component, <any>'setGaugeHeight');

      component.height = height;

      expect(spySetGaugeHeight).toHaveBeenCalledWith(height);
    });

    it('p-ranges: should update property with valid values', () => {
      const validValues = [[{ from: 0, to: 100, color: 'red', label: 'description' }], []];
      expectPropertiesValues(component, 'ranges', validValues, validValues);
    });

    it('p-type: shouldn`t update if it receives invalid values.', () => {
      const invalidValues = [false, true, {}, 'invalid', 123, null, undefined];

      expectPropertiesValues(component, 'ranges', invalidValues, []);
    });

    it('p-value: should update property with valid values', () => {
      const values = [1, 200, '1', '200'];
      const validValues = [1, 200, 1, 200];

      expectPropertiesValues(component, 'value', values, validValues);
    });

    it('p-value: shouldn`t update property if it receives invalid values', () => {
      const invalidValues = [{}, [], null, undefined, true, false, 'number'];

      expectPropertiesValues(component, 'value', invalidValues, undefined);
    });
  });
});
