import {Component, Inject, OnInit} from '@angular/core';
import {INewUserParams} from "../../swagger-api/model/iNewUserParams";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private user: INewUserParams) {
  }

  ngOnInit(): void {
  }

  changed(event: any) {
    this.user.role = event.value;
  }
}
