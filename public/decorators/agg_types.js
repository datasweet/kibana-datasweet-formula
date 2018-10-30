import * as prov from 'ui/agg_types';
import { AggTypesMetricsFormulaProvider } from 'plugins/datasweet_formula/agg_types/formula';

export function decorateAggTypes(Private) {
  const AggTypes = prov.aggTypes || Private(prov.AggTypesIndexProvider);
  const AggFormula = Private(AggTypesMetricsFormulaProvider);
  AggFormula.type = 'metrics';
  AggTypes.push(AggFormula);
};