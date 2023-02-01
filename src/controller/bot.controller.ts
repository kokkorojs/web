import { Next } from 'koa';
import { Context } from '../app';
import botService from '../service/bot.service';

class BotController {
  async list(ctx: Context, next: Next) {
    const list = botService.getBotList();

    ctx.result = {
      data: {
        list,
      },
      message: '获取成功',
    };
    return next();
  }

  async login(ctx: Context, next: Next) {
    const { uin } = ctx.request.body;
    const result = await botService.loginBot(uin);

    if (result.data.status) {
      ctx.result = result;
    } else {
      ctx.result = {
        data: {
          uin,
        },
        message: '登录成功',
      };
    }
    return next();
  }

  async logout(ctx: Context, next: Next) {
    const { uin } = ctx.request.body;
    const result = await botService.logoutBot(uin);

    ctx.result = {
      data: {
        uin,
      },
      message: '登出成功',
    };
    return next();
  }

  async queryQrcodeResult(ctx: Context, next: Next) {
    const { uin } = ctx.request.body;
    const result = await botService.queryQrcodeResult(uin);

    ctx.result = {
      data: result,
      message: '获取成功',
    };
    return next();
  }
}

export default new BotController();
