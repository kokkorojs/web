import { Next } from 'koa';
import jwt from 'jsonwebtoken';
import { Context } from '../app';
import userService from '../service/user.service';

class UserController {
  async login(ctx: Context, next: Next) {
    const { account } = ctx.request.body;
    const user = userService.getUser(account);
    const token = jwt.sign(user, 'kokkoro', {
      expiresIn: '1d',
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
    const { account, password } = ctx.request.body;
    const data = userService.registerUser(account, password);

    ctx.result = {
      data,
      message: '用户注册成功',
    };
    return next();
  }

  async modify(ctx: Context, next: Next) {
    const oldUser = ctx.state.user;
    const newUser = ctx.request.body;
    const data = userService.modifyUser(oldUser, newUser);

    ctx.result = {
      data,
      message: '用户修改成功',
    };
    return next();
  }
}

export default new UserController();
