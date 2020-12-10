import { Component, Input } from '@angular/core';

import { PoGaugeRanges } from '../interfaces/po-gauge-ranges.interface';

@Component({
  selector: 'po-gauge-legend',
  templateUrl: './po-gauge-legend.component.html'
})
export class PoGaugeLegendComponent {
  private _ranges: Array<PoGaugeRanges>;

  colors: Array<string> = [];

  @Input('p-ranges') set ranges(value: Array<PoGaugeRanges>) {
    if (value.length) {
      this._ranges = this.filterLabel(value);
    }
  }

  get ranges() {
    return this._ranges;
  }

  constructor() {}

  trackBy(index) {
    return index;
  }

  private filterLabel(ranges: Array<PoGaugeRanges>) {
    return ranges.filter(range => range.label);
  }
}
