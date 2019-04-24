import chrome from 'ui/chrome';
import { uiModules } from 'ui/modules';
import { applyFormulaTotal } from './lib/apply_formula_total';
const appId = chrome.getApp().id;

// Defines the $scope.totalFunc allowed to perform the calculations
const TOTAL_FUNCTIONS_ALLOWED = ['sum', 'avg'];

// Only inject decorator on kibana app
if (appId === 'kibana') {
  uiModules
    .get('kibana')
    .config(($provide) => {
      // Decorates kbnAggTable default directive
      $provide.decorator('kbnAggTableDirective', ($delegate, $controller) => {
        const directive = $delegate[0];
        const controllerName = directive.controller;

        directive.controller = function ($scope) {
          angular.extend(this, $controller(controllerName, { $scope: $scope }));

          // This will run after $scope.$watch('table') from default controller
          $scope.$watch('table', () => {
            const table = $scope.table;

            // Validations
            if (!table) return;
            const hasColumns = !!table.columns.length;

            // Formatters
            let hasFormulas = false;
            table.columns.forEach((col, i) => {
              if (col.aggConfig.type.name !== 'datasweet_formula') {
                return;
              }
              hasFormulas = true;
              $scope.formattedColumns[i].formatter = { convert: col.aggConfig.fieldFormatter('text') };
            });

            // Total
            const isTotalFunctionAllowed = $scope.showTotal && TOTAL_FUNCTIONS_ALLOWED.includes($scope.totalFunc);
            const shouldApplyFormula = hasColumns && hasFormulas && isTotalFunctionAllowed;
            if (!shouldApplyFormula) return;
            applyFormulaTotal(table, $scope);
          });
        };

        return $delegate;
      });
    });
}
