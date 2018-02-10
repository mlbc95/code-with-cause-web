import {Component, OnInit} from '@angular/core';
import {OrganizationService} from "../swagger-api/api/organization.service";
import {MatDialog} from "@angular/material";
import {IOrganizationVm} from "../swagger-api/model/iOrganizationVm";
import {INewOrganizationParams} from "../swagger-api/model/iNewOrganizationParams";

@Component({
  selector: 'app-organization-management',
  templateUrl: './organization-management.component.html',
  styleUrls: ['./organization-management.component.scss']
})
export class OrganizationManagementComponent implements OnInit {
  organizations: Array<IOrganizationVm> = [];

  constructor(private organizationService: OrganizationService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.organizationService.getAll().subscribe(
      (organizations: Array<IOrganizationVm>): void => {
        this.organizations = organizations;
      }
    );
  }

  createNewOrganization(): void {
    let dialogRef = this.matDialog.open(CreateOrganizationDialogComponent,
      {
        width: '90vw'
      }
    );

    dialogRef.afterClosed().subscribe(
      (newOrganization: INewOrganizationParams): void => {
        if (newOrganization) {
          this.organizationService.registerOrganization(newOrganization).subscribe(
            (response: any): void => {
              this.organizationService.getAll().subscribe(
                (organizations: Array<IOrganizationVm>): void => {
                  this.organizations = organizations;
                }
              );
            },
            (error: Error): void => {
              console.error(error);
            }
          );
        }
      }
    );
  }

  deleteOrganization(organization: IOrganizationVm): void {
    let dialogRef = this.matDialog.open(ConfirmDeleteOrganizationDialogComponent,
      {
        width: '90vw'
      }
    );

    dialogRef.afterClosed().subscribe(
      (confirm: boolean): void => {
        if (confirm) {
          this.organizationService.deleteById(organization._id).subscribe(
            (response: any): void => {
              this.organizationService.getAll().subscribe(
                (organizations: Array<IOrganizationVm>): void => {
                  this.organizations = organizations;
                }
              );
            },
            (error: Error): void => {
              console.error(error);
            }
          );
        }
      }
    );
  }

  editOrganization(organization: IOrganizationVm): void {
    let dialogRef = this.matDialog.open(EditOrganizationDialogComponent,
      {
        width: '90vw',
        data: organization
      }
    );

    dialogRef.afterClosed().subscribe(
      (updatedOrganization: INewOrganizationParams): void => {
        if (updatedOrganization) {
          this.organizationService.updateById(organization._id, updatedOrganization).subscribe(
            (response: any): void => {
              this.organizationService.getAll().subscribe(
                (organizations: Array<IOrganizationVm>): void => {
                  this.organizations = organizations;
                }
              );
            },
            (error: Error): void => {
              console.error(error);
            }
          );
        }
      }
    );
  }
}
