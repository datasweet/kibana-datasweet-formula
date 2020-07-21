import { isBoolean } from 'lodash';
import { AggConfig } from 'ui/agg_types/agg_config';


export function decorateVisAggConfig() {
  Object.defineProperty(AggConfig.prototype, 'hidden', {
    get: function () {
      if (isBoolean(this.__hidden)) return this.__hidden;           // current value
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
