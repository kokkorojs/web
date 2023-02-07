import { deepClone } from '@kokkoro/utils';
import { getPluginList } from 'kokkoro';

class PluginService {
  getPluginList() {
    const pluginList = getPluginList();
    const plugins = [] as any[];

    pluginList.forEach((plugin) => {
      const { info } = plugin;
      const element = {
        info,
      };

      plugins.push(element);
    });
    return plugins;
  }
}

export default new PluginService();
