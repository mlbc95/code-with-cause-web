import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ApiModule, Configuration} from './swagger-api';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {LoginComponent} from './login/login.component';
import {EntryComponent} from './entry/entry.component';
import {ReviewComponent} from './review/review.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import {AuthenticationService} from './services/authentication.service';
import {environment} from '../environments/environment.prod';
import {UserManagementComponent} from './user-management/user-management.component';
import {CropManagementComponent} from './crop-management/crop-management.component';
import {FarmManagementComponent} from './farm-management/farm-management.component';
import {RecipientManagementComponent} from './recipient-management/recipient-management.component';
import {HarvestEditComponent} from './harvest-edit/harvest-edit.component';
import {CreateFarmDialogComponent} from './farm-management/create-farm-dialog/create-farm-dialog.component';
import { ConfirmDeleteFarmDialogComponent } from './farm-management/confirm-delete-farm-dialog/confirm-delete-farm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EntryComponent,
    ReviewComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
    UserManagementComponent,
    CropManagementComponent,
    FarmManagementComponent,
    RecipientManagementComponent,
    HarvestEditComponent,
    CreateFarmDialogComponent,
    ConfirmDeleteFarmDialogComponent,
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
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateFarmDialogComponent
  ]
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
