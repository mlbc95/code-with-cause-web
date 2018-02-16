import {Component, OnInit} from '@angular/core';
import {INewOrganizationParams, OrganizationType} from '../../app.api';

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
    this.organization = new INewOrganizationParams({orgType: OrganizationType.Purchased, name: ''});
  }

  changed(event: any) {
    // this.organization.orgType = event.value;
  }
}
