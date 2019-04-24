import { each, get, isEmpty } from 'lodash';
import { formulaParser } from './formula_parser';

const aggTypeFormulaId = 'datasweet_formula';
const varPrefix = 'agg';
const prefixRegExpr = new RegExp(varPrefix, 'g');

function extractSeriesAndFormulas(table, $scope) {
  const res = { series: {}, formulas:[] };

  each(table.columns, (c, i) => {
    const formattedColumn = $scope.formattedColumns[i];
    const colIndex = i;
    const colId = c.id;
    const columnGroupPrefix = c.columnGroup != null ? `colGroup${c.columnGroup}_` : '';
    const key = columnGroupPrefix + varPrefix + c.aggConfig.id.replace('.', '_');

    // formula
    if (c.aggConfig.type.name === aggTypeFormulaId) {
      // reset total computed by kibana
      formattedColumn.total = undefined;

      // analyze formula
      const f = get(c.aggConfig.params, 'formula', '')
        .trim()
        .replace(prefixRegExpr, columnGroupPrefix + varPrefix);
      if (f.length > 0) {
        res.formulas.push({
          colIndex,
          key,
          formatter: c.aggConfig.fieldFormatter('text'),
          compiled: (f.length > 0 ? formulaParser.parse(f) : null)
        });
      }
      res.series[key] = null;
    }

    // not an metric
    else if (isEmpty(formattedColumn.total)) {
      res.series[key] = undefined;
    } 

    // we recompute the total
    else {
      function sum(tableRows) {
        return _.reduce(tableRows, function (prev, curr) {
          const v = curr[colId] || 0;
          return prev + v;
        }, 0);
      }

      switch ($scope.totalFunc) {
        case 'sum':
          res.series[key] = sum(table.rows);
          break;
        case 'avg':
          res.series[key] = sum(table.rows) / table.rows.length;
          break;
        default:
          res.series[key] = null;
          break;
      }
    }
  });

  return res;
}

function compute(datas, $scope) {
  each(datas.formulas, f => {
    try {
      const res = f.compiled.evaluate(datas.series);
      datas.series[f.key] = res;
      $scope.formattedColumns[f.colIndex].total = f.formatter(res);
    }catch (e) {
      // console.log('ERROR', e);
    }
  });
}

export function applyFormulaTotal(table, $scope) {
  const datas = extractSeriesAndFormulas(table, $scope);
  compute(datas, $scope);
}
