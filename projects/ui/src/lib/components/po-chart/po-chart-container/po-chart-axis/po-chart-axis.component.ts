import { Component, Input } from '@angular/core';

import {
  PoChartAxisXLabelArea,
  PoChartAxisXGridLines,
  PoChartPadding,
  PoChartPlotAreaPaddingTop
} from '../../helpers/po-chart-default-values.constant';

import { PoChartMathsService } from '../../services/po-chart-maths.service';
import { PoChartContainerSize } from '../../interfaces/po-chart-container-size.interface';
import { PoChartMinMaxValues } from '../../interfaces/po-chart-min-max-values.interface';
import { PoChartPathCoordinates } from '../../interfaces/po-chart-path-coordinates.interface';
import { PoChartAxisLabelCoordinates } from '../../interfaces/po-chart-axis-label-coordinates.interface';
import { PoChartAxisOptions } from '../../interfaces/po-chart-axis-options.interface';
import { PoChartType } from '../../enums/po-chart-type.enum';

@Component({
  selector: '[po-chart-axis]',
  templateUrl: './po-chart-axis.component.svg'
})
export class PoChartAxisComponent {
  axisXCoordinates: Array<PoChartPathCoordinates>;
  axisXLabelCoordinates: Array<PoChartAxisLabelCoordinates>;
  axisYCoordinates: Array<PoChartPathCoordinates>;
  axisYLabelCoordinates: Array<PoChartAxisLabelCoordinates>;

  private axisXGridLines: number = PoChartAxisXGridLines;
  private minMaxAxisValues: PoChartMinMaxValues;
  private seriesLength: number = 0;
  private hasAxisSideSpacing: boolean;
  private acceptNegativeValues: boolean;

  private _axisOptions: PoChartAxisOptions;
  private _categories: Array<string> = [];
  private _containerSize: PoChartContainerSize = {};
  private _series: Array<any> = [];
  private _type: PoChartType;

  @Input('p-type') set type(value: PoChartType) {
    this._type = value;

    this.hasAxisSideSpacing = this._type === PoChartType.Line;
    this.acceptNegativeValues = this.hasAxisSideSpacing;
  }

  get type() {
    return this._type;
  }

  @Input('p-series') set series(seriesList: Array<any>) {
    const seriesDataArrayFilter = seriesList.filter(serie => {
      return Array.isArray(serie.data);
    });

    if (seriesDataArrayFilter.length) {
      this._series = seriesDataArrayFilter;

      this.seriesLength = this.mathsService.seriesGreaterLength(this.series);
      this.minMaxAxisValues = this.mathsService.calculateMinAndMaxValues(this._series);
      this.checkAxisOptions(this.axisOptions);
      this.setAxisXCoordinates(
        this.axisXGridLines,
        this.seriesLength,
        this.containerSize,
        this.minMaxAxisValues,
        this.type
      );
      this.setAxisYCoordinates(
        this.axisXGridLines,
        this.seriesLength,
        this.containerSize,
        this.minMaxAxisValues,
        this.type
      );
    } else {
      this._series = [];
    }
  }

  get series() {
    return this._series;
  }

  @Input('p-categories') set categories(value: Array<string>) {
    this._categories = value;

    if (this.type === PoChartType.Bar) {
      this.setAxisXCoordinates(
        this.axisXGridLines,
        this.seriesLength,
        this.containerSize,
        this.minMaxAxisValues,
        this.type
      );
    } else {
      this.setAxisYCoordinates(
        this.axisXGridLines,
        this.seriesLength,
        this._containerSize,
        this.minMaxAxisValues,
        this.type
      );
    }
  }

  get categories() {
    return this._categories;
  }

  @Input('p-container-size') set containerSize(value: PoChartContainerSize) {
    this._containerSize = value;

    this.checkAxisOptions(this.axisOptions);
    this.setAxisXCoordinates(
      this.axisXGridLines,
      this.seriesLength,
      this._containerSize,
      this.minMaxAxisValues,
      this.type
    );
    this.setAxisYCoordinates(
      this.axisXGridLines,
      this.seriesLength,
      this._containerSize,
      this.minMaxAxisValues,
      this.type
    );
  }

  get containerSize() {
    return this._containerSize;
  }

