import { map } from 'lodash';
import { AggTypesMetricsMetricAggTypeProvider } from 'ui/agg_types/metrics/metric_agg_type';
import * as prov from 'ui/registry/field_formats';
import formulaEditor from './formula.html';
import formatterEditor from './formatter.html';


export function AggTypesMetricsFormulaProvider(Private) {
  const MetricAggType = Private(AggTypesMetricsMetricAggTypeProvider);
  const fieldFormats = prov.fieldFormats || Private(prov.RegistryFieldFormatsProvider);
  const defaultValue = null;
  const formatters = map(['number', 'percent', 'boolean', 'bytes'], fieldFormats.getType);

  return new MetricAggType({
    name: 'datasweet_formula',
    title: 'Datasweet Formula',
    subtype: 'Calculated Metrics',
    hasNoDsl: true,
    makeLabel: function (aggConfig) {
      return 'Formula ' + aggConfig.id;
    },
    params: [
      {
        name: 'formula',
        editor: formulaEditor,
      },
      {
        name: 'formatter',
        editor: formatterEditor,
        getFormatters: function () {
          return formatters;
        }
      }
    ],
    getFormat: function (agg) {
      const formatterId = agg.params.formatter;
      return formatterId ? fieldFormats.getInstance(formatterId) : fieldFormats.getDefaultInstance('number');
    },
    getValue: function () {
      return defaultValue;
    }
  });
}
