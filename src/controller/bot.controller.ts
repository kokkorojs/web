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

    if (result.status) {
      ctx.result = {
        data: result,
      };
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

  async getFriendList(ctx: Context, next: Next) {
    const { uin } = ctx.request.body;
    const list = botService.getFriendList(uin);

    ctx.result = {
      data: {
        list,
      },
      message: '获取成功',
    };
    return next();
  }

  async getGroupList(ctx: Context, next: Next) {
    const { uin } = ctx.request.body;
    const list = botService.getGroupList(uin);

    ctx.result = {
      data: {
        list,
      },
      message: '获取成功',
    };
    return next();
  }

  async sendPrivateMsg(ctx: Context, next: Next) {
    const { uin, user_id, message, source } = ctx.request.body;
    const data = await botService.sendPrivateMsg(uin, user_id, message, source);

    ctx.result = {
      data,
      message: '发送成功',
    };
    return next();
  }

  async sendGroupMsg(ctx: Context, next: Next) {
    const { uin, group_id, message, source } = ctx.request.body;
    const data = await botService.sendGroupMsg(uin, group_id, message, source);

    ctx.result = {
      data,
      message: '发送成功',
    };
    return next();
  }
}

export default new BotController();
