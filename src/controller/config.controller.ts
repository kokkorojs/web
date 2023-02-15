import { Next } from 'koa';
import { Context } from '../app';
import configService from '../service/config.service';

class ConfigController {
  async kokkoro(ctx: Context, next: Next) {
    const data = configService.getKokkoroConfig();

    ctx.result = {
      data,
      message: '获取成功',
    };
    return next();
  }
}

export default new ConfigController();
