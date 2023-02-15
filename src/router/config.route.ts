import Router from '@koa/router';
import configController from '../controller/config.controller';
import authHandler from '../middleware/auth.middleware';

const router = new Router({
  prefix: '/config',
});

router.get('/kokkoro', configController.kokkoro);

export default router;
