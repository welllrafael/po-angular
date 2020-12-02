import { Component, Input, NgZone, OnInit } from '@angular/core';
import { poChartStartAngle } from '../../helpers/po-chart-default-values.constant';

import { PoChartContainerSize } from '../../interfaces/po-chart-container-size.interface';
import { PoChartPathCoordinates } from '../../interfaces/po-chart-path-coordinates.interface';
import { PoChartGaugeSerie } from '../../po-chart-types/po-chart-gauge/po-chart-gauge-series.interface';

@Component({
  selector: '[po-chart-gauge]',
  templateUrl: './po-chart-gauge.component.svg'
})
export class PoChartGaugeComponent implements OnInit {
  seriesPathsCoordinates: Array<PoChartPathCoordinates>;

  private _containerSize: PoChartContainerSize = {};
  private _series: Array<PoChartGaugeSerie>;

  @Input('p-container-size') set containerSize(value: PoChartContainerSize) {
    this._containerSize = value;

    this.calculateSeriesPathsCoordinates(this._containerSize, this.series);
  }

  get containerSize() {
    return this._containerSize;
  }

  @Input('p-series') set series(value: Array<PoChartGaugeSerie>) {
    this._series = this.verifySeriesType(value);

    this.calculateSeriesPathsCoordinates(this.containerSize, this._series);
  }

  get series() {
    return this._series;
  }

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  trackBy(index) {
    return index;
  }

  private verifySeriesType(serie) {
    if (Array.isArray(serie)) {
      return serie;
    }

    if (typeof serie === 'object' && Object.keys(serie).length) {
      return [{ ...serie }];
    }

    return [];
  }

  calculateSeriesPathsCoordinates(containerSize: PoChartContainerSize, series: Array<PoChartGaugeSerie>) {
    const totalValue = 100;
    let endAngleRadian: number = 0;
    let startAngleRadian: number = poChartStartAngle;

    this.seriesPathsCoordinates = series.map((serie: PoChartGaugeSerie) => {
      startAngleRadian = startAngleRadian + endAngleRadian;
      endAngleRadian = startAngleRadian + this.calculateEndAngle(serie.value, totalValue);

      const coordinates = this.pathCoordinates(containerSize, startAngleRadian, endAngleRadian);

      return { coordinates };
    });
  }

  calculateEndAngle(value: PoChartGaugeSerie['value'], totalValue: number) {
    const endAngle = (value / totalValue) * (Math.PI * 2);

    // aqui define se é meio ou inteiro gauge
    // return this.isChartGaugeType ? endAngle / 2 : endAngle;

    return endAngle / 2;
  }

  pathCoordinates(containerSize, chartItemStartAngle, chartItemEndAngle) {
    const { centerX, centerY, svgHeight } = containerSize;

    console.log('chartItemStartAngle:::', chartItemStartAngle);
    console.log('chartItemEndAngle:::', chartItemEndAngle);

    // passar para optionsm e ver o valor correto
    const innerRadius = svgHeight - svgHeight * 0.06;

    const sinAlpha = Math.sin(chartItemStartAngle);
    const cosAlpha = Math.cos(chartItemStartAngle);

    const sinBeta = Math.sin(chartItemEndAngle);
    const cosBeta = Math.cos(chartItemEndAngle);

    console.log('COSALPHA', cosAlpha);
    console.log('COSALPHA svgHeight', sinAlpha * svgHeight);
    console.log('COSALPHA innerRadius', sinAlpha * innerRadius);
    const startX = svgHeight + cosAlpha * svgHeight;
    const startY = svgHeight + sinAlpha * innerRadius;
    console.log('STARTY', startY);

    const endX = svgHeight + cosBeta * svgHeight;
    const endY = svgHeight + sinBeta * svgHeight;

    const startInnerX = svgHeight + cosAlpha * innerRadius;
    const startInnerY = svgHeight + sinAlpha * innerRadius;

    const endInnerX = svgHeight + cosBeta * innerRadius;
    const endInnerY = svgHeight + sinBeta * innerRadius;

    const halfGaugeCoordinates = [
      'M',
      startX,
      startY,
      'A',
      svgHeight,
      svgHeight,
      0,
      '0,1',
      endX,
      endY,
      'A',
      1,
      1,
      0,
      '0,1',
      endInnerX,
      endInnerY,
      'A',
      innerRadius,
      innerRadius,
      0,
      '0,0',
      startInnerX,
      startInnerY,
      'A',
      1,
      1,
      0,
      '0,1',
      startX,
      startY,
      'Z'
    ].join(' ');

    console.log('halfGaugeCoordinates:::', halfGaugeCoordinates);

    return halfGaugeCoordinates;
  }
}
