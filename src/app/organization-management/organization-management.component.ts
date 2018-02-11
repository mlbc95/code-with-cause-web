import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from "../swagger-api/api/organization.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {IOrganizationVm} from "../swagger-api/model/iOrganizationVm";
import {INewOrganizationParams} from "../swagger-api/model/iNewOrganizationParams";
import {CreateOrganizationDialogComponent} from "./create-organization-dialog/create-organization-dialog.component";
import {ConfirmDeleteOrganizationDialogComponent} from "./confirm-delete-organization-dialog/confirm-delete-organization-dialog.component";
import {EditOrganizationDialogComponent} from "./edit-organization-dialog/edit-organization-dialog.component";
import {Configuration} from "../swagger-api/configuration";

@Component({
  selector: 'app-organization-management',
  templateUrl: './organization-management.component.html',
  styleUrls: ['./organization-management.component.scss']
})
export class OrganizationManagementComponent implements OnInit, OnDestroy {
  token: string;
  organizations: Array<IOrganizationVm>;
  loading: boolean = false;

  constructor(private organizationService: OrganizationService,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    organizationService.configuration = new Configuration({
      apiKeys: {
        Authorization: this.token
      }
    });

    this.organizations = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.organizationService.getAll().subscribe(
      (organizations: Array<IOrganizationVm>): void => {
        this.organizations = organizations;
        this.loading = false;
      },
      (error: Error): void => {
        console.error(error);
        this.loading = false;
        this.snackBar.open(
          'Failed to fetch organizations',
          'OK',
          {
            duration: 2000,
            panelClass: "snack-bar-danger"
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.organizationService.configuration.apiKeys["Authorization"] = null;
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
          this.loading = true;
          this.organizationService.registerOrganization(newOrganization).subscribe(
            (response: any): void => {
              this.organizationService.getAll().subscribe(
                (organizations: Array<IOrganizationVm>): void => {
                  this.organizations = organizations;
                  this.loading = false;
                  this.snackBar.open(
                    'Organization created',
                    'OK',
                    {
                      duration: 2000,
                      panelClass: "snack-bar-success"
                    }
                  );
                },
                (error: Error): void => {
                  console.error(error);
                  this.loading = false;
                  this.snackBar.open(
                    'Failed to fetch organizations',
                    'OK',
                    {
                      duration: 2000,
                      panelClass: "snack-bar-danger"
                    }
                  );
                }
              );
            },
            (error: Error): void => {
              console.error(error);
              this.loading = false;
              this.snackBar.open(
                'Failed to create organization',
                'OK',
                {
                  duration: 2000,
                  panelClass: "snack-bar-danger"
                }
              );
            }
          );
        }
      }
    );
  }

  deleteOrganization(organization: IOrganizationVm): void {
    let dialogRef = this.matDialog.open(ConfirmDeleteOrganizationDialogComponent,
      {
        width: '90vw',
        data: organization
      }
    );

    dialogRef.afterClosed().subscribe(
      (confirm: boolean): void => {
        if (confirm) {
          this.loading = true;
          this.organizationService.deleteOrganization(organization._id).subscribe(
            (response: any): void => {
              this.organizationService.getAll().subscribe(
                (organizations: Array<IOrganizationVm>): void => {
                  this.organizations = organizations;
                  this.loading = false;
                  this.snackBar.open(
                    'Deleted organization',
                    'OK',
                    {
                      duration: 2000,
                      panelClass: "snack-bar-success"
                    }
                  );
                },
                (error: Error): void => {
                  console.error(error);
                  this.loading = false;
                  this.snackBar.open(
                    'Failed to fetch organizations',
                    'OK',
                    {
                      duration: 2000,
                      panelClass: "snack-bar-danger"
                    }
                  );
                }
              );
            },
            (error: Error): void => {
              console.error(error);
              this.loading = false;
              this.snackBar.open(
                'Failed to delete organization',
                'OK',
                {
                  duration: 2000,
                  panelClass: "snack-bar-danger"
                }
              );
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
          this.loading = true;
          this.organizationService.updateOrganization(organization._id, updatedOrganization).subscribe(
            (response: any): void => {
              this.organizationService.getAll().subscribe(
                (organizations: Array<IOrganizationVm>): void => {
                  this.organizations = organizations;
                  this.loading = false;
                  this.snackBar.open(
                    'Organization updated',
                    'OK',
                    {
                      duration: 2000,
                      panelClass: "snack-bar-success"
                    }
                  );
                },
                (error: Error): void => {
                  console.error(error);
                  this.loading = false;
                  this.snackBar.open(
                    'Failed to fetch organizations',
                    'OK',
                    {
                      duration: 2000,
                      panelClass: "snack-bar-danger"
                    }
                  );
                }
              );
            },
            (error: Error): void => {
              console.error(error);
              this.loading = false;
              this.snackBar.open(
                'Failed to update organization',
                'OK',
                {
                  duration: 2000,
                  panelClass: "snack-bar-danger"
                }
              );
            }
          );
        }
      }
    );
  }
}
