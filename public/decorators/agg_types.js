import { AggTypesIndexProvider } from 'ui/agg_types';
import { AggTypesMetricsFormulaProvider } from 'plugins/datasweet_formula/agg_types/formula';

export function decorateAggTypes(Private) {
  const AggTypes = Private(AggTypesIndexProvider);
  const AggFormula = Private(AggTypesMetricsFormulaProvider);
  AggFormula.type = 'metrics';
  AggTypes.push(AggFormula);
};