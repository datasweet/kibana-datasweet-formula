import { find } from 'lodash';

/**
 * Organizes columns in column groups.
 * This is used when 'Calculate metrics for every bucket/level' option is checked.
 * @param {*} columns
 * @param {boolean} metricsForAllBuckets
*/
export function applyColumnGroups(columns, metricsForAllBuckets) {
  if (!metricsForAllBuckets) return;

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
