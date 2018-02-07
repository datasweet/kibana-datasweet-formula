import { FormulaFunction } from './formula_function';
import { flatten, sum } from 'lodash';

export default new FormulaFunction('avg', {
  help: 'Average a serie.',
  fn: function () {
    const series = flatten(arguments);
    if (series.length === 0) return null;
    return sum(series) / series.length;
  }
});