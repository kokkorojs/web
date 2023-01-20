import { v4 as uuidv4 } from 'uuid';

class User {
  public id: string;

  constructor(
    public account: string,
    public password: string,
  ) {
    this.id = uuidv4();
  }
}

export default User;
