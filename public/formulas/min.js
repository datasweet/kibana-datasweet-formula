import { FormulaFunction } from './formula_function';
import { flatten, min } from 'lodash';

export default new FormulaFunction('min', {
  help: 'Minimum of a serie.',
  fn: function () {
    const series = flatten(arguments);
    if (series.length === 0) return null;
    return min(series);
  }
});