import { Component } from '@angular/core';
import {User} from "./model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Code With A Cause';
  user: User;
}
