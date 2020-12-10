import { Component } from '@angular/core';

import { PoGaugeBaseComponent } from './po-gauge-base.component';
import { PoGaugeColorService } from './services/po-gauge-color.service';

@Component({
  selector: 'po-gauge',
  templateUrl: './po-gauge.component.html'
})
export class PoGaugeComponent extends PoGaugeBaseComponent {
  constructor(protected colorService: PoGaugeColorService) {
    super(colorService);
  }

  get hasRanges(): boolean {
    return this.ranges.length > 0;
  }
}
