import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {SystemService} from '../swagger-api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loading = false;
  error = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private systemService: SystemService) {
    // reset login status
    this.authenticationService.logout();
  }

  ngOnInit() {

  }

  login() {
    this.loading = true;
    console.log(this.username);
    console.log(this.password);

    // this.systemService.
    // this.authenticationService.login(this.model.username, this.model.password)
    //   .subscribe(() => {
    //     // login successful
    //     this.router.navigate(['/']);
    //   }, err => {
    //     if (err.error instanceof Error) {
    //       console.log('An error occurred:', err.error.message);
    //       this.error = 'An unexpected error occurred.';
    //       this.loading = false;
    //     } else {
    //       if (err.status === 401) {
    //         this.error = 'Username or password is incorrect';
    //         this.loading = false;
    //       } else {
    //         console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    //         this.error = 'An unexpected server error occurred.';
    //         this.loading = false;
    //       }
    //     }
    //   });
  }
}
