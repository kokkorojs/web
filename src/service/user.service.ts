import { deepClone } from '@kokkoro/utils';
import { db } from '../db';
import { SourceError } from '../app';
import User from '../model/user.model';

class UserService {
  registerUser(account: string, password: string) {
    const has_register = this.hasRegister();

    if (has_register) {
      throw new SourceError(409, '用户已注册');
    }
    const user = new User(account, password);

    db.user = [
      user,
    ];

    return {
      account,
    }
  }

  hasRegister() {
    return !!db.user?.length;
  }

  getUser(account: string) {
    const user = deepClone(db.user);

    for (let i = 0; i < user?.length; i++) {
      const element = user[i];

      if (element.account === account) {
        return element;
      }
    }
  }

  modifyUser(oldUser: User, newUser: Omit<User, 'id'>) {
    const user = deepClone(db.user);
    const user_count = user.length;

    for (let i = 0; i < user_count; i++) {
      const { account } = user[i];

      if (account !== oldUser.account) {
        continue;
      }
      user[i].account = newUser.account;
      user[i].password = newUser.password;

      db.user = user;
    }
    return {
      account: newUser.account,
    }
  }
}

export default new UserService();
