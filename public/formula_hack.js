import { reduce } from 'lodash';
import { uiModules } from  'ui/modules';
import chrome from 'ui/chrome';
import { decorateVisAggConfigProvider } from './decorators/agg_config';
import { decorateVisAggConfigsProvider } from './decorators/agg_configs';
import { decorateAggTypes } from './decorators/agg_types';
import { decorateTabbedAggResponseWriterProvider } from './decorators/response_writer';
import hiddenTpl from './decorators/agg_hidden.html';
import titleTpl from './decorators/agg_title.html';
import './decorators/agg_table';


const appId = chrome.getApp().id;

// Only inject decorator on kibana app
if (appId === 'kibana' || appId === 'dashboardViewer') {

  uiModules
    .get('datasweet/formula', ['kibana'])
    .run((Private) => {
      decorateVisAggConfigProvider(Private);
      decorateVisAggConfigsProvider(Private);
      decorateAggTypes(Private);
      decorateTabbedAggResponseWriterProvider(Private);
    });

  uiModules
    .get('app/visualize')
    .config(($provide) => {
      $provide.decorator('visEditorAggDirective', ($delegate) => {
        // Original
        const linkFn = $delegate[0].link;
        const tpl = $delegate[0].template;

        // Inject template
        $delegate[0].template = tpl
          .replace(/<!-- title -->[\s\S]*?<\/span>/m, titleTpl)
          .replace('<!-- disable aggregation -->', hiddenTpl);

        // Inject new function in scope
        $delegate[0].compile = function () {
          return function newLinkFn($scope) {
            linkFn.apply($delegate[0], arguments);

            $scope.canHide = function (aggregation) {
              const metricCount = reduce($scope.group, function (count, agg) {
                return (agg.schema.name === aggregation.schema.name && !agg.hidden) ? ++count : count;
              }, 0);
              return metricCount > 1;
            };
          };
        };

        // get rid of the old link function since we return a link function in compile
        delete $delegate[0].link;

        return $delegate;
      });
    });
}