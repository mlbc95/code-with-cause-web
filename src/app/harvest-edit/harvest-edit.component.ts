import { Component, OnInit } from '@angular/core';
import {HarvestClient, HarvestVm} from "../app.api";
import {MatDialog, MatSnackBar} from "@angular/material";
import {EditHarvestDialogComponent} from "./edit-harvest-dialog/edit-harvest-dialog.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-harvest-edit',
  templateUrl: './harvest-edit.component.html',
  styleUrls: ['./harvest-edit.component.scss']
})
export class HarvestEditComponent implements OnInit {

  token: string;
  harvests: Array<HarvestVm> = [];
  loading: boolean;

  constructor(private harvestService: HarvestClient,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loading = true;
    this.harvestService.getAll().subscribe(
      (harvests: Array<HarvestVm>): void => {
        this.harvests = harvests;
        this.loading = false;

        console.log(this.harvests);
      },
      (error: Error): void => {
        console.error(error);
        this.loading = false;
        this.snackBar.open(
          'Failed to fetch harvests',
          'OK',
          {
            duration: 2000,
            panelClass: 'snack-bar-danger'
          }
        );
      }
    );
  }

    editHarvest(harvest: HarvestVm): void {
      const dialogRef = this.matDialog.open(EditHarvestDialogComponent,
        {
          width: '90vw',
          data: harvest
        }
      );

      dialogRef.afterClosed().subscribe(
        (harvestForm: FormGroup): void => {
          if (harvestForm) {
            this.loading = true;
            this.harvestService.updateFarm(harvest._id, harvestForm.value.selectedFarmId).subscribe(
              (response: any): void => {
                this.harvestService.getAll().subscribe(
                  (harvests: Array<HarvestVm>): void => {
                    this.harvests = harvests;
                    this.loading = false;
                    this.snackBar.open(
                      'Harvest updated',
                      'OK',
                      {
                        duration: 2000,
                        panelClass: 'snack-bar-success'
                      }
                    );
                  },
                  (error: Error): void => {
                    console.error(error);
                    this.loading = false;
                    this.snackBar.open(
                      'Failed to fetch harvest',
                      'OK',
                      {
                        duration: 2000,
                        panelClass: 'snack-bar-danger'
                      }
                    );
                  }
                );
              },
              (error: Error): void => {
                console.error(error);
                this.loading = false;
                this.snackBar.open(
                  'Failed to update harvest',
                  'OK',
                  {
                    duration: 2000,
                    panelClass: 'snack-bar-danger'
                  }
                );
              }
            );
          }
        }
      );
  }
}
