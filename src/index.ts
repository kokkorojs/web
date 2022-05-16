import Koa from 'koa';
import Router from 'koa-router';

const port = 2333;
const app = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = 'kokkoro';
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
})