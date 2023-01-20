import { Next } from 'koa';
import { Context, SourceError } from '../app';
import userService from '../service/user.service';

export async function verifyLogin(ctx: Context, next: Next) {
  const { account, password } = ctx.request.body ?? {};
  const user = userService.getUser(account);

  if (!user) {
    throw new SourceError(403, '用户名不存在');
  } else if (user.password !== password) {
    throw new SourceError(403, '密码错误');
  }
  await next();
}

export async function verifyRegister(ctx: Context, next: Next) {
  const { account, password } = ctx.request.body ?? {};

  if (!account || !password) {
    throw new SourceError(403, '用户名与密码不能为空');
  }
  const user = userService.getUser(account);

  if (user) {
    throw new SourceError(403, '用户名已存在');
  }
  await next();
}
