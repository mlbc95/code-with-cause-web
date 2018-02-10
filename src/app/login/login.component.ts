import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {INewUserParams} from '../swagger-api';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  selector: 'app-login'
})

export class LoginComponent implements OnInit {
  model: INewUserParams;
  loading = false;
  error = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    // reset login status
    this.authenticationService.logout();
  }

  ngOnInit() {

  }

  usernameFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  login() {
    this.loading = true;

    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(() => {
        // login successful
        this.router.navigate(['/management']);
      }, err => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
          this.error = 'An unexpected error occurred.';
          this.loading = false;
        } else {
          if (err.status === 401) {
            this.error = 'Username or password is incorrect';
            this.loading = false;
          } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            this.error = 'An unexpected server error occurred.';
            this.loading = false;
          }
        }
      });
  }
}
