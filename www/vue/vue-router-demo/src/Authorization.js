class Authorization {
  static loggedOutUser = 'logged out';
  constructor() {
    this._user = Authorization.loggedOutUser;
    this._authorized = false;
  }
  get authorized() {
    return this._authorized;
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._authorized = true;
    this._user = user;
  }
}

const auth = new Authorization();

export default auth;
