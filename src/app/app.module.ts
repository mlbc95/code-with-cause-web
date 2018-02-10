import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material";
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { EntryComponent } from './entry/entry.component';
import { ReviewComponent } from './review/review.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagementComponent,
    EntryComponent,
    ReviewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
