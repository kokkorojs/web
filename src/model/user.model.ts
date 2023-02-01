import { v4 as uuidv4 } from 'uuid';

class User {
  public id: string;
  public createTime: Date;

  constructor(
    public account: string,
    public password: string,
  ) {
    this.id = uuidv4();
    this.createTime = new Date();
  }
}

export default User;
