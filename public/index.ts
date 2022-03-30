import { PluginInitializerContext } from '../../../src/core/public';
import { DatasweetFormulaPlugin } from './plugin';

export function plugin(context: PluginInitializerContext) {
  return new DatasweetFormulaPlugin();
}
