import { capitalize, map } from 'lodash';
import { MetricAggType } from 'ui/agg_types/metrics/metric_agg_type';
import { fieldFormats } from 'ui/registry/field_formats';
import { FormulaParamEditor } from './formula_param_editor.tsx';
import { FormatterParamEditor } from './formatter_param_editor.tsx';
import { formatter } from './formatter';

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
      editorComponent: FormulaParamEditor
    },
    {
      name: 'formatter',
      editorComponent: FormatterParamEditor,
      default: formatter('number'),
      options: {
        formatters
      },
    }
  ],
  getFormat: function (agg) {
    const formatterId = agg.params.formatter.id;
    if (!formatterId) {
      return fieldFormats.getDefaultInstance('number');
    }

    if (formatterId === 'numeral') {
      const format =  agg.params.formatter.params.pattern;
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
