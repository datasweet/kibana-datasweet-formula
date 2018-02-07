import { FormulaFunction } from './formula_function';
import { flatten, max } from 'lodash';

export default new FormulaFunction('max', {
  help: 'Maximum of a serie.',
  fn: function () {
    const series = flatten(arguments);
    if (series.length === 0) return null;
    return max(series);
  }
});