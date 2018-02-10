import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {ApiModule, Configuration} from './swagger-api';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {ManagementComponent} from './management/management.component';
import {EntryComponent} from './entry/entry.component';
import {ReviewComponent} from './review/review.component';
import {PageNotFoundComponent} from './not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import {AuthenticationService} from './services/authentication.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagementComponent,
    EntryComponent,
    ReviewComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    ApiModule.forRoot(apiConfiguration),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function apiConfiguration(): Configuration {
  if (environment.production) {
    return new Configuration({
      basePath: 'https://codewithcause.herokuapp.com/api'
    });
  } else {
    return new Configuration({
      basePath: 'http://localhost:8080/api'
    });
  }
}
