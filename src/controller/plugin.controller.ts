import { Next } from 'koa';
import { Context } from '../app';
import pluginService from '../service/plugin.service';

class PluginController {
  async list(ctx: Context, next: Next) {
    const list = pluginService.getPluginList();

    ctx.result = {
      data: {
        list,
      },
      message: '获取成功',
    };
    return next();
  }
}

export default new PluginController();
