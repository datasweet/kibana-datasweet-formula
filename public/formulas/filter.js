import { FormulaFunction } from './formula_function';
import { isArray, map } from 'lodash';

export default new FormulaFunction('filter', {
  help: 'Filter a value.',
  fn: function (value, filter) {
    const impl = (v, f) => {
      switch ((f || '').toLowerCase()) {
        case 'infinity':
          return (v === Infinity ? null : v);
        case 'negative':
          return (v < 0 ? null : v);
        case 'positive':
          return (v > 0 ? null : v);
        case 'zero':
          return (v === 0 ? null : v);
      }
      return v;
    };

    if (isArray(value)) {
      return map(value, r => impl(r, filter));
    } else {
      return impl(value, filter);
    }
  }
});