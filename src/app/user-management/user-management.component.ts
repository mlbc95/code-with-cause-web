import {Component, OnInit} from '@angular/core';
import {SystemService} from "../swagger-api/api/system.service";
import {IUserVm} from "../swagger-api/model/iUserVm";
import {INewUserParams} from "../swagger-api/model/iNewUserParams";
import {MatDialog} from "@angular/material";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";
import {ConfirmDeleteUserDialogComponent} from "./confirm-delete-user-dialog/confirm-delete-user-dialog.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: Array<IUserVm>;

  constructor(private systemService: SystemService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.systemService.getAllUsers().subscribe(
      (users: Array<IUserVm>): void => {
        this.users = users;
      }
    );
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
          this.systemService.registerUser(newUser).subscribe(
            (response: any): void => {
              this.systemService.getAllUsers().subscribe(
                (users: Array<IUserVm>): void => {
                  this.users = users;
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
          this.systemService.deleteUserById(user._id).subscribe(
            (response: any): void => {
              this.systemService.getAllUsers().subscribe(
                (users: Array<IUserVm>): void => {
                  this.users = users;
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
          this.systemService.udpateUserById(user._id, updatedUser).subscribe(
            (response: any): void => {
              this.systemService.getAllUsers().subscribe(
                (users: Array<IUserVm>): void => {
                  this.users = users;
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
