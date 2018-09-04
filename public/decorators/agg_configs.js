import * as prov from 'ui/vis/agg_configs';

export function decorateVisAggConfigsProvider(Private) {
  const AggConfigs = prov.AggConfigs || Private(prov.VisAggConfigsProvider);

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
  AggConfigs.prototype.toDsl = function () {
    const isUsingFormula = !!this.vis.aggs.byTypeName.datasweet_formula;
    const dsl = toDslFn.apply(this, arguments);
    // Removes empty `datasweet_formula` aggs from dsl query if needed.
    //  This happens when `vis.isHierarchical()` returns true
    return isUsingFormula && this.vis.isHierarchical() ? removeEmptyValues(dsl) : dsl;
  };
};
