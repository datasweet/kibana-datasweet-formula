import { uiModules } from 'ui/modules';
import { TableTotalFormulaProvider } from './lib/apply_formula_total';

// Defines the $scope.totalFunc allowed to perform the calculations
const TOTAL_FUNCTIONS_ALLOWED = ['sum', 'avg'];

uiModules
  .get('kibana')
  .config(($provide) => {
    // Decorates kbnAggTable default directive
    $provide.decorator('kbnAggTableDirective', ($delegate, $controller) => {
      const directive = $delegate[0];
      const controllerName = directive.controller;

      directive.controller = function($scope, Private) {
        angular.extend(this, $controller(controllerName, { $scope: $scope }));
        const applyFormula = Private(TableTotalFormulaProvider);

        // This will run after $scope.$watch('table') from default controller
        $scope.$watch('table', () => {
          const table = $scope.table;

          // Validations
          const hasColumns = !!table.columns.length;
          const hasFormulas = !!table.columns.find(c => c.aggConfig.type.name === 'datasweet_formula');
          const isTotalFunctionAllowed = $scope.showTotal && TOTAL_FUNCTIONS_ALLOWED.includes($scope.totalFunc);
          const shouldApplyFormula = hasColumns && hasFormulas && isTotalFunctionAllowed;
          if (!shouldApplyFormula) return;

          // Adds some attributes to every $scope.formattedColumns element
          $scope.formattedColumns = table.columns.map(function (col, i) {
            const formattedColumn = $scope.formattedColumns[i];
            const agg = table.aggConfig(col);
            const field = agg.getField();
            const isFieldDate = field && field.type === 'date';
            const sum = tableRows => tableRows.reduce((prev, curr) => {
              // some metrics return undefined for some of the values
              // derivative is an example of this as it returns undefined in the first row
              if (curr[i].value === undefined) return prev;
              return prev + curr[i].value;
            }, 0);
            
            // Adds formatter into formattedColumn
            formattedColumn.formatter = agg.fieldFormatter('text');

            // Adds totalRaw into formattedColumn
            if (!isFieldDate) {
              switch ($scope.totalFunc) {
                case 'sum':
                  formattedColumn.totalRaw = sum(table.rows);
                  break;
                case 'avg':
                  formattedColumn.totalRaw = sum(table.rows) / table.rows.length;
                  break;
                default:
                  break;
              }
            }

            return formattedColumn;
          });

          // Applies formula
          applyFormula($scope.formattedColumns, table.columns);
        });
      };

      return $delegate;
    });
  });
