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
    this.authenticationService.login(this.username, this.password)
      .subscribe(() => {
        // login successful
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        if (err.status === 500) {
          this.snackBar.open('Username or password is incorrect', 'Undo', {
            duration: 2000
          })
        } else {
          this.snackBar.open(err['statusText'], 'Undo', {
            duration: 2000
          })
        }
      });
  }
}
