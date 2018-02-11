import {Component, OnInit} from '@angular/core';
import {INewOrganizationParams} from "../../swagger-api/model/iNewOrganizationParams";

@Component({
  selector: 'app-create-organization-dialog',
  templateUrl: './create-organization-dialog.component.html',
  styleUrls: ['./create-organization-dialog.component.scss']
})
export class CreateOrganizationDialogComponent implements OnInit {
  organization: INewOrganizationParams;

  constructor() {
  }

  ngOnInit(): void {
    this.organization = {type: OrganizationType.Purchase, name: ""};
  }
}
