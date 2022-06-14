import Koa from 'koa';
import views from 'koa-views';
import serve from 'koa-static';
import Router from 'koa-router';
import { join, relative } from 'path';
import { getStack } from '@kokkoro/utils';

export const router = new Router();
const render = views(__workname, {
  map: {
    html: 'handlebars'
  }
})

export class Web extends Koa {
  constructor() {
    super();

    this.assets(join(__dirname, '../views'));
    // 基础视图
    this.view('/', viewPath('../views/index'));
    this.view('/error', viewPath('../views/error'));

    // 中间件
    this.use(async (ctx, next) => {
      await next();
      ctx.status === 404 && ctx.redirect('/error');
    });
    this.use(render);
    this.use(router.routes());
    this.use(router.allowedMethods());
  }

  // 映射视图页面
  view(router_path: string, view_path: string, locals?: any) {
    router.get(router_path, async (ctx) => {
      await ctx.render(view_path, locals);
    })
  }

  // 开放静态资源目录
  assets(assets_path: string) {
    this.use(serve(assets_path));
  }
}

export function viewPath(path: string) {
  const stack = getStack();
  const file_name = stack[2].getFileName()!;
  const raw_path = join(file_name, '../', path);

  return relative(__workname, raw_path);
}
