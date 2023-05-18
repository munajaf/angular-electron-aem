import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SigninComponent} from './signin/signin.component';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'login', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
