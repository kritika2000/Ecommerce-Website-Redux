// STOARGE API TO ACCESS LOCAL STORAGE
class LocalStorage {
  constructor() {
    this.localStorage = localStorage;
  }
  static setAccessToken(accessToken) {
    localStorage.setItem('token', accessToken);
  }
  static getAccessToken() {
    return localStorage.getItem('token');
  }
  static clearAccessToken() {
    return localStorage.removeItem('token');
  }
}

export default LocalStorage;
