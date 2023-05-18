import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { AuthService } from '../core/services/auth.service';
import { TokenService } from '../core/services/token.service';
import { AuthStateService } from '../core/services/auth-state.service';

import PouchDB from 'pouchdb';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  pouchdb: any = new PouchDB('credential');
  loginForm: FormGroup;
  loading = false;
  invalid = false;
  errors = '';
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.email, Validators.required] ],
      password: [],
    });
  this.signInLocalDB(this.loginForm.value);
  }
  ngOnInit() {}

  async onSubmit() {
    if (this.loginForm.invalid) {this.invalid = true;}
    if (this.loginForm.valid){
      if (this.invalid) {this.invalid = false;}
      this.loading = true;

      this.authService.signin(this.loginForm.value).subscribe(
        (result) => {
          this.setData(this.loginForm.value);
          this.token.setToken(result);
          this.errors = '';
        },
        async (error) => {
          this.loading = false;

          const localValidation = await this.signInLocalDB(this.loginForm.value);
          if (localValidation){
            return this.errors = 'Credential is correct but server is down';
          }
          if (error.status === 401) {
            return this.errors = 'Invalid Username or Password';
          }
          return this.errors = 'Service Unavailable';
        },
        () => {
          this.authState.setAuthState(true);

          this.loginForm.reset();
          this.router.navigate(['dashboard']);

          this.loading = false;
          this.errors = '';
        }
      );
    }
  }
  // Handle response
  responseHandler(data: any) {

  }

  setData(payload){
    this.pouchdb.put({
      _id: 'initial',
      ...payload
    });
  }

  async signInLocalDB(loginForm){
    const data = await this.pouchdb.get('initial');
    return data.username === loginForm.username && data.password === loginForm.password;
  }

}
