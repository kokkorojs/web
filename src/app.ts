import Koa from 'koa';
import { koaBody } from 'koa-body';
import router from './router';
import responseHandler from './middleware/response.middleware';

export type Context = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>;

export class SourceError extends Error {
  constructor(
    public status: number,
    public message: string,
  ) {
    super(message);
  }
}

export const app = new Koa();

app.use(responseHandler);
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());
