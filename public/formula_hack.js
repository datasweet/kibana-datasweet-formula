import { uiModules } from  'ui/modules';
import { VisAggConfigProvider } from 'ui/vis/agg_config';

uiModules
  .get('datasweet/formula', ['kibana'])
  .run((Private) => {
    const AggConfig = Private(VisAggConfigProvider);
    console.log('HI from hack', AggConfig);
  });