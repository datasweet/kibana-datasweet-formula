import { find } from 'lodash';

/**
 * Organizes columns in column groups.
 * This is used when `vis.isHierarchical()` returns true,
 *  usually when calculating metrics for every bucket/level.
 * @param {*} columns
 * @param {*} isHierarchical
 */

export function applyColumnGroups(columns, isHierarchical) {
  if (!isHierarchical) return;

  // Do we have datasweet_formula ?
  const isUsingFormula = find(columns, 'aggConfig.type.name', 'datasweet_formula') !== undefined;
  if (!isUsingFormula) return;

  let columnGroup = 0;
  columns = columns.map(c => {
    if (c.aggConfig.type.type === 'buckets') columnGroup++;
    c.columnGroup = columnGroup;
    return c;
  });
}
