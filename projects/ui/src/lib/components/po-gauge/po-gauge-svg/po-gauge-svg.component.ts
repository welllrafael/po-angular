import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { convertToInt } from '../../../../lib/utils/util';
import { PoGaugePointerEnd, PoGaugeThickness, poGaugeTotalValueDefault } from '../po-gauge-default-values.constant';
import { PoGaugeColors } from '../po-gauge-colors.constant';

import { PoGaugeCoordinates } from '../interfaces/po-gauge-coordinates.interface';
import { PoGaugeRanges } from '../interfaces/po-gauge-ranges.interface';

export const poGaugeStartAngle = -Math.PI;

export interface PoGaugeContainer {
  width: number;

  height: number;
}

@Component({
  selector: 'po-gauge-svg',
  templateUrl: './po-gauge-svg.component.html'
})
export class PoGaugeSvgComponent implements AfterViewInit, OnChanges {
  private afterViewInit: boolean = false;

  baseCoordinates: PoGaugeCoordinates;
  container: PoGaugeContainer;
  coordinates: Array<PoGaugeCoordinates>;
  viewBox: string;

  @Input('p-ranges') ranges: Array<PoGaugeRanges>;

  @Input('p-value') value: number;

  constructor(private elementRef: ElementRef, private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.afterViewInit = true;

    this.setCoordinates(this.value, this.ranges);

    this.changeDetector.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { value, ranges } = changes;

    if ((this.afterViewInit && changes.value) || (this.afterViewInit && changes.ranges)) {
      this.setCoordinates(this.value, this.ranges);
    }
  }

  private setCoordinates(value: number, ranges: Array<PoGaugeRanges>): void {
    this.container = this.containerMeasurements();
    this.setBaseCoordinates(this.container.height);

    if (!ranges.length) {
      this.setSingleRangeCoordinates(this.container.height, value);
      return;
    }

    this.setRangesCoordinates(this.container.height, ranges);
  }

  private setBaseCoordinates(height: PoGaugeContainer['height']): void {
    const endAngleRadian = 0;
    const coordinates = this.calculateCoordinates(height, poGaugeStartAngle, endAngleRadian);

    this.baseCoordinates = { coordinates };
  }

  private setRangesCoordinates(height: number, ranges: Array<PoGaugeRanges>): void {
    const minMaxRanges = this.calculateMinAndMaxValues(ranges);

    const rangesCoordinates = ranges.map((range: PoGaugeRanges) => {
      const from = !range.from || range.from < 0 ? 0 : range.from;
      const to = range.to ?? minMaxRanges.maxRange;

      const startAngleRadian = poGaugeStartAngle + this.calculateAngleRadius(from, minMaxRanges.maxRange);
      const endAngleRadian = poGaugeStartAngle + this.calculateAngleRadius(to, minMaxRanges.maxRange);

      const coordinates = this.calculateCoordinates(height, startAngleRadian, endAngleRadian);

      return { coordinates, color: range.color };
    });

    this.coordinates = rangesCoordinates.reverse();
  }

  private setSingleRangeCoordinates(height: PoGaugeContainer['height'], value: number): void {
    const endAngleRadian = poGaugeStartAngle + this.calculateAngleRadius(value, poGaugeTotalValueDefault);
    const coordinates = this.calculateCoordinates(height, poGaugeStartAngle, endAngleRadian);
    const color = PoGaugeColors[0][0];

    this.coordinates = [{ coordinates, color }];
  }

  private calculateCoordinates(
    height: PoGaugeContainer['height'],
    startAngleRadian: number,
    endAngleRadian: number
  ): PoGaugeCoordinates['coordinates'] {
    // Subtrai altura pelo excedente ponteiro em relação ao gráfico, pela metade do valor da coroa circular.
    const radius = height - PoGaugePointerEnd - PoGaugeThickness / 2;
    const innerRadius = radius - PoGaugeThickness;

    const sinAlpha = Math.sin(startAngleRadian);
    const cosAlpha = Math.cos(startAngleRadian);

    const sinBeta = Math.sin(endAngleRadian);
    const cosBeta = Math.cos(endAngleRadian);

    const startX = Math.round(radius + cosAlpha * radius);
    const startY = Math.round(radius + sinAlpha * radius);

    const endX = Math.round(radius + cosBeta * radius);
    const endY = Math.round(radius + sinBeta * radius);

    const startInnerX = Math.round(radius + cosAlpha * innerRadius);
    const startInnerY = Math.round(radius + sinAlpha * innerRadius);

    const endInnerX = Math.round(radius + cosBeta * innerRadius);
    const endInnerY = Math.round(radius + sinBeta * innerRadius);

    const coordinates = [
      'M',
      startX,
      startY,
      'A',
      radius,
      radius,
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

    return coordinates;
  }

  private calculateAngleRadius(value: number, totalValue: number): number {
    const endAngle = (value / totalValue) * (Math.PI * 2);

    return endAngle / 2;
  }

  private containerMeasurements(): PoGaugeContainer {
    const { height, width } = this.elementRef.nativeElement.getBoundingClientRect();

    this.setViewBox(height);

    return { width, height };
  }

  private setViewBox(height: number): void {
    const width = this.calculateDiameter(height);

    this.viewBox = `0 ${-PoGaugePointerEnd} ${width} ${height}`;
  }

  private calculateDiameter(height: number): number {
    const radius = height - PoGaugePointerEnd - PoGaugeThickness / 2;
    const cosBeta = Math.cos(0);

    return radius + cosBeta * radius;
  }

  private calculateMinAndMaxValues(ranges: Array<PoGaugeRanges>) {
    const minRange = this.getDomain(ranges, 'min');
    const maxRange = this.getDomain(ranges, 'max');

    return { minRange: !minRange || minRange < 0 ? 0 : minRange, maxRange: convertToInt(maxRange) ? maxRange : 100 };
  }

  private getDomain(ranges: Array<PoGaugeRanges>, type: string): number {
    const rangeType = { min: 'from', max: 'to' };

    return Math[type](...ranges.map(range => range[rangeType[type]]));
  }
}
