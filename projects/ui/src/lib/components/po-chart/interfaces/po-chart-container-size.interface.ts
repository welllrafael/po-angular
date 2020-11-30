/**
 * @docsPrivate
 *
 * @usedBy PoChartComponent
 *
 * @description
 *
 * Agrupamento das medidas utilizadas para dimensionamento do container SVG e para cálculos de plotagem.
 */

export interface PoChartContainerSize {
  /** Largura do container. */
  svgWidth?: number;

  /** Metade da largura do container */
  centerX?: number;

  /** Altura do container. */
  svgHeight?: number;

  /** Metade da altura do container. */
  centerY?: number;

  /** Medida da largura do container - (padding lateral) - (area do labelX) - (padding lateral do grid). */
  svgPlottingAreaWidth?: number;

  /** Medida da altura do container - padding superior. */
  svgPlottingAreaHeight?: number;

  /** Largura referente ao texto mais longo da série ou categoria para designação de área dos textos do eixo X do grid. */
  axisXLabelWidth?: number;
}
