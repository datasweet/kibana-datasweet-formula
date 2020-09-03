import { get } from 'lodash';
import { uiModules } from  'ui/modules';
import chrome from 'ui/chrome';
import { decorateVisAggConfig } from './decorators/agg_config';
import { decorateVisAggConfigs } from './decorators/agg_configs';
import { decorateAggTypes } from './decorators/agg_types';
import { decorateTabbedAggResponseWriter} from './decorators/response_writer';
import './decorators/agg_table';


const appId = get(chrome.getApp(), 'id');

// Only inject decorator on kibana app
if (appId === 'kibana' || appId === 'dashboardViewer') {

  uiModules
    .get('datasweet/formula', ['kibana'])
    .run(() => {
      decorateVisAggConfig();
      decorateVisAggConfigs();
      decorateAggTypes();
      decorateTabbedAggResponseWriter();
    });
}
