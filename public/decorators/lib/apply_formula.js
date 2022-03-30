import { each, find, get, isArray, isEmpty, map } from 'lodash';
import { formulaParser } from './formula_parser';

const aggTypeFormulaId = 'datasweet_formula';
const varPrefix = 'agg';
const prefixRegExpr = new RegExp(varPrefix, 'g');

function hasFormulas(cols) {
  return find(cols, 'aggConfig.type.name', aggTypeFormulaId) !== undefined;
}

function extractSeriesAndFormulas(rows, cols) {
  const res = { series: {}, formulas: [] };

  each(cols, (c) => {
    const colId = c.id;
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
          colId,
          key,
          compiled: f.length > 0 ? formulaParser.parse(f) : null,
        });
      }
      res.series[key] = null;
    }

    // series.
    else {
      // TODO: analyze all formulas to build dependencies
      res.series[key] = map(rows, (r) => r[colId]);
    }
  });

  return res;
}

function compute(datas) {
  const computed = {};
  each(datas.formulas, (f) => {
    let res = null;
    try {
      res = f.compiled.evaluate(datas.series);
      computed[f.colId] = { value: res, isArray: isArray(res) };
    } catch (e) {
      res = null;
      // console.log('ERROR', e);
    }
    datas.series[f.key] = res;
  });
  return computed;
}

function mutate(table, columns) {
  if (table.tables) {
    table.tables.forEach((t) => mutate(t, columns));
  } else {
    const datas = extractSeriesAndFormulas(table.rows, columns);

    // Compute and stocks
    const computed = compute(datas);

    // Apply
    if (!isEmpty(computed)) {
      each(table.rows, (row, i) => {
        each(computed, (data, colId) => {
          const value = data.isArray ? data.value[i] || null : data.value;
          row[colId] = value;
        });
      });
    }
  }
}

export function applyFormula(columns, resp) {
  if (columns.length === 0 || resp.length === 0 || !hasFormulas(columns)) return;
  mutate(resp, columns);
}
