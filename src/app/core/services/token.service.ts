import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private issuer = {
    login: 'http://test-demo.aemenersol.com/api/Account/Login',
  };
  constructor() {}
  setToken(token: any) {
    localStorage.setItem('auth_token', token);
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  isLoggedIn() {
    return !!this.getToken();
  }
  removeToken() {
    localStorage.removeItem('auth_token');
  }
}
