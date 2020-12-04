import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoGaugeComponent } from './po-gauge.component';
import { PoGaugeTitleComponent } from './po-gauge-title/po-gauge-title.component';
import { PoGaugeLegendComponent } from './po-gauge-legend/po-gauge-legend.component';
import { PoGaugeContainerComponent } from './po-gauge-container/po-gauge-container.component';

/**
 * @description
 * Módulo do componente po-gauge.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [PoGaugeComponent, PoGaugeTitleComponent, PoGaugeLegendComponent, PoGaugeContainerComponent],
  exports: [PoGaugeComponent]
})
export class PoGaugeModule {}
