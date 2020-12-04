/**
 * @usedBy PoGaugeComponent
 *
 * @description
 *
 * Interface que define os alcances das cores do gauge.
 */
export interface PoGaugeRanges {
  /** Alcance inicial da cor. */
  from?: string;

  /** Alcance final da cor. */
  to?: string;

  /**
   * @description
   *
   * O texto para a legenda do alcance.
   *
   * > Se desejar ocultar a legenda basta ignorar esta propriedade.
   */
  label?: string;

  /**
   * @description
   *
   * Determina a cor do alcance. O gauge possui um *preset* padrão de cores e há duas formas de customizá-lo:
   *
   * - Atribuindo um valor hexadeximal, por exemplo `c64840`.
   * - Usando uma das cores do tema do PO:
   *    Valores válidos:
   *    - <span class="dot po-color-01"></span> `color-01`
   *    - <span class="dot po-color-02"></span> `color-02`
   *    - <span class="dot po-color-03"></span> `color-03`
   *    - <span class="dot po-color-04"></span> `color-04`
   *    - <span class="dot po-color-05"></span> `color-05`
   *    - <span class="dot po-color-06"></span> `color-06`
   *    - <span class="dot po-color-07"></span> `color-07`
   *    - <span class="dot po-color-08"></span> `color-08`
   *    - <span class="dot po-color-09"></span> `color-09`
   *    - <span class="dot po-color-10"></span> `color-10`
   *    - <span class="dot po-color-11"></span> `color-11`
   *    - <span class="dot po-color-12"></span> `color-12`
   */
  color?: string;
}
