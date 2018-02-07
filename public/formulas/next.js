import { FormulaFunction } from './formula_function';
import { flatten } from 'lodash';

export default new FormulaFunction('next', {
  help: 'Shift a serie to the right.',
  fn: function () {
    const series = flatten(arguments);
    if (series.length < 2) return null;
    return series.slice(1).concat(null);
  }
});