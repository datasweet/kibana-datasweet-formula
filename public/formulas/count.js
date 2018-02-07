import { FormulaFunction } from './formula_function';
import { flatten } from 'lodash';

export default new FormulaFunction('count', {
  help: 'Count number of elements.',
  fn: function () {
    const series = flatten(arguments);
    return series.length;
  }
});