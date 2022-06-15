import Koa from 'koa';
import Router from 'koa-router';
import { readFile } from 'fs/promises';

export const router = new Router();

export class Web extends Koa {
  constructor() {
    super();

    this.use(router.routes());
    this.use(router.allowedMethods());
  }

  view(router_path: string, view_path: string) {
    router.get(router_path, async (ctx) => {
      ctx.type = 'html';
      ctx.body = await readFile(view_path);
    })
  }
}
