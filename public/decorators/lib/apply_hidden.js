import { includes, each, reject } from 'lodash';

export function AggResponseHiddenColumnsProvider() {
  function mutate(table, hiddenCols) {
    if (table.tables) {
      table.tables.forEach(t => mutate(t, hiddenCols));
    } else {
      table.columns = reject(table.columns, c => includes(hiddenCols, c.id));
    }
  };

  return function apply(columns, resp) {
    const hiddenCols = [];
    each(columns, c => {
      if (c.aggConfig.hidden) hiddenCols.push(c.id);
    });
    if (hiddenCols.length > 0) mutate(resp, hiddenCols);
  };
}