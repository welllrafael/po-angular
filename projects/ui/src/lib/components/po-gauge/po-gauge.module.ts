import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoGaugeComponent } from './po-gauge.component';
import { PoGaugeDescriptionComponent } from './po-gauge-description/po-gauge-description.component';
import { PoGaugeLegendComponent } from './po-gauge-legend/po-gauge-legend.component';
import { PoGaugePathComponent } from './po-gauge-path/po-gauge-path.component';
import { PoGaugeSvgComponent } from './po-gauge-svg/po-gauge-svg.component';
import { PoGaugeTitleComponent } from './po-gauge-title/po-gauge-title.component';

/**
 * @description
 * Módulo do componente po-gauge.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [
    PoGaugeComponent,
    PoGaugeTitleComponent,
    PoGaugeLegendComponent,
    PoGaugeSvgComponent,
    PoGaugePathComponent,
    PoGaugeDescriptionComponent
  ],
  exports: [PoGaugeComponent]
})
export class PoGaugeModule {}
