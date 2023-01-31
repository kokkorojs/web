import { join } from 'path';
import { Database } from '@kokkoro/jsondb';

const path = join(__dataname, 'db/kokkoro');
export const db = new Database(path);
