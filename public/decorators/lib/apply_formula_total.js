import { each, get, isEmpty } from 'lodash';
import { FormulaParserProvider } from './formula_parser';

export function TableTotalFormulaProvider(Private)  {
  const aggTypeFormulaId = 'datasweet_formula';
  const FormulaParser = Private(FormulaParserProvider);
  const parser = new FormulaParser(true);
  const varPrefix = 'agg';

  function extractSeriesAndFormulas(formattedColumns, cols) {
    const res = { series: {}, formulas:[] };

    each(cols, (c, i)=> {
      const colIndex = i;
      const key = varPrefix + c.aggConfig.id.replace('.', '_');

      // formula ?
      if (c.aggConfig.type.name === aggTypeFormulaId) {
        const f = get(c.aggConfig.params, 'formula', '').trim();
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
        res.series[key] = formattedColumns[colIndex].totalRaw;
      }
    });

    return res;
  };

  function compute(datas) {
    const computed = {};
    each(datas.formulas, f => {
      let res = null;
      try {
        res = f.compiled.evaluate(datas.series);
        computed[f.colIndex] = res;
      } catch (e) {
        res = null;
        // console.log('ERROR', e);
      }
      datas.series[f.key] = res;
    });
    return computed;
  };

  function mutate(formattedColumns, columns) {
    const datas = extractSeriesAndFormulas(formattedColumns, columns);

    // Compute and stocks
    const computed = compute(datas);

    // Applys
    if (!isEmpty(computed)) {
      each(computed, (value, colIndex) => {
        formattedColumns[colIndex].totalRaw = value;
        formattedColumns[colIndex].total = formattedColumns[colIndex].formatter(value);
      });
    }
  };

  return function apply(formattedColumns, columns) {
    mutate(formattedColumns, columns);
  };
};
