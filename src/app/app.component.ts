import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from './core/services';
import { APP_CONFIG } from '../environments/environment';
import {AuthStateService} from './core/services/auth-state.service';
import {TokenService} from './core/services/token.service';
import PouchDB from 'pouchdb';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  pouchdb: any = new PouchDB('credential');
  isSignedIn!: boolean;
  title = 'AEM FRONTEND';
  constructor(
    private electronService: ElectronService,
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService
  ) {
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
}
