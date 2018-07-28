import { FormulaFunction } from './formula_function';
import { isArray } from 'lodash';
import 'percentile';

// Based on timelion moving average
export default new FormulaFunction('percentile', {
  help: 'The n-th percentile of a serie.',
  fn: function (serie, n) {
    if (!isArray(serie)) return null;
    return percentile(n, serie);
  }
});