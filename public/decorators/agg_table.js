import chrome from 'ui/chrome';
import { uiModules } from 'ui/modules';
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
            const hasFormulas = !!table.columns.find(c => c.aggConfig.type.name === 'datasweet_formula');
            const isTotalFunctionAllowed = $scope.showTotal && TOTAL_FUNCTIONS_ALLOWED.includes($scope.totalFunc);
            const shouldApplyFormula = hasColumns && hasFormulas && isTotalFunctionAllowed;
            if (!shouldApplyFormula) return;

            // Overrides formattedColumn.total if needed
            $scope.formattedColumns = table.columns.map(function (col, i) {
              const formattedColumn = $scope.formattedColumns[i];
              const agg = table.aggConfig(col);
              const field = agg.getField();
              const isFieldDate = field && field.type === 'date';
              const hasFormula = agg.type && agg.type.name === 'datasweet_formula';
              if (isFieldDate || !hasFormula) return formattedColumn;

              const formatter = agg.fieldFormatter('text');
              const totalRaw = table.totals[i][$scope.totalFunc];
              formattedColumn.total = formatter(totalRaw);

              return formattedColumn;
            });
          });
        };

        return $delegate;
      });
    });
}
