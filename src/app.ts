import Koa from 'koa';
import { join } from 'path';
import serve from "koa-static";
import { HttpMethodEnum, koaBody } from 'koa-body';
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

const view_path = join(require.resolve('../../admin'), '../dist');

app.use(serve(view_path, {
  extensions: ['html'],
}));
app.use(responseHandler);
app.use(koaBody({
  parsedMethods: ['POST', 'PUT', 'GET', 'DELETE'] as HttpMethodEnum[]
}));
app.use(router.routes());
app.use(router.allowedMethods());
