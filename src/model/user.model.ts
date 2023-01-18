class User {
  /** 是否是默认生成的初始值 */
  public initial: boolean;

  constructor(
    public account: string,
    public password: string,
  ) {
    this.initial = true;
  }
}

export default User;
