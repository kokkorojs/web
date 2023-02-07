import Router from '@koa/router';
import pluginController from '../controller/plugin.controller';
import authHandler from '../middleware/auth.middleware';

const router = new Router({
  prefix: '/plugin',
});

router.get('/list', pluginController.list);

export default router;
