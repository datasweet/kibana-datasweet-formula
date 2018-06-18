import { TabbedAggResponseWriterProvider } from 'ui/agg_response/tabify/_response_writer';
import { AggResponseHiddenColumnsProvider } from './lib/apply_hidden';
import { AggResponseFormulaProvider } from './lib/apply_formula';
import { TableTotalFormulaProvider } from './lib/apply_formula_total';

export function decorateTabbedAggResponseWriterProvider(Private) {
  const TabbedAggResponseWriter = Private(TabbedAggResponseWriterProvider);
  const applyFormulas = Private(AggResponseFormulaProvider);
  const applyFormulaTotal = Private(TableTotalFormulaProvider);
  const applyHiddenCols = Private(AggResponseHiddenColumnsProvider);

  const responseFn = TabbedAggResponseWriter.prototype.response;
  TabbedAggResponseWriter.prototype.response = function () {
    const resp = responseFn.apply(this, arguments);
    applyFormulas(this.columns, resp);
    applyFormulaTotal(this.columns, resp);
    applyHiddenCols(this.columns, resp);
    return resp;
  };
};
