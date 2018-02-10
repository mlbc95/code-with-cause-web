import {Component, Inject, OnInit} from '@angular/core';
import {INewOrganizationParams} from "../../swagger-api/model/iNewOrganizationParams";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-edit-organization-dialog',
  templateUrl: './edit-organization-dialog.component.html',
  styleUrls: ['./edit-organization-dialog.component.scss']
})
export class EditOrganizationDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private organization: INewOrganizationParams) {
  }

  ngOnInit(): void {
  }
}
