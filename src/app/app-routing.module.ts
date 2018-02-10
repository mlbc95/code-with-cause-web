import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './not-found.component';
import {NgModule} from '@angular/core';
import {EntryComponent} from './entry/entry.component';
import {AuthGuard} from './guards/auth.guard';
import {ManagementComponent} from './management/management.component';
import {AdminGuard} from './guards/admin.guard';
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'entry',
    component: EntryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'management',
    component: ManagementComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
