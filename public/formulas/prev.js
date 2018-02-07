import { FormulaFunction } from './formula_function';
import { flatten } from 'lodash';

export default new FormulaFunction('prev', {
  help: 'Shift a serie to the left.',
  fn: function () {
    const series = flatten(arguments);
    if (series.length < 2) return null;
    return [null].concat(series.slice(0, -1));
  }
});