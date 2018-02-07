import { FormulaFunction } from './formula_function';
import { flatten, reduce } from 'lodash';

export default new FormulaFunction('derivative', {
  help: 'Derivative a serie.',
  fn: function () {
    const series = flatten(arguments);
    if (series.length < 2) return null;

    const res = [null];
    for (var i = 1; i < series.length; i++) {
      res.push(series[i] - series[i - 1]);
    }
    return res;
  }
});