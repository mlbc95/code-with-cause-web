import {Component, Inject, OnInit} from '@angular/core';
import {IUserVm} from "../../swagger-api/model/iUserVm";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-confirm-delete-user-dialog',
  templateUrl: './confirm-delete-user-dialog.component.html',
  styleUrls: ['./confirm-delete-user-dialog.component.scss']
})
export class ConfirmDeleteUserDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public user: IUserVm) {
  }

  ngOnInit(): void {
  }
}
