import { deepClone } from '@kokkoro/utils';
import { db } from '../db';
import { SourceError } from '../app';
import User from '../model/user.model';

class UserService {
  registerUser(account: string, password: string) {
    const has_user = this.hasUser(account);

    if (has_user) {
      throw new SourceError(409, '用户名已被注册');
    }
    const user = deepClone(db.user);

    user.push(new User(account, password));
    db.user = user;

    return {
      account,
    }
  }

  hasUser(account: string): boolean {
    db.user ??= [];

    const user = deepClone(db.user);
    const user_count = user.length;

    for (let i = 0; i < user_count; i++) {
      const element = user[i];

      if (element.account === account) {
        return true;
      }
    }
    return false;
  }

  getUserList() {
    db.user ??= [];

    const user = deepClone(db.user);
    const user_count = user.length;

    for (let i = 0; i < user_count; i++) {
      const element = user[i];
      delete element.password;
    }
    return user;
  }

  loginUser(account: string, password: string) {
    db.user ??= [];

    const user = deepClone(db.user);
    const user_count = user.length;

    for (let i = 0; i < user_count; i++) {
      const element = user[i];

      if (element.account === account && element.password === password) {
        return element.id;
      }
    }
  }

  modifyUser(oldUser: User, newUser: Omit<User, 'id'>) {
    const user = deepClone(db.user);
    const user_count = user.length;

    for (let i = 0; i < user_count; i++) {
      const { id } = user[i];

      if (id !== oldUser.id) {
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
