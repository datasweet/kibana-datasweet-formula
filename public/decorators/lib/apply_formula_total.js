import { each, find, get, isEmpty } from 'lodash';
import { FormulaParserProvider } from './formula_parser';

export function TableTotalFormulaProvider(Private)  {
  const aggTypeFormulaId = 'datasweet_formula';
  const FormulaParser = Private(FormulaParserProvider);
  const parser = new FormulaParser(true);
  const varPrefix = 'agg';
  const prefixRegExpr = new RegExp(varPrefix, 'g');

  function hasFormulas(cols) {
    return find(cols, 'aggConfig.type.name', aggTypeFormulaId) !== undefined;
  }

  function extractSeriesAndFormulas(totals, cols) {
    const res = { series: {}, formulas:[] };

    each(cols, (c, colIndex)=> {
      const columnGroupPrefix = c.columnGroup != null ? `colGroup${c.columnGroup}_` : '';
      const key = columnGroupPrefix + varPrefix + c.aggConfig.id.replace('.', '_');

      // formula ?
      if (c.aggConfig.type.name === aggTypeFormulaId) {
        const f = get(c.aggConfig.params, 'formula', '')
          .trim()
          // Adds columnGroup to prefix
          .replace(prefixRegExpr, columnGroupPrefix + varPrefix);
        if (f.length > 0) {
          res.formulas.push({
            colIndex,
            key,
            compiled: (f.length > 0 ? parser.parse(f) : null)
          });
        }
        res.series[key] = null;
      }

      // series
      else {
        // TODO: analyze all formulas to build dependencies
        res.series[key] = {
          sum: totals[colIndex].sum,
          avg: totals[colIndex].avg
        };
      }
    });

    return res;
  };

  function compute(datas) {
    const computed = {};
    each(datas.formulas, f => {
      let res = null;
      try {
        const sumSeries = Object.keys(datas.series).reduce((obj, id) => {
          obj[id] = datas.series[id] && datas.series[id].sum;
          return obj;
        }, {});

        const avgSeries = Object.keys(datas.series).reduce((obj, id) => {
          obj[id] = datas.series[id] && datas.series[id].avg;
          return obj;
        }, {});

        res = {
          sum: f.compiled.evaluate(sumSeries),
          avg: f.compiled.evaluate(avgSeries)
        };

        computed[f.colIndex] = res;
      } catch (e) {
        res = null;
        // console.log('ERROR', e);
      }
      datas.series[f.key] = res;
    });
    return computed;
  };

  function applyColumnTotals(table, columns) {
    table.totals = columns.reduce((arr, col, i) => {
      const sum = tableRows => tableRows.reduce((prev, curr) => {
        // some metrics return undefined for some of the values
        // derivative is an example of this as it returns undefined in the first row
        const v = get(curr[i], 'value');
        if (v === undefined) return prev;
        return prev + v;
      }, 0);

      arr[i] = {
        sum: sum(table.rows),
        avg: sum(table.rows) / table.rows.length
      };
      return arr;
    }, []);
  }

  function mutate(table, columns) {
    if (table.tables) {
      table.tables.forEach(t => mutate(t, columns));
    } else {
      applyColumnTotals(table, columns);
      const datas = extractSeriesAndFormulas(table.totals, columns);

      // Compute and stocks
      const computed = compute(datas);

      // Applys
      if (!isEmpty(computed)) {
        each(computed, (data, colIndex) => {
          table.totals[colIndex] = {
            sum: data.sum,
            avg: data.avg
          };
        });
      }
    }
  };

  return function apply(columns, resp) {
    if (columns.length === 0  || resp.length === 0 || !hasFormulas(columns)) return;
    mutate(resp, columns);
  };
};
