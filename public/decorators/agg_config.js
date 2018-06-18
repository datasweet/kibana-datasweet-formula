import { isBoolean } from 'lodash';
import * as prov from 'ui/vis/agg_config';


export function decorateVisAggConfigProvider(Private) {
  const AggConfig = prov.AggConfig || Private(prov.VisAggConfigProvider);

  Object.defineProperty(AggConfig.prototype, 'hidden', {
    get: function () {
      if (isBoolean(this.__hidden)) return this.__hidden;           // current value
      if (isBoolean(this._opts.hidden)) return this._opts.hidden;   // init value
      return false;
    },
    set: function (hidden) {
      this.__hidden = hidden;
    }
  });

  const toJSONFn = AggConfig.prototype.toJSON;
  AggConfig.prototype.toJSON = function () {
    const json = toJSONFn.apply(this, arguments);
    json.hidden = this.hidden;
    return json;
  };
};