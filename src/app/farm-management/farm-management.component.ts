import {Component, OnInit} from '@angular/core';
import {FarmService} from "../swagger-api/api/farm.service";
import {IFarmVm} from "../swagger-api/model/iFarmVm";
import {MatDialog} from "@angular/material";
import {CreateFarmDialogComponent} from "./create-farm-dialog/create-farm-dialog.component";
import {INewFarmParams} from "../swagger-api/model/iNewFarmParams";
import {ConfirmDeleteFarmDialogComponent} from "./confirm-delete-farm-dialog/confirm-delete-farm-dialog.component";
import {EditFarmDialogComponent} from "./edit-farm-dialog/edit-farm-dialog.component";
import {Configuration} from "../swagger-api/configuration";

@Component({
  selector: 'app-farm-management',
  templateUrl: './farm-management.component.html',
  styleUrls: ['./farm-management.component.scss']
})
export class FarmManagementComponent implements OnInit {
  token: string;
  farms: Array<IFarmVm>;

  constructor(private farmService: FarmService,
              private matDialog: MatDialog) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    this.farmService.configuration = new Configuration({
      apiKeys: {
        Authorization: this.token
      }
    });

    this.farms = [];
  }

  ngOnInit(): void {
    this.farmService.getAll().subscribe(
      (farms: Array<IFarmVm>): void => {
        this.farms = farms;
      }
    );
  }

  createNewFarm(): void {
    let dialogRef = this.matDialog.open(CreateFarmDialogComponent,
      {
        width: '90vw'
      }
    );

    dialogRef.afterClosed().subscribe(
      (newFarm: INewFarmParams): void => {
        if (newFarm) {
          this.farmService.registerFarm(newFarm).subscribe(
            (response: any): void => {
              this.farmService.getAll().subscribe(
                (farms: Array<IFarmVm>): void => {
                  this.farms = farms;
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

  deleteFarm(farm: IFarmVm): void {
    let dialogRef = this.matDialog.open(ConfirmDeleteFarmDialogComponent,
      {
        width: '90vw',
        data: farm
      }
    );

    dialogRef.afterClosed().subscribe(
      (confirm: boolean): void => {
        if (confirm) {
          this.farmService.deleteById(farm._id).subscribe(
            (response: any): void => {
              this.farmService.getAll().subscribe(
                (farms: Array<IFarmVm>): void => {
                  this.farms = farms;
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

  editFarm(farm: IFarmVm): void {
    let dialogRef = this.matDialog.open(EditFarmDialogComponent,
      {
        width: '90vw',
        data: farm
      }
    );

    dialogRef.afterClosed().subscribe(
      (updatedFarm: INewFarmParams): void => {
        if (updatedFarm) {
          this.farmService.updateById(farm._id, updatedFarm).subscribe(
            (response: any): void => {
              this.farmService.getAll().subscribe(
                (farms: Array<IFarmVm>): void => {
                  this.farms = farms;
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
