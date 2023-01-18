import Router from 'koa-router';
import userController from '../controller/user.controller';
import authHandler from '../middleware/auth.middleware';
import { verifyLogin } from '../middleware/user.middleware';

const router = new Router({
  prefix: '/user',
});

router.post('/login', verifyLogin, userController.login);
router.post('/register', userController.register);
router.put('/modify', authHandler, userController.modify);

export default router;
