import {Component, OnDestroy, OnInit} from '@angular/core';
import {SystemService} from '../swagger-api/api/system.service';
import {IUserVm} from '../swagger-api/model/iUserVm';
import {INewUserParams} from '../swagger-api/model/iNewUserParams';
import {MatDialog} from '@angular/material';
import {EditUserDialogComponent} from './edit-user-dialog/edit-user-dialog.component';
import {CreateUserDialogComponent} from './create-user-dialog/create-user-dialog.component';
import {ConfirmDeleteUserDialogComponent} from './confirm-delete-user-dialog/confirm-delete-user-dialog.component';
import 'rxjs/add/operator/mergeMap';
import {Configuration} from "../swagger-api/configuration";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  token: string;
  users: Array<IUserVm>;
  loading: boolean;

  constructor(private systemService: SystemService,
              private matDialog: MatDialog) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    systemService.configuration = new Configuration({
      apiKeys: {
        Authorization: this.token
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.systemService.getAllUsers().subscribe(
      (users: Array<IUserVm>): void => {
        this.users = users;
        this.loading = false;
      },
      (error: Error): void => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.systemService.configuration.apiKeys["Authorization"] = null;
  }

  createNewUser(): void {
    let dialogRef = this.matDialog.open(CreateUserDialogComponent,
      {
        width: '90vw'
      }
    );

    dialogRef.afterClosed().subscribe(
      (newUser: INewUserParams): void => {
        if (newUser) {
          this.loading = true;
          this.systemService.registerUser(newUser).subscribe(
            (response: any): void => {
              this.systemService.getAllUsers().subscribe(
                (users: Array<IUserVm>): void => {
                  this.users = users;
                  this.loading = false;
                },
                (error: Error): void => {
                  console.error(error);
                  this.loading = false;
                }
              );
            },
            (error: Error): void => {
              console.error(error);
              this.loading = false;
            }
          );
        }
      }
    );
  }

  deleteUser(user: IUserVm): void {
    let dialogRef = this.matDialog.open(ConfirmDeleteUserDialogComponent,
      {
        width: '90vw',
        data: user
      }
    );

    dialogRef.afterClosed().subscribe(
      (confirm: boolean): void => {
        if (confirm) {
          this.loading = true;
          this.systemService.deleteUserById(user._id).subscribe(
            (response: any): void => {
              this.systemService.getAllUsers().subscribe(
                (users: Array<IUserVm>): void => {
                  this.users = users;
                  this.loading = false;
                },
                (error: Error): void => {
                  console.error(error);
                  this.loading = false;
                }
              );
            },
            (error: Error): void => {
              console.error(error);
              this.loading = false;
            }
          );
        }
      }
    );
  }

  editUser(user: IUserVm): void {
    let dialogRef = this.matDialog.open(EditUserDialogComponent,
      {
        width: '90vw',
        data: user
      }
    );

    dialogRef.afterClosed().subscribe(
      (updatedUser: INewUserParams): void => {
        if (updatedUser) {
          this.loading = true;
          this.systemService.udpateUserById(user._id, updatedUser).subscribe(
            (response: any): void => {
              this.systemService.getAllUsers().subscribe(
                (users: Array<IUserVm>): void => {
                  this.users = users;
                  this.loading = false;
                },
                (error: Error): void => {
                  console.error(error);
                  this.loading = false;
                }
              );
            },
            (error: Error): void => {
              console.error(error);
              this.loading = false;
            }
          );
        }
      }
    );
  }
}
