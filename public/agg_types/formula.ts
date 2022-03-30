import { capitalize, map } from 'lodash';
import { MetricAggType, fieldFormats } from '../../../../src/plugins/data/public';
import { FormulaParamEditor } from './formula_param_editor';
import { FormatterParamEditor } from './formatter_param_editor';
import { formatter } from './formatter';

const formatters = map(['number', 'percent', 'boolean', 'bytes', 'numeral'], (f) => {
  return { id: f, title: capitalize(f) };
});

export const formulaMetricAgg = new MetricAggType({
  name: 'datasweet_formula',
  title: 'Datasweet Formula',
  subtype: 'Calculated Metrics',
  hasNoDsl: true,
  makeLabel(aggConfig) {
    return 'Formula ' + aggConfig.id;
  },
  params: [
    {
      name: 'formula',
      editorComponent: FormulaParamEditor,
    },
    {
      name: 'formatter',
      type: 'optioned',
      editorComponent: FormatterParamEditor,
      default: formatter('number'),
      options: formatters,
    },
  ],
  getSerializedFormat: (agg: any) => {
    const formatterId = agg.params.formatter.id;
    if (!formatterId) {
      return fieldFormats.NumberFormat;
    }

    if (formatterId === 'numeral') {
      const format = agg.params.formatter.params.pattern;
      if (!format) {
        return fieldFormats.NumberFormat;
      }

      const FieldFormat = fieldFormats.NumberFormat;
      const f = new FieldFormat({ pattern: format });
      return f;
    }
    return fieldFormats.NumberFormat;
  },
  getValue: () => {
    return null;
  },
});
