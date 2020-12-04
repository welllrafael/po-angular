import { Component, OnInit } from '@angular/core';

import { PoGaugeBaseComponent } from './po-gauge-base.component';
import { ColorService } from './services/color.service';

@Component({
  selector: 'po-gauge',
  templateUrl: './po-gauge.component.html'
})
export class PoGaugeComponent extends PoGaugeBaseComponent implements OnInit {
  constructor(protected colorService: ColorService) {
    super(colorService);
  }

  ngOnInit(): void {}
}
