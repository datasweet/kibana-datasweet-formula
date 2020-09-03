import { aggTypes } from 'ui/agg_types';
import { formulaMetricAgg } from 'plugins/datasweet_formula/agg_types/formula';

export function decorateAggTypes() {
  formulaMetricAgg.type = 'metrics';
  aggTypes.metrics.push(formulaMetricAgg);
};