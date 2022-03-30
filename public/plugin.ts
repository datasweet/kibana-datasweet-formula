// @ts-ignore
import { decorateVisAggConfig } from './decorators/agg_config';
// @ts-ignore
import { decorateVisAggConfigs } from './decorators/agg_configs';
// @ts-ignore
import { decorateAggTypes } from './decorators/agg_types';
// @ts-ignore
import { decorateTabbedAggResponseWriter } from './decorators/response_writer';
import type { CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import { DataPublicPluginSetup } from '../../../src/plugins/data/public';
import { setDataSetup } from './services';

interface DatasweetPluginSetupDependencies {
  data: DataPublicPluginSetup;
}

export class DatasweetFormulaPlugin implements Plugin {
  constructor() {}

  setup(core: CoreSetup, { data }: DatasweetPluginSetupDependencies): Promise<void> | void {
    setDataSetup(data);
    decorateAggTypes();
    decorateVisAggConfig();
    decorateVisAggConfigs();
    decorateTabbedAggResponseWriter();
  }

  start(core: CoreStart): Promise<void> | void {}

  stop(): void {}
}
