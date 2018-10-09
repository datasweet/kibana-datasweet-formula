import { capitalize, map } from 'lodash';
import * as magprov from 'ui/agg_types/metrics/metric_agg_type';
import * as ffprov from 'ui/registry/field_formats';
import formulaEditor from './formula.html';
import formatterEditor from './formatter.html';

export function AggTypesMetricsFormulaProvider(Private) {
  const MetricAggType = magprov.MetricAggType || Private(magprov.AggTypesMetricsMetricAggTypeProvider);
  const fieldFormats = ffprov.fieldFormats || Private(ffprov.RegistryFieldFormatsProvider);
  const defaultValue = null;
  const formatters = map(['number', 'percent', 'boolean', 'bytes', 'numeral'], f => {
    return { id: f, title: capitalize(f) };
  });

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
      },
      {
        name: 'numeralFormat'
      }
    ],
    getFormat: function (agg) {
      const formatterId = agg.params.formatter;

      if (!formatterId) {
        return fieldFormats.getDefaultInstance('number');
      }

      if (formatterId === 'numeral') {
        const format =  agg.params.numeralFormat;
        if (!format) {
          return fieldFormats.getDefaultInstance('number');
        }

        const FieldFormat = fieldFormats.getType('number');
        const f = new FieldFormat({ pattern: format });
        return f;
      }

      return fieldFormats.getInstance(formatterId);
    },
    getValue: function () {
      return defaultValue;
    }
  });
}