  @Input('p-options') set axisOptions(value: PoChartAxisOptions) {
    this._axisOptions = value;

    this.checkAxisOptions(this._axisOptions);

    if (this.type === PoChartType.Bar) {
      this.setAxisYCoordinates(
        this.axisXGridLines,
        this.seriesLength,
        this.containerSize,
        this.minMaxAxisValues,
        this.type
      );
    } else {
      this.setAxisXCoordinates(
        this.axisXGridLines,
        this.seriesLength,
        this.containerSize,
        this.minMaxAxisValues,
        this.type
      );
    }
  }

  get axisOptions() {
    return this._axisOptions;
  }

  constructor(private mathsService: PoChartMathsService) {}

  private setAxisXCoordinates(
    axisXGridLines: number,
    seriesLength: number,
    containerSize: PoChartContainerSize,
    minMaxAxisValues: PoChartMinMaxValues,
    type: PoChartType
  ) {
    const amountOfAxisX = type === PoChartType.Bar ? seriesLength : axisXGridLines;

    this.calculateAxisXCoordinates(amountOfAxisX, containerSize, type);
    this.calculateAxisXLabelCoordinates(amountOfAxisX, this.containerSize, this.minMaxAxisValues, type);
  }

  private setAxisYCoordinates(
    axisXGridLines: number,
    seriesLength: number,
    containerSize: PoChartContainerSize,
    minMaxAxisValues: PoChartMinMaxValues,
    type: PoChartType
  ) {
    const amountOfAxisY = type === PoChartType.Bar ? axisXGridLines : seriesLength;

    this.calculateAxisYCoordinates(amountOfAxisY, containerSize, type);
    this.calculateAxisYLabelCoordinates(amountOfAxisY, containerSize, minMaxAxisValues, type);
  }

  private calculateAxisXCoordinates(amountOfAxisX: number, containerSize: PoChartContainerSize, type: PoChartType) {
    const length = amountOfAxisX === 0 || type === PoChartType.Bar ? amountOfAxisX + 1 : amountOfAxisX;

    this.axisXCoordinates = [...Array(length)].map((_, index: number) => {
      const startX = PoChartAxisXLabelArea;
      const endX = containerSize.svgWidth;
      const yCoordinate = this.calculateAxisXCoordinateY(amountOfAxisX, containerSize, type, index);

      const coordinates = `M${startX} ${yCoordinate} L${endX}, ${yCoordinate}`;

      return { coordinates };
    });
  }

  private calculateAxisXLabelCoordinates(
    amountOfAxisX: number,
    containerSize: PoChartContainerSize,
    minMaxAxisValues: PoChartMinMaxValues,
    type: PoChartType
  ) {
    const axisXLabels = this.getAxisXLabels(type, minMaxAxisValues, amountOfAxisX);

    this.axisXLabelCoordinates = [...Array(amountOfAxisX)].map((_, index: number) => {
      const label = axisXLabels[index];
      const xCoordinate = this.calculateAxisXLabelXCoordinate();
      const yCoordinate = this.calculateAxisXLabelYCoordinate(amountOfAxisX, containerSize, type, index);

      return { label, xCoordinate, yCoordinate };
    });
  }

  private calculateAxisYCoordinates(amountOfAxisY: number, containerSize: PoChartContainerSize, type: PoChartType) {
    return this.hasAxisSideSpacing
      ? this.setAxisYCoordinatesWithSideSpacing(containerSize, amountOfAxisY)
      : this.setAxisYCoordinatesWithoutSideSpacing(containerSize, amountOfAxisY, type);
  }

  private setAxisYCoordinatesWithSideSpacing(containerSize: PoChartContainerSize, amountOfAxisY: number) {
    const startY = PoChartPlotAreaPaddingTop;
    const endY = containerSize.svgPlottingAreaHeight + PoChartPlotAreaPaddingTop;

    const outerYCoordinates = this.setAxisYOuterCoordinates(startY, endY, containerSize);

    const innerYCoordinates = [...Array(amountOfAxisY)].map((_, index: number) => {
      const xCoordinate = this.calculateAxisYCoordinateXWithSideSpacing(containerSize, index);

      const coordinates = `M${xCoordinate} ${startY} L${xCoordinate}, ${endY}`;

      return { coordinates };
    });

    this.axisYCoordinates = [...outerYCoordinates, ...innerYCoordinates];
  }

