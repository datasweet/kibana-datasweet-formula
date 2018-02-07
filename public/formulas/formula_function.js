import { noop } from 'lodash';

export class FormulaFunction {
    constructor(name, config) {
      this.name = name;
      this.type = config.type || 'row'; // row or col
      this.help = config.help || '';
      this.fn = config.fn || noop;
      this.ctx = null;
    };
}