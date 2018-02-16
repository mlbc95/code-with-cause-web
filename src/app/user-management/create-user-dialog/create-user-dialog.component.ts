import {Component, OnInit} from '@angular/core';
import {INewUserParams, UserRole} from '../../app.api';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit {
  user: INewUserParams;
  confirmPassword = '';

  constructor() {
  }

  ngOnInit(): void {
    this.user = new INewUserParams({username: '', password: '', role: UserRole.User});
  }

  changed(event: any) {
    // this.user.role = event.value;
  }
}