  private setAxisYCoordinatesWithoutSideSpacing(
    containerSize: PoChartContainerSize,
    amountOfAxisY: number,
    type: PoChartType
  ) {
    const startY = PoChartPlotAreaPaddingTop;
    const endY = containerSize.svgPlottingAreaHeight + PoChartPlotAreaPaddingTop;

    // tratamento necessário para criar uma linha a mais para fechar o gráfico
    const length = amountOfAxisY === 0 || type === PoChartType.Bar ? amountOfAxisY : amountOfAxisY + 1;

    const innerYCoordinates = [...Array(length)].map((_, index: number) => {
      const xCoordinate = this.calculateAxisYCoordinateX(containerSize, amountOfAxisY, type, index);

      const coordinates = `M${xCoordinate} ${startY} L${xCoordinate}, ${endY}`;

      return { coordinates };
    });

    this.axisYCoordinates = [...innerYCoordinates];
  }

  private setAxisYOuterCoordinates(startY: number, endY: number, containerSize: PoChartContainerSize) {
    const firstLineCoordinates = {
      coordinates: `M${PoChartAxisXLabelArea} ${startY} L${PoChartAxisXLabelArea} ${endY}`
    };
    const lastLineCoordinates = {
      coordinates: `M${containerSize.svgWidth} ${startY} L${containerSize.svgWidth} ${endY}`
    };

    return [firstLineCoordinates, lastLineCoordinates];
  }

  private calculateAxisYLabelCoordinates(
    amountOfAxisY: number,
    containerSize: PoChartContainerSize,
    minMaxAxisValues: PoChartMinMaxValues,
    type: PoChartType
  ) {
    const axisYLabels = this.getAxisYLabels(type, minMaxAxisValues, amountOfAxisY);

    this.axisYLabelCoordinates = [...Array(amountOfAxisY)].map((_, index: number) => {
      const label = axisYLabels[index];

      const xCoordinate = this.hasAxisSideSpacing
        ? this.calculateAxisYCoordinateXWithSideSpacing(containerSize, index)
        : this.calculateAxisYLabelXCoordinateWithoutSideSpace(containerSize, amountOfAxisY, type, index);
      const yCoordinate = this.calculateAxisYLabelYCoordinate(containerSize);

      return { label, xCoordinate, yCoordinate };
    });
  }

  private calculateAxisXLabelXCoordinate(): number {
    const labelPoChartPadding = PoChartPadding / 3;

    return PoChartAxisXLabelArea - labelPoChartPadding;
  }

  private calculateAxisXLabelYCoordinate(
    amountOfAxisX: number,
    containerSize: PoChartContainerSize,
    type: PoChartType,
    index: number
  ): number {
    const amountOfLines = type === PoChartType.Bar ? amountOfAxisX : amountOfAxisX - 1;
    const yRatio = index / amountOfLines;

    if (type !== PoChartType.Bar) {
      return (
        containerSize.svgPlottingAreaHeight - containerSize.svgPlottingAreaHeight * yRatio + PoChartPlotAreaPaddingTop
      );
    }

    const halfCategoryHeight = containerSize.svgPlottingAreaHeight / amountOfAxisX / 2;
    return (
      containerSize.svgPlottingAreaHeight -
      halfCategoryHeight -
      containerSize.svgPlottingAreaHeight * yRatio +
      PoChartPlotAreaPaddingTop
    );
  }

  private calculateAxisXCoordinateY(
    amountOfAxisX: number,
    containerSize: PoChartContainerSize,
    type: PoChartType,
    index: number
  ): number {
    const amountOfLines = type === PoChartType.Bar ? amountOfAxisX : amountOfAxisX - 1;
    const yRatio = index / amountOfLines;

    return (
      containerSize.svgPlottingAreaHeight - containerSize.svgPlottingAreaHeight * yRatio + PoChartPlotAreaPaddingTop
    );
  }

  private calculateAxisYLabelYCoordinate(containerSize: PoChartContainerSize): number {
    const textPoChartPadding = PoChartPadding / 3;

    return containerSize.svgHeight - textPoChartPadding;
  }

