import {Component, OnInit} from '@angular/core';
import {INewOrganizationParams} from "../../swagger-api/model/iNewOrganizationParams";
import {OrganizationType} from "../../swagger-api/model/organizationType";

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
    this.organization = {orgType: OrganizationType.Purchased, name: ""};
  }

  changed(event: any) {
    this.organization.orgType = event.value;
  }
}
