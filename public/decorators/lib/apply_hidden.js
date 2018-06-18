import { includes, each, map, reject } from 'lodash';

export function AggResponseHiddenColumnsProvider() {
  function mutate(table, hiddenCols) {
    if (table.tables) {
      table.tables.forEach(t => mutate(t, hiddenCols));
    } else {
      table.columns = reject(table.columns, (c, i) => includes(hiddenCols, i));
      table.totals = reject(table.totals, (c, i) => includes(hiddenCols, i));
      table.rows = map(table.rows, row => reject(row, (r, i) => includes(hiddenCols, i)));
    }
  };

  return function apply(columns, resp) {
    const hiddenCols = [];
    each(columns, (c, i) => {
      if (c.aggConfig.hidden) hiddenCols.push(i);
    });
    if (hiddenCols.length > 0) mutate(resp, hiddenCols);
  };
}