  private calculateAxisYLabelXCoordinateWithoutSideSpace(
    containerSize: PoChartContainerSize,
    amountOfAxisY: number,
    type: PoChartType,
    index: number
  ): number {
    const amountOfLines = type === PoChartType.Bar ? amountOfAxisY - 1 : amountOfAxisY;
    const xRatio = index / amountOfLines;

    if (type === PoChartType.Bar) {
      return PoChartAxisXLabelArea + (containerSize.svgPlottingAreaWidth + PoChartPadding * 2) * xRatio;
    }

    const halfCategoryWidth = (containerSize.svgWidth - PoChartAxisXLabelArea) / amountOfAxisY / 2;
    return (
      PoChartAxisXLabelArea + halfCategoryWidth + (containerSize.svgPlottingAreaWidth + PoChartPadding * 2) * xRatio
    );
  }

  private calculateAxisYCoordinateXWithSideSpacing(containerSize: PoChartContainerSize, index: number): number {
    const divideIndexBySeriesLength = index / (this.seriesLength - 1);
    const xRatio = isNaN(divideIndexBySeriesLength) ? 0 : divideIndexBySeriesLength;
    const svgAxisSideSpacing = this.mathsService.calculateSideSpacing(containerSize.svgWidth, this.seriesLength);

    return PoChartAxisXLabelArea + svgAxisSideSpacing + containerSize.svgPlottingAreaWidth * xRatio;
  }

  private calculateAxisYCoordinateX(
    containerSize: PoChartContainerSize,
    amountOfAxisY: number,
    type: PoChartType,
    index: number
  ): number {
    const amountOfLines = type === PoChartType.Bar ? amountOfAxisY - 1 : amountOfAxisY;
    const divideIndexByAmountOfLines = index / amountOfLines;
    const xRatio = divideIndexByAmountOfLines === Infinity ? 0 : divideIndexByAmountOfLines;

    return PoChartAxisXLabelArea + (containerSize.svgPlottingAreaWidth + PoChartPadding * 2) * xRatio;
  }

  private checkAxisOptions(options: PoChartAxisOptions = {}): void {
    const minMaxSeriesValues = this.mathsService.calculateMinAndMaxValues(this.series, this.acceptNegativeValues);

    this.minMaxAxisValues = this.checksMinAndMaxValues(options, minMaxSeriesValues);

    this.axisXGridLines =
      options.axisXGridLines && this.isValidGridLinesLengthOption(options.axisXGridLines)
        ? options.axisXGridLines
        : PoChartAxisXGridLines;
  }

  private checksMinAndMaxValues(
    options: PoChartAxisOptions,
    minMaxSeriesValues: PoChartMinMaxValues
  ): PoChartMinMaxValues {
    let min = options.minRange < minMaxSeriesValues.minValue ? options.minRange : minMaxSeriesValues.minValue;
    const max = options.maxRange > minMaxSeriesValues.maxValue ? options.maxRange : minMaxSeriesValues.maxValue;
    const isNegative = min < 0;

    if (!this.acceptNegativeValues) {
      min = !options.minRange || isNegative ? 0 : min;
    }

    const minMaxUpdatedValues = {
      minValue: min,
      maxValue: max
    };

    return {
      ...minMaxSeriesValues,
      ...minMaxUpdatedValues
    };
  }

  private isValidGridLinesLengthOption(axisXGridLines: number): boolean {
    return axisXGridLines >= 2 && axisXGridLines <= 10;
  }

  private getAxisXLabels(type: PoChartType, minMaxAxisValues: PoChartMinMaxValues, amountOfAxisX: number) {
    return type === PoChartType.Bar
      ? this.formatCategoriesLabels(amountOfAxisX).reverse()
      : this.generateAverageOfLabels(minMaxAxisValues, amountOfAxisX);
  }

  private getAxisYLabels(type: PoChartType, minMaxAxisValues: PoChartMinMaxValues, amountOfAxisX: number) {
    return type === PoChartType.Bar
      ? this.generateAverageOfLabels(minMaxAxisValues, amountOfAxisX)
      : this.formatCategoriesLabels(amountOfAxisX);
  }

  private formatCategoriesLabels(amountOfAxisX: number) {
    return [...Array(amountOfAxisX)].map((_, index: number) => {
      return this.categories[index] ?? '-';
    });
  }

  private generateAverageOfLabels(minMaxAxisValues: PoChartMinMaxValues, amountOfAxisX: number) {
    const averageLabelsList = this.mathsService.range(minMaxAxisValues, amountOfAxisX);

    return averageLabelsList.map(label => {
      const formattedDigit = label.toFixed(label % 1 && 2);
      const removeZeroDigits = formattedDigit.replace(/\.00$/, '');

      return removeZeroDigits.toString();
    });
  }
}
