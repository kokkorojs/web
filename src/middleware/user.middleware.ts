import { Next } from 'koa';
import { Context, SourceError } from '../app';
import userService from '../service/user.service';

export async function verifyLogin(ctx: Context, next: Next) {
  const { account, password } = ctx.request.body ?? {};
  const id = userService.loginUser(account, password);

  if (!id) {
    throw new SourceError(403, '用户名或密码错误');
  }
  ctx.request.body.id = id;

  await next();
}

export async function verifyRegister(ctx: Context, next: Next) {
  const { account, password } = ctx.request.body ?? {};

  if (!account || !password) {
    throw new SourceError(403, '用户名与密码不能为空');
  }
  const has_user = userService.hasUser(account);

  if (has_user) {
    throw new SourceError(409, '用户名已被注册');
  }
  await next();
}
