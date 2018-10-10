import * as prov from 'ui/agg_response/tabify/_response_writer';
import { AggResponseHiddenColumnsProvider } from './lib/apply_hidden';
import { AggResponseFormulaProvider } from './lib/apply_formula';
import { TableTotalFormulaProvider } from './lib/apply_formula_total';
import { applyColumnGroups } from './lib/apply_column_groups';

export function decorateTabbedAggResponseWriterProvider(Private) {
  const TabbedAggResponseWriter = prov.TabbedAggResponseWriter || Private(prov.TabbedAggResponseWriterProvider);
  const applyFormulas = Private(AggResponseFormulaProvider);
  const applyFormulaTotal = Private(TableTotalFormulaProvider);
  const applyHiddenCols = Private(AggResponseHiddenColumnsProvider);

  const responseFn = TabbedAggResponseWriter.prototype.response;
  TabbedAggResponseWriter.prototype.response = function () {
    const resp = responseFn.apply(this, arguments);
    const metricsForAllBuckets = (!!this.vis ? this.vis.isHierarchical() : this.metricsForAllBuckets);
    applyColumnGroups(this.columns, metricsForAllBuckets);
    applyFormulas(this.columns, resp);
    applyFormulaTotal(this.columns, resp);
    applyHiddenCols(this.columns, resp);
    return resp;
  };
};
