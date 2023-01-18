import { Next } from 'koa';
import jwt from 'jsonwebtoken';
import { Context } from '../app';
import userService from '../service/user.service';

class UserController {
  async login(ctx: Context, next: Next) {
    const payload = ctx.request.body;
    const token = jwt.sign(payload, 'kokkoro', {
      expiresIn: '7d',
    });

    ctx.result = {
      data: {
        token,
      },
      message: '登录成功',
    };
    return next();
  }

  async register(ctx: Context, next: Next) {
    const data = await userService.registerUser();

    ctx.result = {
      data,
      message: '用户注册成功',
    };
    return next();
  }

  async modify(ctx: Context, next: Next) {
    const oldUser = ctx.state.user;
    const newUser = ctx.request.body;
    const data = await userService.modifyUser(oldUser, newUser);

    ctx.result = {
      data,
      message: '用户修改成功',
    };
    return next();
  }
}

export default new UserController();
