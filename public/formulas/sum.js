import { FormulaFunction } from './formula_function';
import { flatten, sum } from 'lodash';

export default new FormulaFunction('sum', {
  help: 'Previous values for a serie.',
  fn: function () {
    const series = flatten(arguments);
    if (series.length === 0) return 0;
    return sum(series);
  }
});