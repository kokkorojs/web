import { Database } from '@kokkoro/database';
import User from './model/user.model';

const db = new Database<string, User[]>('kokkoro', {
  valueEncoding: 'json',
});

export default db;
