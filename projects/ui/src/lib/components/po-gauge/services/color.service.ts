import { Injectable } from '@angular/core';

import { PoChartColors } from '../../po-chart/helpers/po-chart-colors.constant';
import { PoColorPaletteEnum } from '../../../enums/po-color-palette.enum';
import { PoGaugeRanges } from '../interfaces/po-gauge-ranges.interface';

const poGaugeColors = (<any>Object).values(PoColorPaletteEnum);

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  defaultColors: Array<string> = [];

  /**
   * Avalia a propriedade `color` em `ranges`. Caso sim, trata se é decimal ou string `po-color`. Caso não haja, retorna a cor default.
   * @param ranges
   */
  getColors(ranges: Array<PoGaugeRanges>): Array<PoGaugeRanges> {
    this.verifyIfHasColorProperty(ranges);

    return ranges.map((range: PoGaugeRanges, index) => {
      if (range.color) {
        range.color = this.verifyColor(range.color);

        return range;
      }

      const color = this.defaultColors[index];
      return { ...range, color };
    });
  }

  private getDefaultColors(length: number): Array<string> {
    if (length === 1) {
      return PoChartColors[0];
    }

    const colorsLength = PoChartColors.length;

    if (length > colorsLength) {
      const quantityDuplicates = length / colorsLength;
      let colors = PoChartColors[colorsLength];

      for (let i = 1; i <= quantityDuplicates; i++) {
        colors = colors.concat(PoChartColors[colorsLength]);
      }

      return colors;
    }

    return PoChartColors[length];
  }

  private verifyColor(color: PoGaugeRanges['color']) {
    if (poGaugeColors.includes(color)) {
      return `po-${color}`;
    }

    return color.startsWith('#') ? color : `#${color}`;
  }

  private verifyIfHasColorProperty(ranges: Array<PoGaugeRanges>): void {
    const hasColorProperty = ranges.every(range => range.hasOwnProperty('color'));

    if (!hasColorProperty) {
      this.defaultColors = this.getDefaultColors(ranges.length);
    }
  }
}
