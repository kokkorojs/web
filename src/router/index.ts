import Router from '@koa/router';
import bot from './bot.route';
import user from './user.route';
import plugin from './plugin.route';

const router = new Router({
  prefix: '/api',
});

router.use(bot.routes());
router.use(user.routes());
router.use(plugin.routes());

export default router;
