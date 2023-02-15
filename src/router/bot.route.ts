import Router from '@koa/router';
import botController from '../controller/bot.controller';
import authHandler from '../middleware/auth.middleware';
import { verifyOnline, verifyKey, verifyUin, verifyGroupMsg, verifyPrivateMsg } from '../middleware/bot.middleware';

const router = new Router({
  prefix: '/bot',
});

router.get('/list', botController.list);
router.post('/login', botController.login);
router.post('/logout', botController.logout);
router.post('/query-qrcode-result', verifyUin, botController.queryQrcodeResult);
router.post('/get-friend-list', verifyKey, verifyOnline, verifyUin, botController.getFriendList);
router.post('/get-group-list', verifyKey, verifyOnline, verifyUin, botController.getGroupList);
router.post('/send-private-msg', verifyKey, verifyOnline, verifyPrivateMsg, botController.sendPrivateMsg);
router.post('/send-group-msg', verifyKey, verifyOnline, verifyGroupMsg, botController.sendGroupMsg);

export default router;
