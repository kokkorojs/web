import Router from 'koa-router';
import user from './user.route';

const router = new Router({
  prefix: '/api',
});

router.use(user.routes());

export default router;
