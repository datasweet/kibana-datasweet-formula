import { TabbedAggResponseWriter } from 'ui/agg_response/tabify/_response_writer';
import { applyColumnGroups } from './lib/apply_column_groups';
import { applyFormula } from './lib/apply_formula';
import { applyHiddenCols } from './lib/apply_hidden_cols';

export function decorateTabbedAggResponseWriter() {
  const responseFn = TabbedAggResponseWriter.prototype.response;
  TabbedAggResponseWriter.prototype.response = function () {
    const resp = responseFn.apply(this, arguments);
    const metricsForAllBuckets = this.metricsForAllBuckets;
    applyColumnGroups(this.columns, metricsForAllBuckets);
    applyFormula(this.columns, resp);
    applyHiddenCols(this.columns, resp);
    return resp;
  };
};
