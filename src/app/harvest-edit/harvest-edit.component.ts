import { Component, OnInit } from '@angular/core';
import {CropClient, CropVm} from "../app.api";
import {HarvestClient, HarvestVm} from "../app.api";
import {MatDialog, MatSnackBar} from "@angular/material";

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

}
