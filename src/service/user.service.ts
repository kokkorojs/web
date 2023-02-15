import { SourceError } from '../app';
import db from '../db';
import User from '../model/user.model';

class UserService {
  constructor() {
    this.initUser();
  }

  private async initUser(): Promise<void> {
    const has_user = await db.has('user');

    if (!has_user) {
      await db.put('user', []);
    }
  }

  public async registerUser(account: string, password: string) {
    const has_user = await this.hasUser(account);

    if (has_user) {
      throw new SourceError(409, '用户名已被注册');
    }
    const user = await db.get('user');

    user.push(new User(account, password));
    await db.put('user', user);

    return {
      account,
    };
  }

  public async hasUser(account: string): Promise<boolean> {
    const user = await db.get('user');
    const user_count = user.length;

    for (let i = 0; i < user_count; i++) {
      const element = user[i];

      if (element.account === account) {
        return true;
      }
    }
    return false;
  }

  public async getUserList() {
    const user = await db.get('user');
    const user_count = user.length;
    const userList = [];

    for (let i = 0; i < user_count; i++) {
      const { id, account, createTime } = user[i];
      const info = {
        id, account, createTime,
      };

      userList.push(info);
    }
    return {
      list: userList,
    };
  }

  public async loginUser(account: string, password: string) {
    const user = await db.get('user');
    const user_count = user.length;

    for (let i = 0; i < user_count; i++) {
      const element = user[i];

      if (element.account === account && element.password === password) {
        return element.id;
      }
    }
  }

  public async modifyUser(oldUser: User, newUser: Omit<User, 'id'>) {
    const user = await db.get('user');
    const user_count = user.length;

    for (let i = 0; i < user_count; i++) {
      const { id } = user[i];

      if (id !== oldUser.id) {
        continue;
      }
      user[i].account = newUser.account;
      user[i].password = newUser.password;

      await db.put('user', user);
    }
    return {
      account: newUser.account,
    };
  }

  public async removeUser(account: string, self: string) {
    if (account === self) {
      throw new SourceError(409, '不能删除自己');
    }
    const has_user = this.hasUser(account);

    if (!has_user) {
      throw new SourceError(409, '用户名不存在');
    }
    const user = await db.get('user');
    const user_count = user.length;

    for (let i = 0; i < user_count; i++) {
      const element = user[i];

      if (account !== element.account) {
        continue;
      }
      user.splice(i, 1);
      await db.put('user', user);
    }

    return {
      account,
    };
  }
}

export default new UserService();
