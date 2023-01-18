import { Next } from 'koa';
import jwt from 'jsonwebtoken';
import { Context, SourceError } from '../app';

export default async function authHandler(ctx: Context, next: Next) {
  const { authorization } = ctx.header;
  const token = authorization?.replace('Bearer ', '') ?? '';

  jwt.verify(token, 'kokkoro', (error, user) => {
    if (error) {
      let message: string;

      switch (error.name) {
        case 'TokenExpiredError':
          message = 'token 已过期';
          break;
        case 'JsonWebTokenError':
          message = '无效的 token';
          break;
        default:
          message = error.message;
          break;
      }
      throw new SourceError(401, message);
    }
    ctx.state.user = user;
  });

  await next();
}
