import { randomString } from '@kokkoro/utils';
import { database } from '../db';
import { SourceError } from '../app';
import User from '../model/user.model';

class UserService {
  async registerUser() {
    const has_resigter = await this.hasRegister();

    if (has_resigter) {
      throw new SourceError(409, '用户已注册');
    }
    const account = randomString(7);
    const password = randomString(7);
    const user = new User(account, password);

    await database.put('user', [
      user,
    ]);
    return {
      account,
    }
  }

  async hasRegister() {
    const has_user = await database.has('user');
    const user = await database.get('user') as any[];

    return has_user && user.length > 0;
  }

  async getUser(account: string) {
    const user = await database.get('user') as any[];
    const user_count = user.length;

    for (let i = 0; i < user_count; i++) {
      const element = user[i];

      if (element.account === account) {
        return element;
      }
    }
  }

  async modifyUser(oldUser: Omit<User, 'initial'>, newUser: Omit<User, 'initial'>) {
    const user = await database.get('user') as any[];
    const user_count = user.length;

    for (let i = 0; i < user_count; i++) {
      const { account, password } = user[i];

      if (account !== oldUser.account || password !== oldUser.password) {
        continue;
      }
      user[i].account = newUser.account;
      user[i].password = newUser.password;
      user[i].initial = false;

      await database.put('user', user);
    }
    // TODO ／人◕ ‿‿ ◕人＼ token 刷新
    return {
      account: newUser.account,
    }
  }
}

export default new UserService();
