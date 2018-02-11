import {Component, OnInit} from '@angular/core';
import {CropService} from '../swagger-api';
import {ICropVm} from '../swagger-api';
import {MatDialog} from '@angular/material';
import {CreateCropDialogComponent} from './create-crop-dialog/create-crop-dialog.component';
import {INewCropParams} from '../swagger-api';
import {ConfirmDeleteCropDialogComponent} from './confirm-delete-crop-dialog/confirm-delete-crop-dialog.component';
import {EditCropDialogComponent} from './edit-crop-dialog/edit-crop-dialog.component';
import {Configuration} from '../swagger-api';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-crop-management',
  templateUrl: './crop-management.component.html',
  styleUrls: ['./crop-management.component.scss']
})
export class CropManagementComponent implements OnInit {
  token: string;
  crops: Array<ICropVm> = [];

  constructor(private cropService: CropService,
              private matDialog: MatDialog) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    cropService.configuration = new Configuration({
      apiKeys: {
        Authorization: this.token
      }
    });
  }

  ngOnInit(): void {
    this.cropService.getAll().subscribe(
      (crops: Array<ICropVm>): void => {
        this.crops = crops;
      }
    );
  }

  createNewCrop(): void {
    let dialogRef = this.matDialog.open(CreateCropDialogComponent,
      {
        width: '90vw'
      }
    );

    dialogRef.afterClosed().subscribe(
      (cropForm: FormGroup): void => {
        if (cropForm) {
          let varieties: string[] = [];
          for (let i in cropForm.value.varieties) {
            varieties.push(cropForm.value.varieties[i].variety);
          }
          let newCrop: INewCropParams = {
            name: cropForm.value.name,
            variety: varieties,
            pricePerPound: cropForm.value.pricePerPound
          };
          this.cropService.configuration = new Configuration({
            apiKeys: {
              Authorization: this.token
            }
          });
          this.cropService.registerCrop(newCrop).subscribe(
            (response: any): void => {
              this.cropService.getAll().subscribe(
                (crops: Array<ICropVm>): void => {
                  this.crops = crops;
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

  deleteCrop(crop: ICropVm): void {
    let dialogRef = this.matDialog.open(ConfirmDeleteCropDialogComponent,
      {
        width: '90vw',
        data: crop
      }
    );

    dialogRef.afterClosed().subscribe(
      (confirm: boolean): void => {
        if (confirm) {
          this.cropService.deleteCrop(crop._id).subscribe(
            (response: any): void => {
              this.cropService.getAll().subscribe(
                (crops: Array<ICropVm>): void => {
                  this.crops = crops;
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

  editCrop(crop: ICropVm): void {
    let dialogRef = this.matDialog.open(EditCropDialogComponent,
      {
        width: '90vw',
        data: crop
      }
    );
    dialogRef.afterClosed().subscribe(
      (cropForm: FormGroup): void => {
        if (cropForm) {
          let varieties: string[] = [];
          for (let i in cropForm.value.varieties) {
            varieties.push(cropForm.value.varieties[i].variety);
          }
          let updatedCrop: INewCropParams = {
            name: cropForm.value.name,
            variety: varieties,
            pricePerPound: cropForm.value.pricePerPound
          };
          this.cropService.updateCrop(crop._id, updatedCrop).subscribe(
            (response: any): void => {
              this.cropService.getAll().subscribe(
                (crops: Array<ICropVm>): void => {
                  this.crops = crops;
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
