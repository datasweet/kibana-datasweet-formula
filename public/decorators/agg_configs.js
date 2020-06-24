import { AggConfigs } from '../../../../src/legacy/ui/public/agg_types';

export function decorateVisAggConfigs() {
  /**
   * Recursively removes undefined values from object.
   * @param {*} obj
   */
  function removeEmptyValues(obj) {
    return Object.keys(obj)
      .filter(k => obj[k] != null) // Filters out undefined and null objects
      .reduce((newObj, k) => {
        // Recursive call for arrays
        if (Array.isArray(obj[k])) return { ...newObj, [k]: obj[k].map(removeEmptyValues) };
        // Recursive call for objects
        return typeof obj[k] === 'object' ?
          { ...newObj, [k]: removeEmptyValues(obj[k]) } :
          { ...newObj, [k]: obj[k] };
      }, {});
  }

  const toDslFn = AggConfigs.prototype.toDsl;
  AggConfigs.prototype.toDsl = function (hierarchical = false) {
    const isUsingFormula = !!this.byTypeName.datasweet_formula;
    const dsl = toDslFn.apply(this, arguments);
    return isUsingFormula && hierarchical ? removeEmptyValues(dsl) : dsl;
  };
};
