import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// User interface
export class User {
  username!: String;
  password!: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://test-demo.aemenersol.com/api/Account/Login', user);
  }
  // dashboard
  dashboard(): Observable<any> {
    return this.http.get('http://test-demo.aemenersol.com/api/Dashboard');
  }
}
