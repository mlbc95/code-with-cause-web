import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HarvestClient, HarvestVm, NewHarvest} from '../../app.api';
import {EditCropDialogComponent} from "../../crop-management/edit-crop-dialog/edit-crop-dialog.component";

@Component({
  selector: 'app-edit-harvest-dialog',
  templateUrl: './edit-harvest-dialog.component.html',
  styleUrls: ['./edit-harvest-dialog.component.scss']
})
export class EditHarvestDialogComponent implements OnInit {
  cropForm: FormGroup;

  // crop: INewCropParams;
  token: string;
  harvests: Array<HarvestVm> = [];
  loading: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) private harvest: HarvestVm,
              private formBuilder: FormBuilder,
              private harvestService: HarvestClient,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // this.cropForm = this.formBuilder.group({
    //   name: [this.crop.name, Validators.required],
    //   varieties: this.formBuilder.array(this.initVariety()),
    //   pricePerPound: [this.crop.pricePerPound, Validators.required]
    // });
  }

  editHarvest(harvest: HarvestVm): void {
    const dialogRef = this.matDialog.open(EditCropDialogComponent,
      {
        width: '90vw',
        data: harvest
      }
    );
    dialogRef.afterClosed().subscribe(
      (harvestForm: FormGroup): void => {
        if (harvestForm) {
          this.loading = true;

          // this.harvestService.updateFarm(harvest._id, farm._id).subscribe(
          //   (response: any): void => {
          //     this.harvestService.getAll().subscribe(
          //       (harvests: Array<HarvestVm>): void => {
          //         this.harvests = harvests;
          //         this.loading = false;
          //         this.snackBar.open(
          //           'Harvest updated',
          //           'OK',
          //           {
          //             duration: 2000,
          //             panelClass: 'snack-bar-success'
          //           }
          //         );
          //       },
          //       (error: Error): void => {
          //         console.error(error);
          //         this.loading = false;
          //         this.snackBar.open(
          //           'Failed to fetch harvest',
          //           'OK',
          //           {
          //             duration: 2000,
          //             panelClass: 'snack-bar-danger'
          //           }
          //         );
          //       }
          //     );
          //   },
          //   (error: Error): void => {
          //     console.error(error);
          //     this.loading = false;
          //     this.snackBar.open(
          //       'Failed to update harvest',
          //       'OK',
          //       {
          //         duration: 2000,
          //         panelClass: 'snack-bar-danger'
          //       }
          //     );
          //   }
          // );
        }
      }
    );
  }


  // getVarieties(cropForm) {
  //   return cropForm.get('varieties').controls;
  // }
  //
  // initVariety() {
  //   const arr: any[] = [];
  //   this.crop.variety.forEach((variety: string) => {
  //     arr.push(this.formBuilder.group({
  //       variety: [variety, Validators.required]
  //     }));
  //   });
  //   return arr;
  // }
  //
  // createVariety(): FormGroup {
  //   return this.formBuilder.group({
  //     variety: ['', Validators.required]
  //   });
  // }
  //
  // addVariety(): void {
  //   const control = <FormArray>this.cropForm.controls['varieties'];
  //   control.push(this.createVariety());
  // }
  //
  // removeVariety(varietyIndex: number): void {
  //   const control = <FormArray>this.cropForm.controls['varieties'];
  //   control.removeAt(varietyIndex);
  // }
}
