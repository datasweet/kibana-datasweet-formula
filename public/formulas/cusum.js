import { FormulaFunction } from './formula_function';
import { flatten, reduce } from 'lodash';

export default new FormulaFunction('cusum', {
  help: 'Cumulative sum of a serie.',
  fn: function () {
    const series = flatten(arguments);
    if (series.length === 0) return null;
    if (series.length === 1) return series[0];

    return reduce(series, (acc, row) => {
      acc.push((acc.length > 0 ? acc[acc.length - 1] : 0) + row);
      return acc;
    }, []);
  }
});