import Router from 'koa-router';
import userController from '../controller/user.controller';
import authHandler from '../middleware/auth.middleware';
import { verifyLogin, verifyRegister } from '../middleware/user.middleware';

const router = new Router({
  prefix: '/user',
});

router.post('/login', verifyLogin, userController.login);
router.post('/register', verifyRegister, userController.register);
router.put('/modify', authHandler, userController.modify);
router.get('/list', userController.list);
router.delete('/remove', authHandler, userController.remove);

export default router;
