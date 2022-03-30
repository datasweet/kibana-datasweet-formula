import { createGetterSetter } from '../../../src/plugins/kibana_utils/common';
import { DataPublicPluginSetup } from '../../../src/plugins/data/public';

export const [getDataSetup, setDataSetup] = createGetterSetter<DataPublicPluginSetup>('DataSetup');
