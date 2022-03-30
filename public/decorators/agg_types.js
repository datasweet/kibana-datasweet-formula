import { formulaMetricAgg } from '../agg_types/formula';
import { getDataSetup } from '../services';

export function decorateAggTypes() {
  formulaMetricAgg.type = 'metrics';
  getDataSetup().search.aggs.types.registerMetric(formulaMetricAgg.name, () => formulaMetricAgg);
}
