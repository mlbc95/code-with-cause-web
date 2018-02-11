import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {SystemService} from '../swagger-api';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private systemService: SystemService,
              private snackBar: MatSnackBar) {
    // reset login status
    this.authenticationService.logout();
  }

  ngOnInit() {

  }

  login() {
    this.authenticationService.login(this.username, this.password).subscribe(
      (): void => {
        // login successful
        this.router.navigate(['/']);
        this.snackBar.open(
          'Login successful',
          'OK',
          {
            duration: 2000
          }
        );
      },
      (error: any): void => {
        console.error(error);
        if (error.status === 500) {
          this.snackBar.open(
            'Username or password is incorrect',
            'OK',
            {
              duration: 2000
            }
          );
        } else {
          this.snackBar.open(
            error['statusText'],
            'OK',
            {
              duration: 2000
            }
          );
        }
      }
    );
  }
}
