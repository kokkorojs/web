import Router from '@koa/router';
import botController from '../controller/bot.controller';
import authHandler from '../middleware/auth.middleware';

const router = new Router({
  prefix: '/bot',
});

router.get('/list', botController.list);
router.post('/login', botController.login);
router.post('/logout', botController.logout);
router.post('/query-qrcode-result', botController.queryQrcodeResult);

export default router;
