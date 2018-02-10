import {EventEmitter, Injectable, Output} from '@angular/core';
import 'rxjs/add/operator/map';
import * as config from '../app.module';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  // Used for showing/hiding certain elements based upon the user group
  @Output() getAdmin: EventEmitter<any> = new EventEmitter();

  // Used for routing to correct profile link in navbar
  @Output() getUsername: EventEmitter<any> = new EventEmitter();

  public token: string;

  // Used for showing the navbar when logged in and hiding it when logged out
  private loggedIn = new BehaviorSubject<boolean>(false);

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  private apiUrl: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {
    // set token if saved in local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

    this.apiUrl = config.apiConfiguration().basePath;

    if (currentUser) {
      this.loggedIn.next(true);
    }
  }

  login(username: string, password: string) {
    const url = `${this.apiUrl}/auth`;
    return this.http.post(url, {username: username, password: password}, {headers: this.headers})
      .map(response => {
          // login successful if there's a jwt token in the response
          let token = response && response['token'];
          let role = response && response['role'];
          let admin: boolean = false;
          username = response && response['username'];

          if (role === 'ROLE_ADMIN') {
            admin = true;
          }

          this.getAdmin.emit(admin);

          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            token: token,
            admin: admin
          }));

          // Used to show navbar
          this.loggedIn.next(true);

          this.getUsername.emit(username);
        }
      );
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.loggedIn.next(false);
    this.getUsername.emit('');
    this.getAdmin.emit(false);
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
