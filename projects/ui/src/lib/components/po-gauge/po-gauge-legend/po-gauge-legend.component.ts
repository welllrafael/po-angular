import { Component, Input } from '@angular/core';

import { PoGaugeRanges } from '../interfaces/po-gauge-ranges.interface';

@Component({
  selector: 'po-gauge-legend',
  templateUrl: './po-gauge-legend.component.html'
})
export class PoGaugeLegendComponent {
  private _ranges: Array<PoGaugeRanges> = [];

  colors: Array<string> = [];

  @Input('p-ranges') set ranges(value: Array<PoGaugeRanges>) {
    this._ranges = value;
  }

  get ranges() {
    return this._ranges;
  }

  constructor() {}
}
