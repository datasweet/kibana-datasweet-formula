import { FormulaFunction } from './formula_function';
import { contains, isArray, map, reduce, sum } from 'lodash';

// Based on timelion moving average
export default new FormulaFunction('mvavg', {
  help: 'Moving average a column defined by its metric aggregation id.',
  fn: function (series, position = 'center', window = 3) {
    if (!isArray(series)) return null;

    function mvavg(rows, wdn, pos) {
      const len = rows.length;

      if (pos === 'center') {
        const windowLeft = Math.floor(wdn / 2);
        const windowRight = wdn - windowLeft;
        return map(rows, function (row, i) {
          if (i < windowLeft || i > len - windowRight) return null;
          return sum(rows.slice(i - windowLeft, i + windowRight)) / wdn;
        });
      } else if (pos === 'left') {
        return map(rows, function (row, i) {
          const cursor = i + 1;
          if (cursor < wdn) return null;
          return sum(rows.slice(cursor - wdn, cursor)) / wdn;
        });
      } else if (pos === 'right') {
        return map(rows, function (row, i) {
          if (i > len - wdn) return null;
          return sum(rows.slice(i, i + wdn)) / wdn;
        });
      }
    };

    return mvavg(
      series,
      window <= 0 ? 3 : window,
      !contains(['left', 'right', 'center'], position) ? 'center' : position
    );
  }
});