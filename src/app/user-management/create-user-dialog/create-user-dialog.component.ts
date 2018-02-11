import {Component, OnInit} from '@angular/core';
import {INewUserParams} from "../../swagger-api/model/iNewUserParams";
import {UserRole} from "../../swagger-api/model/userRole";

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit {
  user: INewUserParams;
  confirmPassword: string = "";

  constructor() {
  }

  ngOnInit(): void {
    this.user = {username: "", password: "", role: UserRole.User};
  }

  changed(event: any) {
    this.user.role = event.value;
  }
}
