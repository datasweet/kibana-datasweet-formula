import { FormulaFunction } from './formula_function';
import { isArray, map } from 'lodash';

export default new FormulaFunction('if', {
  help: 'Conditional test of a serie.',
  fn: function (cond, yes, no) {
    if (isArray(cond)) {
      const byes = isArray(yes);
      const bno = isArray(no);
      return map(cond, (r,i) => {
        if (r) {
          return byes ? yes[i] || null : yes;
        } else {
          return bno ? no[i] || null : no;
        }
      });
    } else {
      return cond ? yes : no;
    }
  }
});