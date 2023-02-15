import { Next } from 'koa';
import { Context, SourceError } from '../app';
import botService from '../service/bot.service';

export async function verifyOnline(ctx: Context, next: Next) {
  const { uin } = ctx.request.body ?? {};
  const bot = botService.getBot(uin);
  const is_online = bot.isOnline();

  if (!is_online) {
    throw new SourceError(409, '该 bot 未登录');
  }
  await next();
}

export async function verifyKey(ctx: Context, next: Next) {
  const { KOKKORO_API_KEY } = process.env;
  const { api_key } = ctx.request.body ?? {};

  if (KOKKORO_API_KEY && (KOKKORO_API_KEY !== api_key)) {
    throw new SourceError(403, '无效的 api key');
  }
  await next();
}

export async function verifyUin(ctx: Context, next: Next) {
  const { uin } = ctx.request.body ?? {};

  if (!uin) {
    throw new SourceError(403, 'uin 不能为空');
  }
  await next();
}

export async function verifyPrivateMsg(ctx: Context, next: Next) {
  const { user_id, message } = ctx.request.body ?? {};

  if (!user_id || !message) {
    throw new SourceError(403, '参数不能为空');
  }
  await next();
}

export async function verifyGroupMsg(ctx: Context, next: Next) {
  const { group_id, message } = ctx.request.body ?? {};

  if (!group_id || !message) {
    throw new SourceError(403, '参数不能为空');
  }
  await next();
}
