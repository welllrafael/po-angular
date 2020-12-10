import { Component, Input } from '@angular/core';

@Component({
  selector: 'po-gauge-description',
  templateUrl: './po-gauge-description.component.html'
})
export class PoGaugeDescriptionComponent {
  @Input('p-has-ranges') hasRanges: boolean;

  @Input('p-description') description: string;

  @Input('p-value') value: number;

  constructor() {}
}
