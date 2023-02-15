import { Next } from 'koa';
import jwt from 'jsonwebtoken';
import { Context } from '../app';
import userService from '../service/user.service';

class UserController {
  async list(ctx: Context, next: Next) {
    const data = await userService.getUserList();

    ctx.result = {
      data,
      message: '获取成功',
    };
    return next();
  }

  async login(ctx: Context, next: Next) {
    const { id, account, password } = ctx.request.body;
    const payload = {
      id, account, password,
    };
    const token = jwt.sign(payload, 'kokkoro', {
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
    const data = await userService.registerUser(account, password);

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

  async remove(ctx: Context, next: Next) {
    const { account } = ctx.request.body;
    const { account: self } = ctx.state.user;
    const data = await userService.removeUser(account, self);

    ctx.result = {
      data,
      message: '用户删除成功',
    };
    return next();
  }
}

export default new UserController();
