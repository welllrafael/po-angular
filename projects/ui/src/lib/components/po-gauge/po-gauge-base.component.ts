import { EventEmitter, Input, Directive } from '@angular/core';

import { convertToInt, isTypeof } from '../../utils/util';

import { PoGaugeRanges } from './interfaces/po-gauge-ranges.interface';
import { ColorService } from './services/color.service';

const poGaugeMinHeight = 200;

/**
 * @description
 *
 * O componente `po-gauge` provê a representação de um valor através de um arco. É muito comum, por exemplo, para demonstrar o desempenho ou progressão de algo.
 * O `po-gauge` possui dois tipos de tratamentos:
 * - É possível demonstrar um dado percentual simples em conjunto com uma descrição resumida em seu interior;
 * - Para um demonstrativo mais elaborado, consegue-se definir alcances com cores, um breve texto descritivo e um ponteiro indicando o valor desejado.
 */
@Directive()
export abstract class PoGaugeBaseComponent {
  private _description: string;
  private _height: number = poGaugeMinHeight;
  private _ranges: Array<PoGaugeRanges> = [];
  private _value: number;

  /**
   * @optional
   *
   * @description
   *
   * Designa o texto que será exibido no gauge.
   *
   * > Caso o conteúdo ultrapasse o tamanho disponível, será gerado automaticamente reticências, porém será possível visualizar a mensagem através de um tooltip no passar do mouse sobre o texto.
   *
   * @default `200px`
   */
  @Input('p-description') set description(value: string) {
    this._description = value;
  }

  get description(): string {
    return this._description;
  }

  /**
   * @optional
   *
   * @description
   *
   * Define a altura do gauge.
   *
   * O valor mínimo do gauge é 200px.
   *
   * @default `200px`
   */
  @Input('p-height') set height(value: number) {
    this._height = this.setGaugeHeight(value);
  }

  get height(): number {
    return this._height;
  }

  /** Definição de alcance das cores. */
  @Input('p-ranges') set ranges(value: Array<PoGaugeRanges>) {
    if (Array.isArray(value)) {
      this._ranges = this.verifyColors(value);
    }
  }

  get ranges(): Array<PoGaugeRanges> {
    return this._ranges;
  }

  /** Define o título do gauge. */
  @Input('p-title') title?: string;

  /**
   * @optional
   *
   * @description
   *
   * Valor referente ao valor da série. Seu comportamento segue a seguintes regras:
   *
   * - Sem `p-ranges`: se não houver definição, a valores passados para `p-value` e `p-description serão centralizados no interior do gauge.
   * A base do valor será percentual tendo como base os alcances entre zero e 100%.
   * - Contendo `p-ranges`: A descrição será exibida acima do gauge e haverá um ponteiro marcando o valor passado para `p-value`.
   * Considerando que o alcance em `ranges` é aberto, então a escala de `p-value` será em relação aos menores/maiores alcances absolutos definidos em `p-ranges`.
   *
   */
  @Input('p-value') set value(gaugeValue: number) {
    this._value = convertToInt(gaugeValue);
  }

  get value(): number {
    return this._value;
  }

  constructor(protected colorService: ColorService) {}

  private verifyColors(ranges: Array<PoGaugeRanges>) {
    return this.colorService.getColors(ranges);
  }

  private setGaugeHeight(height: number): number {
    const gaugeHeight = convertToInt(height);

    return gaugeHeight && gaugeHeight > poGaugeMinHeight ? gaugeHeight : poGaugeMinHeight;
  }
}
