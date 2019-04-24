import { capitalize, map } from 'lodash';
import { MetricAggType } from 'ui/agg_types/metrics/metric_agg_type';
import { fieldFormats } from 'ui/registry/field_formats';
import formulaEditor from './formula.html';
import formatterEditor from './formatter.html';

const formatters = map(['number', 'percent', 'boolean', 'bytes', 'numeral'], f => {
  return { id: f, title: capitalize(f) };
});

export const formulaMetricAgg = new MetricAggType({
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
    return null;
  }
});
