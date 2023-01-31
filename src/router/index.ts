import Router from 'koa-router';
import bot from './bot.route';
import user from './user.route';

const router = new Router({
  prefix: '/api',
});

router.use(bot.routes());
router.use(user.routes());

export default router;
