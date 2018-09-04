/**
 * Organizes columns in column groups.
 * This is used when `vis.isHierarchical()` returns true,
 *  usually when calculating metrics for every bucket/level.
 * @param {*} columns
 * @param {*} vis
 */
export function applyColumnGroups(columns, vis) {
  const isUsingFormula = !!vis.aggs.byTypeName.datasweet_formula;
  if (!isUsingFormula || isUsingFormula && !vis.isHierarchical()) return;
  let columnGroup = 0;
  columns = columns.map(c => {
    if (c.aggConfig.type.type === 'buckets') columnGroup++;
    c.columnGroup = columnGroup;
    return c;
  });
}
